import { useState } from 'react'

interface ImgWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcs: string[]
}

export default function ImgWithFallback({ srcs, alt = '', ...rest }: ImgWithFallbackProps) {
  const [index, setIndex] = useState(0)

  if (!srcs || srcs.length === 0) {
    return <div className="flex h-full w-full items-center justify-center text-zinc-600">No preview</div>
  }

  const src = srcs[Math.min(index, srcs.length - 1)]

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setIndex((i) => i + 1)}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  )
} 