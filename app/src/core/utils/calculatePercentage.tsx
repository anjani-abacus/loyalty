export function calculatePercentage(
  numbers: number[],
  total: number,
): number[] {
  const percentageArray: number[] = [];

  numbers.forEach(number => {
    const percentage = Math.round((number / total) * 100);

    percentageArray.push(percentage);
  });

  return percentageArray;
}




export const additionValue = (value = 0) => {
  let total = 0;
  total += value;
  return total;

};

