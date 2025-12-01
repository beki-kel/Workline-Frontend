'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/features/Core/application/hooks/useToast'
import { ToastContainer } from '@/features/Core/shared/components/ToastContainer'
import { useAuth } from '@/features/Authentication/application/hooks/useAuth'
import { LoginForm } from '../components/LoginForm'
import { SignupForm } from '../components/SignupForm'
import { GalleryVerticalEnd } from 'lucide-react'
import { GridBackground } from '../components/GridBackground'
import Image from 'next/image'

const AuthScreen = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')
    const { toasts, success, error, removeToast } = useToast()
    const { login, signup } = useAuth()
    const [isLogin, setIsLogin] = useState(mode !== 'signup')

    const handleLogin = async (values: { email: string; password: string }) => {
        try {
            const session = await login(values)
            console.log('Login successful', session)
            success('Login successful! Redirecting...')
            setTimeout(() => {
                router.push('/dashboard')
            }, 1000)
        } catch (err: any) {
            console.error('Login failed', err)
            error(err.message || 'Login failed. Please try again.')
        }
    }

    const handleSignup = async (values: { name: string; email: string; password: string }) => {
        try {
            const session = await signup(values)
            console.log('Signup successful', session)
            success('Account created! Please check your email to verify your account.')
            setTimeout(() => {
                router.push('/verify-email')
            }, 1500)
        } catch (err: any) {
            console.error('Signup failed', err)
            error(err.message || 'Signup failed. Please try again.')
        }
    }

    return (
        <GridBackground>
            <div className="absolute inset-0 z-0 bg-white/50 dark:bg-transparent" />
            <div className="relative z-10 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
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
                    {isLogin ? (
                        <LoginForm onSubmit={handleLogin} onToggle={() => setIsLogin(false)} />
                    ) : (
                        <SignupForm onSubmit={handleSignup} onToggle={() => setIsLogin(true)} />
                    )}
                </div>
                <ToastContainer toasts={toasts} onClose={removeToast} />
            </div>
        </GridBackground>

    )
}

export default AuthScreen
