import Layout from '../layouts/layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Create() {
  const router = useRouter()

  const [prompt, setPrompt] = useState('')

  const checkUserLogin = () => {
    if (window.localStorage.getItem('spotify_access_token') === null) {
      router.push('/')
    }
  }

  useEffect(() => {
    checkUserLogin()
    setPrompt(router.query.prompt)
  }, [])

  const handleChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleSubmit = (e) => {
    const playlistName = e.target[0].value
    const playlistDescription = e.target[1].value
    const isPublic = e.target[2].value
    const prompt = e.target[3].value
    const body = {
      prompt: prompt,
      playlistName: playlistName,
      playlistDescription: playlistDescription,
      isPublic: isPublic
    }
    const access_token = window.localStorage.getItem('spotify_access_token')
    axios.post('http://localhost:3000/api/v1/musics/suggest/suggestAndAddToPlaylist', body, {
      headers: {
        'access_token': access_token
      }
    }).catch((error) => {
      if (window.localStorage.getItem('spotify_refresh_token')) {
        window.localStorage.removeItem('spotify_access_token')
        window.localStorage.removeItem('user')
        axios.post("http://localhost:3000/api/v1/spotify/refreshToken", null, {
          headers: {
            refresh_token: window.localStorage.getItem('spotify_refresh_token')
          }
        }).then((response) => {
          console.log(response.data)
          window.localStorage.setItem('spotify_access_token', response.data.access_token)
        })
      }
    })
    e.preventDefault()
  }

  return (
    <Layout>
      <div>
        <Head>
          <title>Spotify Playlist Creator</title>
        </Head>
        <div className="max-w-screen-md mx-auto py-10 px-4">
          <h1 className="text-2xl font-bold text-center mb-8">Spotify Playlist Creator</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="playlistName" className="block mb-2 font-bold">Playlist Name:</label>
              <input type="text" id="playlistName" placeholder='Enter your playlist name...' name="playlistName" required className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 border-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="playlistDescription" className="block mb-2 font-bold">Playlist Description:</label>
              <input type="text" id="playlistDescription" placeholder='Enter your playlist description...' name="playlistDescription" className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 border-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="isPublic" className="block mb-2 font-bold">Public or Private?</label>
              <select id="isPublic" name="isPublic" className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 border-2">
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="prompt" className="block mb-2 font-bold">Enter Prompt:</label>
              <input type="text" onChange={handleChange} value={prompt} id="prompt" name="prompt" required className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 border-2" />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Create Playlist</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}