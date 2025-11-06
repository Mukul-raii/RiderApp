export default function RiderLogo() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Car outline */}
      <path
        d="M20 45L25 30H55L60 45M20 45H60M20 45V55C20 57.2091 21.7909 59 24 59H28C30.2091 59 32 57.2091 32 55V52H48V55C48 57.2091 49.7909 59 52 59H56C58.2091 59 60 57.2091 60 55V45"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      />

      {/* Wheels */}
      <circle cx="28" cy="55" r="4" fill="currentColor" className="text-white" />
      <circle cx="52" cy="55" r="4" fill="currentColor" className="text-white" />

      {/* Windows */}
      <path d="M28 35L35 32M52 35L45 32" stroke="currentColor" strokeWidth="1.5" className="text-cyan-300" />

      {/* Driver */}
      <circle cx="40" cy="20" r="3" fill="currentColor" className="text-yellow-300" />
    </svg>
  )
}
