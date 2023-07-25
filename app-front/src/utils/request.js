export const handleRequest = async (path, body, useCredentials = true) => {
    const res = await fetch(path, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json',
            ...(useCredentials ? credentials() : {})
        }
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