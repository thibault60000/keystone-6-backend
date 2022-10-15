const formatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
});

export default function formatMoney(cents: number): string {
  const dollars = cents / 100;
  return formatter.format(dollars);
}
