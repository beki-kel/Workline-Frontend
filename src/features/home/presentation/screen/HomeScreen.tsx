'use client'

import React from 'react'
import { AuroraBackground } from '@/features/home/presentation/components/aurora-background'
import Navbar from '@/features/home/presentation/components/Navbar'
import HeroSection from '@/features/home/presentation/components/HeroSection'
import TableShowcaseSection from '@/features/home/presentation/components/TableShowcaseSection'
import FeaturesSection from '@/features/home/presentation/components/FeaturesSection'
import VideoShowcaseSection from '@/features/home/presentation/components/VideoShowcaseSection'
import Footer from '@/features/home/presentation/components/Footer'

const HomeScreen = () => {
    return (
        <>
            <AuroraBackground>
                <Navbar />
                <HeroSection />
            </AuroraBackground>
            <FeaturesSection />
            <TableShowcaseSection />
            <VideoShowcaseSection />
            <Footer />
        </>
    )
}

export default HomeScreen
