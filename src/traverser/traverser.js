export function viewsToRoutes(views) {
  return views.map(view => ({
    path: `*/@${view.view}`,
    component: view.component,
  }));
}

const Traverser = {
  install(Vue, options) {
    console.log(Vue);
    Vue.$router.addRoutes(viewsToRoutes(options.views));
  },
};

export default Traverser;
