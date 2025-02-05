export const isValidDate = (date) =>
{
    return !isNaN(new Date(date));
}

// Return the date as Date object, or the alternative if the date is invalid
export const getValidDate = (date, alternative) =>
{
    const output = new Date(date);
    return isNaN(output) ? alternative : output;
}

export const convertDateToString = (date) =>
{
    if (!(date instanceof Date) || isNaN(date))
        return "input must be Date object"

    return date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0");
}

export const convertDateToLocaleString = (date) =>
{
    if (!(date instanceof Date) || isNaN(date))
        return "input must be Date object"

    return date.toLocaleDateString();
}

export const convertDateToLocaleAbbreviatedDate = (localeDateFormatLang, date, isFilter = false) =>
{
    return isFilter ?
        new Intl.DateTimeFormat(localeDateFormatLang, { month: 'short'}).format(date)
        :
        new Intl.DateTimeFormat(localeDateFormatLang, { month: 'short', day: 'numeric' }).format(date);
}