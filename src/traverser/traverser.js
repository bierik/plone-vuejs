import View from '@/traverser/view';
import TraverserLink from '@/traverser/traverser-link';
import resolve from '@/traverser/resolver';

export function lookup(views, path) {
  return resolve(path).then(({ res, view }) => {
    const type = res['@type'];
    const componentLookup = views.find(v => v.type === type && v.view === view);
    if (!componentLookup) {
      throw new Error(`Component for type "${type}" could not be found`);
    }
    return { component: componentLookup.component, context: res };
  });
}

export function updateComponent(views, path, vm) {
  return lookup(views, path).then(({ component, context }) => {
    vm.prototype._component = component;
    vm.prototype._context = context;
  });
}

const Traverser = {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        if (this.$options.views) {
          const views = this.$options.views || [];
          Vue.util.defineReactive(Vue.prototype, '_component', {});
          Vue.util.defineReactive(Vue.prototype, '_context', {});
          if (!this.$router) {
            throw new Error('vue-router has to be installed');
          }
          updateComponent(views, this.$route.fullPath, Vue);
          this.$router.beforeEach((to, from, next) => {
            updateComponent(views, to.path, Vue).then(next);
          });
        }
      },
    });

    Object.defineProperty(Vue.prototype, '$component', {
      get() { return this._component; },
    });

    Object.defineProperty(Vue.prototype, '$context', {
      get() { return this._context; },
    });

    Vue.component(View.name, View);
    Vue.component(TraverserLink.name, TraverserLink);
  },
};

export default Traverser;
