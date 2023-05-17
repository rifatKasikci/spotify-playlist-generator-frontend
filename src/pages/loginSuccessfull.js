import Layout from '../layouts/layout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function LoginSuccessfull() {
  const router = useRouter()

  const authorizeSpotify = () => {
    axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + `/spotify/callback?code=${router.query.code}`).then((response) => {
      const data = response.data
      window.localStorage.setItem('spotify_access_token', data.access_token)
      window.localStorage.setItem('spotify_refresh_token', data.refresh_token)
      router.replace('/create')
    })
  }

  return (
    <Layout>
      <div class="bg-gray-100 min-h-screen flex items-center justify-center">
        <div class="max-w-md mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold text-gray-800 mb-8">Login Successful</h2>
          <button onClick={authorizeSpotify} id="authorize" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Authorize
          </button>
        </div>
      </div>
    </Layout>
  )
}