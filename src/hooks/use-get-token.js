import { useEffect, useState } from 'react'

export const useGetToken = () => {
  const [token, setToken] = useState(undefined)

  useEffect(() => {
    const token = localStorage.getItem('bilxtra-web-auth')
    setToken(token)
  }, [])

  return token
}
