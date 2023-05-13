import Link from 'next/link';
import Image from 'next/image';
import spotifyIcon from '../../public/spotify-icon-white.png';
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function SpotifyButton({text, href}) {
    const handleSpotifyLogin = () => {
        axios.get("http://localhost:3000/api/v1/spotify/getSpotifyAuthUri")
        .then((response) => {
            const timeout = setTimeout(() => {
                window.location.replace(response.data);
              }, 1000);
        }).catch((error) => {
            console.log(error)
        })
    }
    
    
    return (
        <div className='flex flex-row justify-between cursor-pointer' onClick={handleSpotifyLogin}>
            
            <a href="#" className=" flex items-center bg-green-500 hover:bg-green-600 text-white rounded-full py-2 px-6 font-medium">
            <Image 
            src={spotifyIcon}
            width={25}
            height={25}
            className='mr-2'
            />Login with Spotify
            </a>
        </div>
    );
}