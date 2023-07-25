export const saveToken = (token) => {
    localStorage.setItem('SDK-ANALYTICS-TOKEN', token)
}
export const deleteToken = () => {
    try {
        localStorage.removeItem('SDK-ANALYTICS-TOKEN')
    } catch {}
}