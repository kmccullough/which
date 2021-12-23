import { helper } from '@ember/component/helper';

export default helper(function subHelper([ a, b ]) {
  return a - b;
});
