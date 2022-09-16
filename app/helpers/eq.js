import { helper } from '@ember/component/helper';

export default helper(function eqHelper([ a, b ]) {
  return a == b;
});
