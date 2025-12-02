
"use client"

import { useState, useEffect, useMemo } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, TrendingUp } from "lucide-react"
import { Outline } from "../../domain/entities/Outline"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

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

    // Generate chart data based on the target value to simulate "real" data scaling
    const chartData = useMemo(() => {
        const baseValue = parseInt(formData.target) || 100
        const months = ["January", "February", "March", "April", "May", "June"]

        return months.map(month => ({
            month,
            desktop: Math.floor(baseValue * (0.8 + Math.random() * 0.4)), // +/- 20% of target
            mobile: Math.floor(baseValue * (0.4 + Math.random() * 0.4))  // Lower for mobile
        }))
    }, [formData.target])

    // Calculate trending percentage
    const trendingPercentage = useMemo(() => {
        if (chartData.length < 2) return 0
        const lastMonth = chartData[chartData.length - 1].desktop
        const prevMonth = chartData[chartData.length - 2].desktop
        return ((lastMonth - prevMonth) / prevMonth * 100).toFixed(1)
    }, [chartData])

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
                status: formData.status as any,
                target: parseInt(formData.target) || 0,
                limit: parseInt(formData.limit) || 0
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
            <SheetContent className="w-[540px] sm:w-[540px] overflow-y-auto px-4">
                <SheetHeader className="mb-4">
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold leading-none tracking-tight">{formData.header || "Cover page"}</h2>
                        <p className="text-sm text-muted-foreground">
                            Showing total visitors for the last 6 months
                        </p>
                    </div>
                </SheetHeader>

                <div className="mb-4">
                    <ChartContainer config={chartConfig} className="h-[200px] w-full">
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                                hide
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Area
                                dataKey="mobile"
                                type="natural"
                                fill="var(--color-mobile)"
                                fillOpacity={0.4}
                                stroke="var(--color-mobile)"
                                stackId="a"
                            />
                            <Area
                                dataKey="desktop"
                                type="natural"
                                fill="var(--color-desktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                    <div className="mt-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending {Number(trendingPercentage) > 0 ? "up" : "down"} by {Math.abs(Number(trendingPercentage))}% this month <TrendingUp className={`h - 4 w - 4 ${Number(trendingPercentage) < 0 ? "rotate-180" : ""} `} />
                        </div>
                        <div className="leading-none text-muted-foreground mt-2 text-sm">
                            Showing total visitors for the last 6 months based on target {formData.target}.
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 py-4 border-t">
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
                <SheetFooter className="mt-4">
                    <Button variant="outline" onClick={onClose} className="w-full">
                        Done
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
