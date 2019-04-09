import * as ws from '../ws';

const subscriptions = {};

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    lastStateChange: null
  },
  mutations: {
    authenticate(state) {
      state.isAuthenticated = true;
    },
    deauthenticate(state) {
      state.isAuthenticated = false;
    }
  },
  actions: {
    $init(context, store) {
      /* Reauthenticate on every username change. */
      store.watch(
        state => state.auth.username,
        async (username, oldUsername) => {
          if (!username && oldUsername) {
            await context.dispatch('deauthenticate');
            return;
          }

          await context.dispatch('authenticate', {
            username,
            accessToken: context.rootState.auth.accessToken
          });
        }
      );

      /* Reauthenticate on reconnection. */
      ws.events.on('$reconnected', () => {
        if (context.rootGetters['auth/isAuthenticated']) {
          context.dispatch('authenticate', {
            username: context.rootState.auth.username,
            accessToken: context.rootState.auth.accessToken
          });
        }
      });

      ws.requests.on('verify-access-token', () => context.rootState.auth.accessToken);
      ws.events.on('deauthenticated', () => context.dispatch('deauthenticate'));
    },
    async authenticate(context, { username, accessToken }) {
      console.log(`WS: trying to authenticate '${username}'.`);

      try {
        await ws.request('authenticate', { username, accessToken });
        context.commit('authenticate');
        console.log(`WS: user authenticated.`);
      } catch (error) {
        context.commit('deauthenticate');
        console.error(`WS: failed to authenticate.`, error);
      }
    },
    deauthenticate(context) {
      ws.emit('deauthenticate');
      context.commit('deauthenticate');
      console.log(`WS: user deauthenticated.`);
    },
    subscribe(context, { paths }) {
      paths = paths.filter(path => {
        if (subscriptions[path]) {
          subscriptions[path]++;
          return false;
        } else {
          subscriptions[path] = 1;
          return true;
        }
      });
      if (paths.length > 0) {
        console.debug(`WS: subscribing to ${paths.join(', ')}.`);
        return ws.request('subscribe', { paths });
      }
    },
    unsubscribe(context, { paths }) {
      paths = paths.filter(path => {
        if (subscriptions[path]) {
          subscriptions[path]--;
          if (subscriptions[path] === 0) {
            delete subscriptions[path];
            return true;
          }
        }

        return false;
      });
      if (paths.length > 0) {
        console.debug(`WS: unsubscribing from ${paths.join(', ')}.`);
        return ws.request('unsubscribe', { paths });
      }
    }
  }
};
