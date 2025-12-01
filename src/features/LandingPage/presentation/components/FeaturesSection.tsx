'use client'

import React, { useId, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const FeaturesSection = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Transform values for dramatic 3D entrance
    const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [15, 0, 0, -5])
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.95])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7])
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [120, 0, 0, -40])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center py-32 px-10 overflow-hidden"
        >
            <motion.div
                style={{
                    rotateX,
                    scale,
                    opacity,
                    y,
                    transformPerspective: 1200,
                }}
                className="w-full"
            >
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="max-w-7xl mx-auto mb-20 text-center"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        Everything you need to build
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Powerful features to help you manage your projects, collaborate with your team, and ship faster.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {grid.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30, rotateY: -10 }}
                            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.08,
                                ease: [0.25, 0.4, 0.25, 1]
                            }}
                            whileHover={{
                                scale: 1.05,
                                rotateY: 5,
                                z: 50,
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                            className="glassmorphic relative p-6 rounded-3xl overflow-hidden min-h-[280px] flex flex-col justify-between group hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                                <Grid size={20} />
                            </div>
                            <div className="relative z-20 mt-auto">
                                <p className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                                    {feature.title}
                                </p>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

const grid = [
    {
        title: "Collaborative Editing",
        description:
            "Work together in real-time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly.",
    },
    {
        title: "Real time changes",
        description:
            "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version.",
    },
    {
        title: "Version control",
        description:
            "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version.",
    },
    {
        title: "Content Management",
        description:
            "Plan and organize your social media content with an intuitive calendar view, ensuring you never miss a post.",
    },
    {
        title: "Audience Targeting",
        description:
            "Reach the right audience with advanced targeting options, including demographics, interests, and behaviors.",
    },
    {
        title: "Social Listening",
        description:
            "Monitor social media conversations and trends to stay informed about what your audience is saying and respond in real-time.",
    },
    {
        title: "Customizable Templates",
        description:
            "Create stunning social media posts with our customizable templates, designed to fit your brand's unique style and voice.",
    },
    {
        title: "Team Collaboration",
        description:
            "Work seamlessly with your team using our collaboration tools, allowing you to assign tasks, share drafts, and provide feedback.",
    },
];

export const Grid = ({
    pattern,
    size,
}: {
    pattern?: number[][];
    size?: number;
}) => {
    const p = pattern ?? [
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];
    return (
        <div className="pointer-events-none absolute inset-0 h-full w-full">
            <GridPattern
                width={size ?? 20}
                height={size ?? 20}
                x="-12"
                y="4"
                squares={p}
                className="absolute inset-0 h-full w-full mix-blend-overlay stroke-black/5 fill-black/5 dark:fill-white/5 dark:stroke-white/5"
            />
        </div>
    );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y]: any) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}`}
                            width={width + 1}
                            height={height + 1}
                            x={x * width}
                            y={y * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
}

export default FeaturesSection
