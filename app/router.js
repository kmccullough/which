import EmberRouter from '@ember/routing/router';
import config from 'which/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('choice-add', { path: '/choice/add' });
  this.route('choice', { path: '/choice/:id' }, function() {
    this.route('edit');
  });
});
