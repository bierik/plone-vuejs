import View from '@/traverser/view';
import resolve from '@/traverser/resolver';


export function lookup(views, path) {
  return resolve(path).then(({ res, view }) => {
    const type = res['@type'];
    const component = views.find(v => v.type === type && v.view === view).component;
    return { component, response: res };
  });
}

export function traverseRouteHook(to, from, next, vm) {
  lookup(vm.views, to.path).then(({ component, response }) => {
    vm.$component = component;
    vm.$context = response;
    next();
  }).catch(next);
}

const Traverser = {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        const router = this.$router;
        this.views = this.$options.views || [];
        this.context = {};
        if (!router) {
          throw new Error('vue-router has to be installed');
        }
        this.$router.addRoutes([{
          path: '*',
          beforeEnter: (...args) => { traverseRouteHook(...args, this); },
        }]);
      },
    });

    Vue.prototype.$component = {};
    Vue.prototype.$context = {};

    Vue.component('traverser-view', View);
  },
};

export default Traverser;
