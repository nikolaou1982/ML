import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const k = Math.max(1, Math.min(12, Number(url.searchParams.get('k') || '3')))

  // Try to proxy to the FastAPI backend if it's running
  const backendUrl = `http://127.0.0.1:8000/train/kmeans?k=${k}`
  try {
    const res = await fetch(backendUrl)
    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(data)
    }
    // fall through to mock generation if backend returns non-ok
  } catch (err) {
    // backend not available, fall back to mock data
  }

  // Mock data: generate `k` cluster centers and 300 points
  const centers = Array.from({ length: k }, (_, i) => ({
    x: Math.cos((i * 2 * Math.PI) / k),
    y: Math.sin((i * 2 * Math.PI) / k),
  }))

  const points: Array<{ x: number; y: number; color: string; label: string }> = []
  for (let i = 0; i < 300; i++) {
    const c = centers[i % k]
    const x = c.x + (Math.random() - 0.5) * 0.4
    const y = c.y + (Math.random() - 0.5) * 0.4
    const color = `hsl(${((i % k) * 360) / k} 60% 50%)`
    points.push({ x, y, color, label: `s${i}` })
  }

  return NextResponse.json({ k, points })
}
