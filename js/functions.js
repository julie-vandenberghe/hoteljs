export default function displayPrice(number) {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(number);
}