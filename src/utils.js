export const ValidateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    return (false)
}

export const replaceString = (code, string) => {
    const newCode = "[" + code + "] "
    return string.replace(newCode, '')
}

export const generateNumber = () => {
    const giveValues = () => {
        let zeroes;
        let number = Math.round((Math.random() * 9999));

        zeroes = 4 - number.toString().length;

        for (var j = 1; j <= zeroes; j++) {
            number = "0" + number;
        }
        return number;
    }

    return giveValues(4).toString();
}

export const randomHeartRate = () => {
    return Math.floor(Math.random() * (Math.floor(220) - Math.ceil(40) + 1) + Math.ceil(40));
}