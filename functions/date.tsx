/**
 * Convert number or integer into IDR currency format 
 * @param number 
 * @returns String formatted to MM DD, YYYY date format
 */
export default function date(date: string) {
    let dateString = new Date(date).toDateString().substring(4)
    let index = dateString.length - 5

    return dateString.slice(0, index) + ',' + dateString.slice(index)
}