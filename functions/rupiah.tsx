/**
 * Convert number or integer into IDR currency format 
 * @param number 
 * @returns String formatted to IDR
 */
export default function rupiah(number: number): string {
    const curr = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);

    return curr.substring(0, 2) + " " + curr.substring(2, curr.length - 3);
}