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