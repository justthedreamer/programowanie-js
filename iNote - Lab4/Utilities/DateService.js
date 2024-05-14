export function isToday(date){
    const currentDate = new Date();
    const givenDate = new Date(date)
    
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const givenDay = givenDate.getDate();
    const givenMonth = givenDate.getMonth() + 1;
    const givenYear = givenDate.getFullYear();

    return (currentDay == givenDay) && (currentMonth == givenMonth) && (currentYear == givenYear)
}
export function isTommorow(date){
    const currentDate = new Date();
    const givenDate = new Date(date)
    
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const givenDay = givenDate.getDate();
    const givenMonth = givenDate.getMonth() + 1;
    const givenYear = givenDate.getFullYear();

    return (currentDay + 1 == givenDay) && (currentMonth == givenMonth) && (currentYear == givenYear)
}
export function isOlder(date){
    const currentDate = new Date();
    const givenDate = new Date(date)

    if(isToday(date))
        return false;    

    return givenDate < currentDate
}
export function isFuture(date){

    return !isToday(date) && !isOlder(date)
}