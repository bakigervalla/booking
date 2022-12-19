import { useEffect, useState } from 'react'

export const useGetToken = () => {
  const [token, setToken] = useState(undefined)

  useEffect(() => {
    const access_token = localStorage.getItem('bilxtra-web-auth')
    setToken(access_token)
  }, [])

  return token
}
