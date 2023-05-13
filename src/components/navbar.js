import NavbarItem from "./navbarItem";
import Image from "next/image";
import SpotifyButton from "./spotifyButton";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import ProfileButtonGroup from "./profileButtonGroup";

export default function Navbar() {
    const [user, setUser] = useState()

    const getUser = () => {
        axios.post("http://localhost:3000/api/v1/spotify/getUserDetails", null, {
            headers: {
                'access_token': window.localStorage.getItem('spotify_access_token')
            }
        })
        .then(response => {
            console.log(response.data)
            setUser(response.data)
            window.localStorage.setItem('user', JSON.stringify(response.data)      )
            if (response.data.error && response.data.error.status === 401) {
                window.localStorage.removeItem('spotify_access_token')
                window.localStorage.removeItem('user')
                axios.post("http://localhost:3000/api/v1/spotify/refreshToken", null, {
                    headers:{
                        refresh_token : window.localStorage.getItem('spotify_refresh_token')
                    }
                }).then((response)=>{
                    console.log(response.data)
                    window.localStorage.setItem('spotify_access_token', response.data.access_token)
                    setUser(null)
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (window.localStorage.getItem('spotify_access_token')) {
            getUser()
        }
    }, [])

    return (
        <div className="flex justify-between items-center bg-gray-500 py-4 px-6">
            <Link href='/' className="flex items-center">
                <h1 className="text-white text-lg font-medium ml-6">PL-Generator</h1>
            </Link>
            <div className="flex justify-between justify-items-center">
                <NavbarItem text="Home" href={"/"} />
                <NavbarItem text="Create" href={"/create"} />
            </div>
            <div>
                {
                    user ? <ProfileButtonGroup /> : <SpotifyButton />
                }
            </div>


        </div>
    );
}