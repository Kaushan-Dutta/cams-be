import dayjs from 'dayjs';

export const caseIdGenerator = () => {
    const random = Math.floor(Math.random() * 100000000);
    return `CS${random}`;
}
export const accountIdGenerator = () => {
    const random = Math.floor(Math.random() * 100000000);
    return `CX${random}`;
}
export const DateTimeConverter = (date: string) => {

    const parsedDate = dayjs(date).toDate();

    if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date value");
    } 
    return parsedDate;

}