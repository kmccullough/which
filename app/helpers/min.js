import { helper } from '@ember/component/helper';

export default helper(function minHelper([ a, b ]) {
  return Math.min(a, b);
});
