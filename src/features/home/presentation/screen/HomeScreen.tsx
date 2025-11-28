'use client'

import React from 'react'
import { AuroraBackground } from '@/features/home/presentation/components/aurora-background'
import Navbar from '@/features/home/presentation/components/Navbar'
import HeroSection from '@/features/home/presentation/components/HeroSection'
import TableShowcaseSection from '@/features/home/presentation/components/TableShowcaseSection'

const HomeScreen = () => {
    return (
        <>
            <AuroraBackground>
                <Navbar />
                <HeroSection />
            </AuroraBackground>
            <TableShowcaseSection />
        </>
    )
}

export default HomeScreen
