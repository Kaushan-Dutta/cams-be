export const caseIdGenerator = (prefix: string) => {
    const random = Math.floor(Math.random() * 1000);
    return `CS${prefix}${random}`;
}
export const cardIdGenerator = (prefix: string) => {
    const random = Math.floor(Math.random() * 1000);
    return `CD${prefix}${random}`; 
}