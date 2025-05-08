"use client"

import { useEffect, useRef } from "react"

interface PriceChartProps {
  data: number[] | null | undefined
  isPositive: boolean
}

export function PriceChart({ data, isPositive }: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set chart dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 2

    // Check if data is valid
    if (!data || !Array.isArray(data) || data.length === 0) {
      // Draw a flat line if no data
      ctx.beginPath()
      ctx.strokeStyle = "#CBD5E1" // gray line
      ctx.lineWidth = 1.5
      const y = height / 2
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
      return
    }

    // Find min and max values
    const minValue = Math.min(...data)
    const maxValue = Math.max(...data)
    const valueRange = maxValue - minValue

    // Draw the line
    ctx.beginPath()
    ctx.strokeStyle = isPositive ? "hsl(145, 63%, 42%)" : "hsl(0, 63%, 42%)" // Replace with resolved colors
    ctx.lineWidth = 2

    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding
      const normalizedValue = valueRange === 0 ? 0.5 : (value - minValue) / valueRange
      const y = height - (normalizedValue * (height - padding * 2) + padding)

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Add a subtle gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    if (isPositive) {
      gradient.addColorStop(0, "hsla(145, 63%, 42%, 0.2)") // Replace with resolved colors
      gradient.addColorStop(1, "hsla(145, 63%, 42%, 0)")
    } else {
      gradient.addColorStop(0, "hsla(0, 63%, 42%, 0.2)") // Replace with resolved colors
      gradient.addColorStop(1, "hsla(0, 63%, 42%, 0)")
    }

    ctx.lineTo(width - padding, height - padding)
    ctx.lineTo(padding, height - padding)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()
  }, [data, isPositive])

  return (
    <div className="w-full h-16 flex items-center justify-center">
      <canvas ref={canvasRef} width={120} height={60} className="w-full h-full" />
    </div>
  )
}
