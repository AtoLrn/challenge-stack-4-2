export const saveToken = (token) => {
    localStorage.setItem('SDK-ANALYTICS-TOKEN', token)
}

export const getToken = () => {
    return localStorage.getItem('SDK-ANALYTICS-TOKEN') ?? undefined
}

export const deleteToken = () => {
    try {
        localStorage.removeItem('SDK-ANALYTICS-TOKEN')
    } catch {}
}