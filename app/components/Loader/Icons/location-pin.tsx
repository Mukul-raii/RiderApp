interface LocationPinProps {
  className?: string
}

export default function LocationPin({ className = "" }: LocationPinProps) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))">
        {/* Pin */}
        <path
          d="M20 5C14.48 5 10 9.48 10 15C10 22 20 35 20 35C20 35 30 22 30 15C30 9.48 25.52 5 20 5Z"
          fill="url(#pinGradient)"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1"
        />

        {/* Inner circle */}
        <circle cx="20" cy="15" r="4" fill="rgba(255,255,255,0.9)" />
      </g>

      <defs>
        <linearGradient id="pinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
    </svg>
  )
}
