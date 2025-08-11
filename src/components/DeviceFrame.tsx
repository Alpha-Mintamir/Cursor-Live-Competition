import clsx from 'clsx'

interface DeviceFrameProps {
  imageUrl: string
  alt?: string
  className?: string
}

export default function DeviceFrame({ imageUrl, alt, className }: DeviceFrameProps) {
  return (
    <div className={clsx("rounded-[22px] bg-zinc-900/60 ring-1 ring-white/10 shadow-xl overflow-hidden", className)}>
      <div className="h-8 w-full bg-zinc-950/70 ring-1 ring-white/5 flex items-center gap-2 px-3">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <span className="h-3 w-3 rounded-full bg-green-500/70" />
      </div>
      <div className="relative">
        <img src={imageUrl} alt={alt} className="w-full object-cover" loading="lazy" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
    </div>
  )
} 