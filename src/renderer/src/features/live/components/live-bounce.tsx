export const LiveBounce = () => {
  return (
    <span className="relative flex size-2.5">
      <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
      <span className="relative inline-flex size-2.5 bg-green-500 rounded-full"></span>
    </span>
  )
}
