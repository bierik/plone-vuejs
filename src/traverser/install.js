import View from '@/traverser/view';
import TraverserLink from '@/traverser/traverser-link';
import { updateComponent, traverse } from '@/traverser/traverser';
import traverserComponent from '@/traverser/traverserComponent';
import axios from 'axios';

const plugin = {
  install(Vue) {
    Vue.http = axios;

    Vue.mixin({
      beforeCreate() {
        if (this.$options.traverser) {
          const views = this.$options.traverser.views || [];
          const options = this.$options.traverser.options;

          Vue.util.defineReactive(Vue.prototype, '_component', Vue.component(traverserComponent.name, traverserComponent));
          Vue.util.defineReactive(Vue.prototype, '_context', {});

          if (!this.$router) {
            throw new Error('vue-router has to be installed');
          }

          Vue.prototype.traverse = (item) => {
            traverse(item, this.$router, this.$options.traverser.options);
          };

          const path = this.$route.path;
          updateComponent({ views, path, vm: Vue, options });

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

    Vue.prototype.http = axios;

    Vue.component(View.name, View);
    Vue.component(TraverserLink.name, TraverserLink);
  },
};

export default plugin;
