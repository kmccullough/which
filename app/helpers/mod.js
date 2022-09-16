import { helper } from '@ember/component/helper';

export default helper(function modHelper([ a, b ]) {
  return (a || 0) % (b || 1);
});
