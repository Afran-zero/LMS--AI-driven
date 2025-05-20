"use client"
import React from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/motion' // Your animation utils

function WelcomeBoard() {
    const { user, isLoaded } = useUser();
    
    if (!isLoaded) return (
        <div className="p-5 bg-gradient-to-r from-blue-500 to-blue-600 w-full text-white rounded-lg flex items-center gap-6 animate-pulse">
            <div className="w-24 h-24 bg-blue-400 rounded-lg"></div>
            <div className="space-y-3">
                <div className="h-8 w-64 bg-blue-400 rounded"></div>
                <div className="h-6 w-80 bg-blue-400 rounded"></div>
            </div>
        </div>
    )

    return (
        <motion.div 
            initial="hidden"
            animate="show"
            variants={fadeIn('up', 0.2)}
            className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 w-full text-white rounded-lg flex flex-col md:flex-row items-center gap-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative w-24 h-24">
                <Image 
                    src={'/laptop.png'} 
                    alt='laptop' 
                    fill
                    className="object-contain drop-shadow-lg"
                    priority
                />
            </div>
            
            <div className="text-center md:text-left">
                <h2 className='font-bold text-2xl md:text-3xl mb-2'>
                    Hello, {user?.fullName || 'Welcome back'}!
                </h2>
                <p className='text-lg md:text-xl opacity-90'>
                    Let's dive in again and continue learning. The journey gets better every day!
                </p>
            </div>
        </motion.div>
    )
}

export default WelcomeBoard