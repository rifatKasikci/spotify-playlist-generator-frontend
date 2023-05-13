import Link from 'next/link';
import Image from 'next/image';
import spotifyIcon from '../../public/spotify-icon-white.png';
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function SpotifyButton({text, href}) {
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')))
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
      
    const handleLogout = () => {
        window.localStorage.removeItem('spotify_access_token')
        window.localStorage.removeItem('spotify_refresh_token')
        window.localStorage.removeItem('user')
        window.location.href = '/'
    }  

    useEffect(()=>{
        setUser(JSON.parse(window.localStorage.getItem('user')))
    },[])
    
    return (
        <div className="relative">
      <button
        className="flex items-center bg-green-500 hover:bg-green-600 text-white rounded-full py-2 px-4 font-medium"
        onClick={toggleDropdown}
      >
       <div className='flex flex-row justify-between cursor-pointer'>
            <Image 
            src={user ? user.images[0].url : spotifyIcon}
            width={28}
            height={28}
            className='mr-2 h-[32px] w-[32px] border-solid border-2 border-black  rounded-full w-8 h-8'
            />
            <p className='items-center text-center mt-1'>{user?.display_name} ({user?.product})</p>
        </div>
        <img className='ml-2 h-[15px] w-[15px]' src="https://img.icons8.com/ios-filled/50/null/sort-down.png"/>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">
          <Link
            href="/"
            onClick={handleLogout}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Logout
          </Link>
        </div>
      )}
    </div>  
    );
}