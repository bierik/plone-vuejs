import resolve from '@/traverser/resolver';
import { createTraverserLink } from '@/traverser/normalizer';
import executeHook from '@/traverser/traverseHook';


export function lookup({ views, path, options }) {
  return resolve(path, options).then(({ res, view }) => {
    const type = res['@type'];
    const componentLookup = views.find(v => v.type === type && v.view === view);
    if (!componentLookup) {
      throw new Error(`Component for type "${type}" could not be found`);
    }
    return { component: componentLookup.component, context: res };
  });
}

export function updateComponent({ views, path, vm, options }) {
  return lookup({ views, path, options }).then(({ component, context }) => {
    executeHook(
      component.onTraverse,
      null,
      path,
      options,
    ).then(({ key, data }) => {
      const hookContext = context;
      hookContext[key] = data;
      vm.prototype._context = hookContext;
      vm.prototype._component = component;
    }).catch(() => {
      vm.prototype._component = component;
      vm.prototype._context = context;
    });
  });
}

export function traverse(item, router, options) {
  return router.push(createTraverserLink(item, options));
}
