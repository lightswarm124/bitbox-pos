import Big from 'big.js';

export default function operate(num1, num2, operation) {
  const one = Big(num1 || '0');
  const two = Big(num2 || '0');

  if (operation === "+") {
    return one.plus(two).toString();
  }
  if (operation === "-") {
    return one.minus(two).toString();
  }
  if (operation === "x") {
    return one.times(two).toString();
  }
  if (operation === "/") {
    return one.div(two).toString();
  }
throw Error(`Unknown operation '${operation}'`);
}
