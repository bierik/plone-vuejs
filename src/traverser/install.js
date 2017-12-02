import View from '@/traverser/view';
import TraverserLink from '@/traverser/traverser-link';
import { updateComponent } from '@/traverser/traverser';

const plugin = {
  install(Vue) {
    const traverserComponent = Vue.component('traverser-component', { template: '<p>traverser component...</p>' });

    Vue.mixin({
      beforeCreate() {
        if (this.$options.traverser) {
          const views = this.$options.traverser.views || [];
          const options = this.$options.traverser.options;
          Vue.util.defineReactive(Vue.prototype, '_component', traverserComponent);
          Vue.util.defineReactive(Vue.prototype, '_context', {});
          if (!this.$router) {
            throw new Error('vue-router has to be installed');
          }
          updateComponent({ views, path: this.$route.fullPath, vm: Vue, options });
          this.$router.beforeEach((to, from, next) => {
            updateComponent({ views, path: to.path, vm: Vue, options }).then(next);
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

export default plugin;
