export default function rupiah(number: number) {
    const curr = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);

    return curr.substring(0, 2) + " " + curr.substring(2, curr.length - 3);
}