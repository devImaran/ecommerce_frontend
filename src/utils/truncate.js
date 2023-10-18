export const stringTruncate  = (text, maxlength) =>{
    if (text.length > maxlength) {
        return `${text.slice(0, maxlength)} …`
    }
    return text
}