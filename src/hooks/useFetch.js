import react, { useState } from 'react'
import { api } from '../api/axios'
import { useEffect } from 'react'


const useFetch = async (method, url) => {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const apiCall = async () => {
        try {
            const res = await api[method](url)
            if (res && res.data) {
                setData(res.data.data)
            }
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }


    useEffect(() => {
        apiCall()
        return {
            loading,
            data,
            error
        }
    }, [url])
}

export default useFetch