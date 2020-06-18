import { over, lensProp, lensIndex, lensPath, type } from "ramda";

const isFunc = val => typeof val === "function";

const lensByPropType = {
  String: lensProp,
  Number: lensIndex,
  Array: lensPath
};

const usePropChange = setState => {
  return function(prop, maybeValue) {
    const lens = lensByPropType[type(prop)];

    if (!lens) {
      throw new TypeError(
        "Incorrect first argument of handleProp function, returned but usePropChange hook. First argument can be only number, string or array."
      );
    }

    const overProp = over(lens(prop));

    const setValue = value => {
      setState(overProp(isFunc(value) ? value : () => value));
    };

    if (arguments.length === 1) {
      return setValue;
    }

    setValue(maybeValue);
  };
};

export default usePropChange;
