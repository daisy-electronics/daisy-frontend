import axios from 'axios';

import { CustomError } from '../common/errors';

const KEY_USERNAME = 'auth.username';
const KEY_ACCESS_TOKEN = 'auth.accessToken';
const KEY_EXPIRES_AT = 'auth.expiresAt';

const TOKEN_REFRESH_INTERVAL = 1000 * 60 * 10; // 10 minutes
const TOKEN_REFRESH_THRESHOLD = 1000 * 60 * 15; // 15 minutes
const TOKEN_REFRESH_MAX_TRIES = 3;

function saveToLocalStorage({ username, tokenInfo }) {
  username && localStorage.setItem(KEY_USERNAME, username);
  tokenInfo && localStorage.setItem(KEY_ACCESS_TOKEN, tokenInfo.value);
  tokenInfo && localStorage.setItem(KEY_EXPIRES_AT, tokenInfo.expiresAt);
}

function getFromLocalStorage() {
  const username = localStorage.getItem(KEY_USERNAME);
  const accessToken = localStorage.getItem(KEY_ACCESS_TOKEN);
  const expiresAt = localStorage.getItem(KEY_EXPIRES_AT);

  return {
    username,
    ...accessToken && {
      tokenInfo: {
        value: accessToken,
        expiresAt
      }
    }
  };
}

function clearLocalStorage() {
  localStorage.removeItem(KEY_USERNAME);
  localStorage.removeItem(KEY_ACCESS_TOKEN);
  localStorage.removeItem(KEY_EXPIRES_AT);
}

export default {
  namespaced: true,
  state: {
    username: null,
    accessToken: null,
    expiresAt: null,

    refreshTries: 0
  },
  getters: {
    isAuthenticated: state => state.accessToken !== null,
    isExpired: state => state.expiresAt ? state.expiresAt < new Date : false,
    shouldRefresh: state => state.expiresAt ? state.expiresAt.valueOf() - new Date().valueOf() < TOKEN_REFRESH_THRESHOLD : false
  },
  mutations: {
    authenticate(state, { username, tokenInfo }) {
      state.username = username;
      state.accessToken = tokenInfo.value;
      state.expiresAt = new Date(tokenInfo.expiresAt);

      saveToLocalStorage({ username, tokenInfo });

      console.log(`User '${username}' authenticated.`);
    },
    deauthenticate(state) {
      const username = state.username;
      state.username = state.accessToken = state.expiresAt = null;

      clearLocalStorage();

      console.log(`User '${username}' deauthenticated.`);
    },
    refreshAccessToken(state, tokenInfo) {
      state.accessToken = tokenInfo.value;
      state.expiresAt = new Date(tokenInfo.expiresAt);

      saveToLocalStorage({ tokenInfo });

      console.log(`Access token for user '${state.username}' refreshed.`);
    },
    incrementRefreshTries(state) {
      state.refreshTries++;
    },
    resetRefreshTries(state) {
      state.refreshTries = 0;
    }
  },
  actions: {
    async $init(context/*, store */) {
      const { username, tokenInfo } = getFromLocalStorage();

      const expired = tokenInfo ? new Date(tokenInfo.expiresAt) < new Date : false;

      /* Access token has not been set or is expired. */
      if (!tokenInfo || expired) {
        clearLocalStorage();

        if (expired) {
          console.warn(`Access token for user '${username}' has expired.`);
        }
      }
      /* Access token has been set and is fresh. */
      else {
        context.commit('authenticate', {
          username,
          tokenInfo
        });
      }

      axios.interceptors.request.use(function (config) {
        if (context.getters.isAuthenticated) {
          config.headers['X-Authorization'] = context.state.accessToken;
          config.headers['X-Bearer'] = context.state.username;
        }

        return config;
      });

      /* Check it once in a while and refresh access token if should. */
      setInterval(async () => {
        if (context.getters.shouldRefresh) {
          await context.dispatch('refreshAccessToken');
        }
      }, TOKEN_REFRESH_INTERVAL);
    },
    async login(context, { username, password }) {
      try {
        const response = await axios.post('/api/login', {
          username,
          password
        });
        context.commit('authenticate', {
          username,
          tokenInfo: response.data
        });
      } catch (error) {
        console.error(`Failed to login.`, error);
        if (error.response) {
          throw new CustomError(error.response.data.message, error.response.data.data);
        } else {
          throw new CustomError(error.message, error.data);
        }
      }
    },
    async refreshAccessToken(context) {
      try {
        const response = await axios.get(`/api/user/${context.state.username}/new-acess-token`);
        context.commit('refreshAccessToken', response.data);
      } catch (error) {
        if (!context.getters.isExpired && context.state.refreshTries < TOKEN_REFRESH_MAX_TRIES) {
          context.commit('incrementRefreshTries');
          setTimeout(() => context.dispatch('refreshAccessToken'), 1000);

          console.error(`Failed to refresh token. Trying again...`, error);
        } else {
          context.commit('resetRefreshTries');
          context.commit('deauthenticate');

          console.error(`Failed to refresh token.`, error);
        }
      }
    },
    logout(context) {
      context.commit('deauthenticate');
    }
  }
};
