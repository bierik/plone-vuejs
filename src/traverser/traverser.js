import resolve from '@/traverser/resolver';

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
    vm.prototype._component = component;
    vm.prototype._context = context;
  });
}
