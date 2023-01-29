
export function errorHandler (e: any) {
    const error = new Error(e)
    error.message = e.response.data
    throw error
}


export function getDate(): string{
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    return year + "-" + month + "-" + day;
}