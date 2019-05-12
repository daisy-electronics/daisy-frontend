export default {
  namespaced: true,
  actions: {
    // eslint-ignore-next-line
    $init(context, store) {},
    subscribe(context, { paths }) {
      return context.dispatch('ws/subscribe', {
        paths: paths.map(path => 'garden/' + path)
      }, { root: true });
    },
    unsubscribe(context, { paths }) {
      return context.dispatch('ws/unsubscribe', {
        paths: paths.map(path => 'garden/' + path)
      }, { root: true });
    },
    getLamp(context) {
      return context.dispatch('views/getVariable', {
        viewId: 'garden',
        variable: 'lamp'
      }, { root: true });
    },
    toggleLamp(context) {
      return context.dispatch('views/dispatchAction', {
        viewId: 'garden',
        action: 'toggleLamp'
      }, { root: true });
    },
    getVentilation(context) {
      return context.dispatch('views/getVariable', {
        viewId: 'garden',
        variable: 'ventilation'
      }, { root: true });
    },
    toggleVentilation(context) {
      return context.dispatch('views/dispatchAction', {
        viewId: 'garden',
        action: 'toggleVentilation'
      }, { root: true });
    }
  }
};