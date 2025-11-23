export const FromatNumber = (number: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: import.meta.env.VITE_DECIMAL_POINT,
    useGrouping: import.meta.env.VITE_USE_COMMA,
  });
  return formatter.format(number);
};

export const FromatDecimal = (number: number) => {
  return number.toFixed(import.meta.env.VITE_DECIMAL_POINT);
};

export const FormatIntoNumber = (number: any) => {
  const decimalPoints = Number(import.meta.env.VITE_DECIMAL_POINT) | 2;
  const val = parseFloat(number);
  const fixedNum = isNaN(val) ? 0 : val;
  return fixedNum.toFixed(decimalPoints);
};
