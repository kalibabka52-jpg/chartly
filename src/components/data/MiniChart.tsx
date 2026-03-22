interface MiniChartProps {
  data: number[]
  positive?: boolean
  width?: number
  height?: number
}

export function MiniChart({ data, positive = true, width = 80, height = 32 }: MiniChartProps) {
  if (!data.length) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <polyline
        points={pts}
        stroke={positive ? '#10b981' : '#f43f5e'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
