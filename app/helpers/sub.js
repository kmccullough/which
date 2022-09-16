import { helper } from '@ember/component/helper';

export default helper(function subHelper([ a, b ]) {
  return (a || 0) - (b || 0);
});
