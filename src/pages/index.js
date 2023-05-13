import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import Layout from '../layouts/layout'
const inter = Inter({ subsets: ['latin'] })
import { useState } from 'react'
import Hero from '../components/heroSection'


// Features Section
const Feature = ({ imgSrc, imgAlt, title, description }) => (
  <div className="flex flex-wrap items-center w-full justify-between mb-12">
    <div className="w-full md:w-1/2 mb-8 md:mb-0 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <p className="text-lg text-gray-700 mb-6">{description}</p>
    </div>
    <div className="w-full md:w-1/2">
      <Image
        src={imgSrc}
        alt={imgAlt}
        className="w-full h-full object-cover rounded-lg shadow-md"
        width={250}
        height={500}
      />
    </div>
  </div>
);

export default function Home() {
  return (
    <>
    <Layout>
      <Hero />
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Feature
            imgSrc="/../public/feature1.jpg"
            imgAlt="Feature 1"
            title="Create the Perfect Playlist with Spotify"  
            description="Are you tired of listening to the same old songs on repeat? Do you want to discover new music that matches your taste? With Spotify, you can create the perfect playlist for any occasion. Whether you want to rock out to some heavy metal or relax with some ambient music, Spotify has something for everyone. You can also share your playlists with your friends and discover new music together. Start creating your perfect playlist today with Spotify."
          />
          <Feature
            imgSrc="/../public/feature.jpg"
            imgAlt="Feature 2"
            title="Discover New Music"
            description="We have handpicked the best among millions of songs and gathered them for you to discover. All kinds of music you want to listen to are here!
            From today's popular songs to the best albums in history, a vast music library awaits you. Discover new tracks that suit your music taste and continue your musical journey."
          />
        </div>
      </div>
    </section>
      </Layout>
    </>
  )
}
