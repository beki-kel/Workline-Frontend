'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const Navbar = () => {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
            <div className="relative overflow-hidden rounded-full border border-white/30 bg-white/[0.08] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] dark:bg-black/[0.15] dark:border-white/20 transition-all duration-300 hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.18)] hover:border-white/40 hover:bg-white/[0.12] dark:hover:bg-black/[0.2] hover:scale-[1.01]">
                <div className="flex items-center justify-between px-12 py-4">
                    {/* Logo and Name */}
                    <div className="flex items-center gap-3">
                        <div className="bg-white/90 dark:bg-white/95 rounded-xl p-2 shadow-sm">
                            <Image
                                src="https://res.cloudinary.com/dr2h8zmll/image/upload/v1764316308/logo-workline_xievif.svg"
                                alt="Workline Logo"
                                width={32}
                                height={32}
                                className="h-8 w-8"
                            />
                        </div>
                        <span className="text-xl font-bold text-foreground">Workline</span>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="lg"
                            className="hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 transition-all duration-200 rounded-full py-3 px-6 text-base text-foreground"
                        >
                            Sign Up
                        </Button>
                        <Button
                            size="lg"
                            className="bg-foreground/90 hover:bg-foreground text-background hover:scale-105 shadow-md hover:shadow-lg transition-all duration-200 rounded-full py-6 px-6 text-base"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
