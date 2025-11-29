'use client'

import React from 'react'
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-background border-t border-border/40 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                        <div className="bg-white/90 dark:bg-white/95 rounded-xl p-2 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                            <img
                                src="https://res.cloudinary.com/dr2h8zmll/image/upload/v1764316308/logo-workline_xievif.svg"
                                alt="Workline Logo"
                                className="w-5 h-5"
                            />
                        </div>
                        <span className="text-xl font-bold transition-all duration-300 group-hover:translate-x-1">Workline</span>
                    </div>
                    <p className="text-muted-foreground max-w-sm mb-6">
                        A secure and easy-to-use platform that brings together messaging, video calling, and task management.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="glassmorphic p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg group"
                        >
                            <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </a>
                        <a
                            href="#"
                            className="glassmorphic p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg group"
                        >
                            <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </a>
                        <a
                            href="#"
                            className="glassmorphic p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg group"
                        >
                            <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </a>
                        <a
                            href="#"
                            className="glassmorphic p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg group"
                        >
                            <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </a>
                    </div>
                </div>

                <div className="group">
                    <h3 className="font-semibold mb-4 transition-all duration-300 group-hover:translate-x-1">Product</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 inline-block">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 inline-block">
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 inline-block">
                                Integrations
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 inline-block">
                                Changelog
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="group">
                    <h3 className="font-semibold mb-4 transition-all duration-300 group-hover:translate-x-1">Company</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 inline-block">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 inline-block">
                                Careers
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 inline-block">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 inline-block">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Workline. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-foreground transition-all duration-300 hover:scale-105 inline-block">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-foreground transition-all duration-300 hover:scale-105 inline-block">
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
