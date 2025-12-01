'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CardContainer, CardBody, CardItem } from './3d-card'
import { Play } from 'lucide-react'

const VideoShowcaseSection = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Transform values for scroll animations
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8])
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95])
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -30])

    const videos = [
        {
            title: "Real-Time Collaboration",
            description: "Experience seamless teamwork with live updates and instant synchronization",
            thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "2:30"
        },
        {
            title: "Smart Task Management",
            description: "Organize projects efficiently with intuitive boards and powerful automation",
            thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "3:15"
        },
        {
            title: "HD Video Conferencing",
            description: "Connect with crystal-clear video calls and screen sharing capabilities",
            thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&q=80",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "1:45"
        }
    ]

    return (
        <section ref={containerRef} className="relative py-24 px-10 overflow-hidden">
            <motion.div
                style={{ opacity, scale, y }}
                className="max-w-7xl mx-auto"
            >
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        See Workline In Action
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Watch how teams transform their workflow with Workline's powerful features.
                    </p>
                </motion.div>

                {/* Video Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-16">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <CardContainer className="inter-var">
                                <CardBody className="glassmorphic relative group/card hover:shadow-2xl w-auto h-auto rounded-3xl p-6 pt-10 border-white/20">
                                    <CardItem
                                        translateZ="50"
                                        className="text-xl font-bold text-foreground mb-2"
                                    >
                                        {video.title}
                                    </CardItem>
                                    <CardItem
                                        as="p"
                                        translateZ="60"
                                        className="text-muted-foreground text-sm leading-relaxed mb-4"
                                    >
                                        {video.description}
                                    </CardItem>
                                    <CardItem
                                        translateZ="100"
                                        className="w-full mb-4"
                                        as="a"
                                        href={video.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="relative rounded-xl overflow-hidden group/video cursor-pointer">
                                            <img
                                                src={video.thumbnail}
                                                className="h-60 w-full object-cover rounded-xl group-hover/video:scale-105 transition-transform duration-300"
                                                alt={video.title}
                                            />
                                            {/* Play Button Overlay */}
                                            <div className="absolute inset-0 bg-black/40 group-hover/video:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                                <div className="glassmorphic p-4 rounded-full group-hover/video:scale-110 transition-transform duration-300">
                                                    <Play className="w-8 h-8 text-white fill-white" />
                                                </div>
                                            </div>
                                            {/* Duration Badge */}
                                            <div className="absolute bottom-3 right-3 glassmorphic px-3 py-1 rounded-lg text-white text-sm font-semibold">
                                                {video.duration}
                                            </div>
                                        </div>
                                    </CardItem>
                                    <div className="flex justify-end">
                                        <CardItem
                                            translateZ={20}
                                            as="a"
                                            href={video.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-4 text-foreground rounded-xl underline  text-sm font-semibold transition-colors hover:scale-105 duration-200"
                                        >
                                            Watch Now →
                                        </CardItem>
                                    </div>
                                </CardBody>
                            </CardContainer>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

export default VideoShowcaseSection
