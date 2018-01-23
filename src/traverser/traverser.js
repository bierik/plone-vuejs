import resolve from '@/traverser/resolver';
import { createTraverserLink } from '@/traverser/normalizer';
import executeHook from '@/traverser/traverseHook';


export function lookup({ views, path, options }) {
  return resolve(path, options).then(({ res, view }) => {
    const type = res['@type'];
    const componentsByType = views.filter(v => v.type === type);

    if (!componentsByType.length) {
      throw new Error(`Component for type "${type}" could not be found`);
    }

    const componentsByView = componentsByType.filter(v => v.view === view);

    if (componentsByView.length > 1) {
      throw new Error(`Multiple views named "${view}" defined for component with type "${type}"`);
    }

    const componentLookup = componentsByView.find(v => v.view === view);

    if (componentLookup) {
      return { component: componentLookup.component, context: res };
    }

    const defaultViews = views.filter(v => !v.view);

    if (defaultViews.length > 1) {
      throw new Error(`Multiple default views defined for component with type "${type}"`);
    }

    return { component: defaultViews[0].component, context: res };
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
