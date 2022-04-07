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
        let length, zeroes;
        let number = Math.round((Math.random() * 9999));

        // toString()-method and lenght to set amount of digts
        zeroes = 4 - number.toString().length;

        for (var j = 1; j <= zeroes; j++) {
            number = "0" + number;
        }
        return number;
    }
    let bigString = "";

    bigString += giveValues(4).toString();

    return bigString
}