import React, { useState,useEffect } from 'react'
import { QueryClient, QueryClientProvider, useQuery,useQueryClient,} from 'react-query'
import axios from 'axios'
import { error } from 'console';
import {useCookies} from 'react-cookie'
import { access } from 'fs';

export default function Auth(code) {
    // const queryClient=useQueryClient()
    
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()
    const [cookies,SetCookie]=useCookies(['accessToken'])
    //login
    useEffect(() => {
        axios
          .post("http://localhost:3001/login", {
            code
          })
          .then(res => {
            setAccessToken(res.data.access_token)
            setRefreshToken(res.data.refresh_token)
            setExpiresIn(res.data.expires_in)
            console.log(res.data.expires_in)
            let expireD = new Date()
            expireD.setTime(expireD.getTime() + (res.data.expiresIn * 1000))
            console.log(expireD)
            SetCookie('accessToken', res.data.access_token, {   expires:expireD})
          })
          .catch((err) => {
              console.log(err)
            // window.location.href = "/"
          })
      }, [code])
    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
          axios
            .post("http://localhost:3001/refresh", {
              refreshToken,
            })
            .then(res => {
              setAccessToken(res.data.access_token)
              setExpiresIn(res.data.expires_in)
               let expireD = new Date()
            expireD.setTime(expireD.getTime() + (res.data.expiresIn * 1000))
            console.log(expireD)
              SetCookie('accessToken', res.data.access_token, {expires:expireD})
              console.log(accessToken)
              console.log(res)
              console.log('refreshed')
              console.log(expiresIn)
              console.log(accessToken)

            })
            .catch((err) => {
             console.log('refresh error: '+err)
            //  window.location.href = "/"
            })
        }, (expiresIn! - 60) * 1000)
    
        return () => clearInterval(interval)
      }, [refreshToken, expiresIn])

    return accessToken
    
}
