// const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
//     currency: 'IDR', style: 'currency'
// })

// export function formatCurrency(number: number) {
//     return CURRENCY_FORMATTER.format(number)
// }

export const formatCurrency = (
  amount: number,
  currency = "IDR",
  locale = "id-ID"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
