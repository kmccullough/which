import Service from '@ember/service';

import { inject } from '@ember/service';
import { getOwner } from '@ember/application';

import { isDecoratorArgs, isMethodDecoratorArgs } from 'which/utils/decorator';

export function routeModel(...models) {
  if (isDecoratorArgs(...arguments)) {
    throw new Error('@routeModel decorator expects model string(s)');
  }
  return function(target, propertyKey, descriptor) {
    if (!isMethodDecoratorArgs(...arguments) || propertyKey !== 'model') {
      throw new Error('@routeModel decorator should be applied to Route model() hook');
    }
    const model = descriptor.value;
    let init = true;
    descriptor.value = function() {
      if (init) {
        init = false;
        getOwner(this).lookup('service:route-model')
          ._setRouteModels(this, ...models);
      }
      return model.apply(this, arguments);
    }
    return descriptor;
  }
}

export default class extends Service {

  @inject router;

  routeModels = new Map();

  _setRouteModels(route, ...models) {
    const { fullRouteName } = route;
    const routeModels = this.routeModels.get(fullRouteName) || { route, models: [] };
    routeModels.models = [ ...routeModels.models, ...models ]
    this.routeModels.set(fullRouteName, routeModels)
  }

  refresh(...models) {
    let route = this.router.currentRoute;
    const routes = [ route ];
    while (route.parent) {
      route = route.parent;
      routes.unshift(route);
    }
    routes.some(route => {
      const routeModels = this.routeModels.get(route.name)
      if (routeModels?.models.some(routeModel => models.includes(routeModel))) {
        routeModels.route.refresh()
        return true;
      }
    });
  }

}
