"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Outline } from "../../domain/entities/Outline"

interface EditOutlineSidebarProps {
    outline: Outline | null
    isOpen: boolean
    onClose: () => void
    onUpdate: (updatedOutline: Outline) => Promise<any>
}

export function EditOutlineSidebar({ outline, isOpen, onClose, onUpdate }: EditOutlineSidebarProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        header: "",
        type: "",
        status: "",
        target: "",
        limit: "",
        reviewer: ""
    })

    useEffect(() => {
        if (outline) {
            setFormData({
                header: outline.header || "",
                type: "article", // Mock default
                status: outline.status || "draft",
                target: outline.target?.toString() || "18", // Mock default
                limit: outline.limit?.toString() || "5", // Mock default
                reviewer: "Eddie Lake" // Mock default
            })
        }
    }, [outline])

    const handleSubmit = async () => {
        if (!outline) return

        setIsLoading(true)
        try {
            // Simulate API call with AI response
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Call the update function passed from parent
            await onUpdate({
                ...outline,
                header: formData.header,
                status: formData.status as any
            })

            toast.success("AI Response: Outline updated successfully based on your changes.")
            onClose()
        } catch (error) {
            toast.error("Failed to update outline")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Edit Outline</SheetTitle>
                    <SheetDescription>
                        Make changes to your outline here. Click submit when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="header">Header</Label>
                        <Input
                            id="header"
                            value={formData.header}
                            onChange={(e) => setFormData({ ...formData, header: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) => setFormData({ ...formData, type: value })}
                            >
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="article">Article</SelectItem>
                                    <SelectItem value="blog">Blog Post</SelectItem>
                                    <SelectItem value="news">News</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="target">Target</Label>
                            <Input
                                id="target"
                                type="number"
                                value={formData.target}
                                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="limit">Limit</Label>
                            <Input
                                id="limit"
                                type="number"
                                value={formData.limit}
                                onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="reviewer">Reviewer</Label>
                        <Select
                            value={formData.reviewer}
                            onValueChange={(value) => setFormData({ ...formData, reviewer: value })}
                        >
                            <SelectTrigger id="reviewer">
                                <SelectValue placeholder="Select reviewer" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                                <SelectItem value="Sarah Smith">Sarah Smith</SelectItem>
                                <SelectItem value="John Doe">John Doe</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <SheetFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
