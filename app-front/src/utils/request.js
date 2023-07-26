export const handleRequest = async (path, body, useCredentials = true, { method } = {}) => {
    const headers = useCredentials ? credentials() : {}

    if (body){
        const { json, formData } = body
        if (json) {
            headers['Content-type'] = 'application/json'
        }
    
        const res = await fetch(`/api${path}`, {
            method: method ?? 'post',
            body: json ? JSON.stringify(json) : formData,
            headers
        })
    
        if (res.status !== 200) {
            console.log('ERROR', res.body)
            throw new Error('Something went wrong with request')
        }
    
        return await res.json()
    } else {
        const res = await fetch(`/api${path}`, {
            method: 'get',
            headers
        })

        if (res.status !== 200) {
            console.log('ERROR', res.body)
            throw new Error('Something went wrong with request')
        }
    
        return await res.json()
    }


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
