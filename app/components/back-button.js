import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class BackButtonComponent extends Component {

  @inject router;

  @tracked isVisible = true;

  parentRoute;

  @action onRouteDidChange() {
    const { currentRouteName } = this.router;
    this.isVisible = currentRouteName !== 'index' && currentRouteName !== 'application';
    const parts = currentRouteName.split('.')
    if (parts[parts.length - 1] === 'index') {
      parts.pop();
    }
    this.parentRoute = parts.length > 1 ? parts.slice(0, -1) + '.index' : 'application';
  }

  @action onInit() {
    this.router.on('routeDidChange', this.onRouteDidChange);
    this.onRouteDidChange();
  }

  @action onClick() {
    this.router.transitionTo(this.parentRoute);
  }

}
