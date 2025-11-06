export default function LoadingDots() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="w-3 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      />
      <div
        className="w-3 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  )
}
