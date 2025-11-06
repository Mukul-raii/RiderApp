"use client"

export default function AnimatedCar() {
  return (
    <svg
      width="280"
      height="160"
      viewBox="0 0 280 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
    >
      <defs>
        <style>{`
          @keyframes drivePulse {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(20px); }
          }
          
          @keyframes wheelSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .car-body { animation: drivePulse 3s ease-in-out infinite; }
          .wheel-left { animation: wheelSpin 1.5s linear infinite; }
          .wheel-right { animation: wheelSpin 1.5s linear infinite; }
          .car-light { animation: pulse 2s ease-in-out infinite; }
        `}</style>
      </defs>

      <g className="car-body">
        {/* Car body */}
        <path
          d="M40 100L60 60H220L240 100M40 100H240M40 100V120C40 127.73 46.27 134 54 134H80C87.73 134 94 127.73 94 120V110H186V120C186 127.73 192.27 134 200 134H226C233.73 134 240 127.73 240 120V100"
          stroke="url(#carGradient)"
          strokeWidth="3"
          fill="url(#carFill)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Windows */}
        <rect
          x="70"
          y="65"
          width="50"
          height="35"
          rx="4"
          fill="rgba(100, 200, 255, 0.3)"
          stroke="rgba(100, 200, 255, 0.6)"
          strokeWidth="1.5"
        />
        <rect
          x="160"
          y="65"
          width="50"
          height="35"
          rx="4"
          fill="rgba(100, 200, 255, 0.3)"
          stroke="rgba(100, 200, 255, 0.6)"
          strokeWidth="1.5"
        />

        {/* Car lights */}
        <circle cx="45" cy="95" r="4" fill="url(#lightGradient)" className="car-light" />
        <circle cx="235" cy="95" r="4" fill="url(#lightGradient)" className="car-light" />
      </g>

      {/* Wheels */}
      <g className="wheel-left">
        <circle cx="80" cy="120" r="18" stroke="url(#wheelGradient)" strokeWidth="4" fill="none" />
        <circle cx="80" cy="120" r="6" fill="url(#wheelGradient)" />
      </g>

      <g className="wheel-right">
        <circle cx="200" cy="120" r="18" stroke="url(#wheelGradient)" strokeWidth="4" fill="none" />
        <circle cx="200" cy="120" r="6" fill="url(#wheelGradient)" />
      </g>

      {/* Road lines */}
      <g stroke="rgba(148, 163, 184, 0.4)" strokeWidth="2" strokeDasharray="20,10" opacity="0.6">
        <line x1="0" y1="130" x2="280" y2="130" />
      </g>

      {/* Gradients */}
      <defs>
        <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="carFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>
  )
}
