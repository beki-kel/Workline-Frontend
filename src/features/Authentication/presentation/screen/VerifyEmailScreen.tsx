'use client'

import React from 'react'
import { GridBackground } from '../components/GridBackground'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const VerifyEmailScreen = () => {
    return (
        <GridBackground>
            <div className="absolute inset-0 z-0 bg-white/50 dark:bg-transparent" />
            <div className="relative z-10 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
                    <a href="#" className="flex items-center gap-2 self-center font-medium">
                        <div className="flex items-center gap-3">
                            <div className="bg-black/10 dark:bg-white/95 rounded-xl p-2 shadow-sm">
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
                    </a>

                    <div className="flex flex-col items-center gap-4 rounded-xl border bg-card p-8 shadow-sm w-full">
                        <div className="rounded-full bg-primary/10 p-4">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">Check your email</h1>
                            <p className="text-muted-foreground text-sm">
                                We've sent a verification link to your email address. Please click the link to verify your account.
                            </p>
                        </div>
                        <div className="w-full pt-4">
                            <Link href="/auth">
                                <Button variant="outline" className="w-full">
                                    Back to Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </GridBackground>
    )
}

export default VerifyEmailScreen
