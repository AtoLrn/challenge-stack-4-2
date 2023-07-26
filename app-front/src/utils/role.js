export const saveRole = (role) => {
    localStorage.setItem('SDK-ANALYTICS-ROLE', role === 1 ? 'admin' : 'user');
}

export const getRole = () => {
    return localStorage.getItem('SDK-ANALYTICS-ROLE') ?? 'user';
}

export const deleteRole = () => {
    try {
        localStorage.removeItem('SDK-ANALYTICS-ROLE')
    } catch {}
}
