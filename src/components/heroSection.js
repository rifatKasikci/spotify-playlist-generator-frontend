import { useState } from 'react';
import Link from 'next/link';

export default function Hero(){
  
    const [prompt, setPrompt] = useState('')
    const handleChange = (e) => {
        setPrompt(e.target.value)
    }


    return (
        <>
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Playlist Generator AI
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            This tool is for creating playlists with AI technology.
          </p>
          <form action={prompt!=='' ? '/create?prompt='+prompt : '/create'} className="flex items-center">
            <input
              type="text"
              placeholder="Enter a prompt!"
              className="bg-white border border-gray-400 rounded-l-full py-2 px-4 w-full h-12"
              onChange={handleChange}
            />
            <Link href={prompt!=='' ? '/create?prompt='+prompt : '/create'}  className="bg-green-500 hover:bg-green-600 text-white rounded-r-full py-2 px-6 font-medium h-12">
              <button type='submit'>
              Create
              </button>
            </Link>
          </form>
        </div>
      </div>
    </section>
    </>
  )};