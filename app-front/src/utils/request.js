export const handleRequest = async (path, { json, formData }, useCredentials = true) => {
    const headers = useCredentials ? credentials() : {}

    if (json) {
        headers['Content-type'] = 'application/json'
    }

    const res = await fetch(path, {
        method: 'post',
        body: json ? JSON.stringify(json) : formData,
        headers
    })

    if (res.status !== 200) {
        console.log('ERROR', res.body)
        throw new Error('Something went wrong with request')
    }

    return res.blob
}

const credentials = () => {
    const token = localStorage.getItem('SDK-ANALYTICS-TOKEN')

    if (!token) {
        return {}
    }

    return {
        'Authorization': token
    }
}