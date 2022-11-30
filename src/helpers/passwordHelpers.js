export const randomString = length => {
    const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
        result += charSet.charAt(Math.floor(Math.random() * charSet.length))
    }
    return result
}
