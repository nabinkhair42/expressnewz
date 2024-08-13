export const ConvertToNepaliNumerals = (number: number): string => {
    const arabicNumerals = "0123456789";
    const nepaliNumerals = "०१२३४५६७८९";
    return number
      .toString()
      .split("")
      .map((digit) => {
        const index = arabicNumerals.indexOf(digit);
        return index !== -1 ? nepaliNumerals[index] : digit;
      })
      .join("");
  };