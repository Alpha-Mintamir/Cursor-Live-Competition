import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import DeviceFrame from './DeviceFrame'

const HERO_BANNER = 'https://media.licdn.com/dms/image/v2/D4D22AQFTAqT60LZZjg/feedshare-shrink_1280/B4DZiKutIQGkAk-/0/1754674157228?e=1757548800&v=beta&t=3gAZNzowmC_pfAG4KcMPm28aEYN59hNw0bb9jqk3ChE'
const LIVE_SCREENSHOT = 'https://media.licdn.com/dms/image/v2/D4D22AQGXX5GvSzuwWA/feedshare-shrink_2048_1536/B4DZiUmruvGQAo-/0/1754839826679?e=1757548800&v=beta&t=8H1SvzaF9ye95-3ffgH1lbcW2LMKGLCk7Ku7oFaHGGk'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight"
            >
              Virtual Cursor + GPT-5
              <br />
              <span className="gradient-text">Build Challenge</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-6 max-w-2xl text-zinc-300"
            >
              Sleek, minimal, and tech-inspired showcase of innovative projects. Explore winners, filter by tech stack, and watch demos.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link to="/projects" className="button-primary">Explore Projects</Link>
              <a
                href="#winners"
                className="inline-flex items-center rounded-lg px-4 py-2 font-medium text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800/40 transition"
              >
                View Winners
              </a>
            </motion.div>
          </div>

          <div className="relative">
            {/* Glow backdrop */}
            <div className="pointer-events-none absolute -inset-10 -z-10 opacity-40 blur-3xl" aria-hidden>
              <div className="absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full"
                   style={{ background: 'radial-gradient(circle at 50% 50%, var(--accent), transparent 60%)' }} />
              <div className="absolute top-40 right-10 h-64 w-64 rounded-full"
                   style={{ background: 'radial-gradient(circle at 50% 50%, var(--accent-2), transparent 60%)' }} />
            </div>

            {/* Main banner card with gradient border */}
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-[var(--accent)]/50 to-[var(--accent-2)]/50 p-[2px] shadow-[0_30px_80px_-20px_rgba(0,229,255,0.25)]">
                <div className="relative overflow-hidden rounded-[22px]">
                  <img
                    src={HERO_BANNER}
                    alt="Virtual Cursor + GPT-5 Challenge banner"
                    className="h-72 w-full object-cover sm:h-96 lg:h-[28rem]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/20 to-transparent" />
                </div>
              </div>

              {/* Screenshot below the banner – no overlap */}
              <div className="mt-4 hidden sm:flex justify-end">
                <DeviceFrame imageUrl={LIVE_SCREENSHOT} alt="Live competition screenshot" className="w-56 sm:w-64 md:w-80" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-30 blur-3xl" aria-hidden>
        <div className="absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full"
             style={{ background: 'radial-gradient(circle at 50% 50%, var(--accent), transparent 60%)' }} />
        <div className="absolute top-40 right-10 h-64 w-64 rounded-full"
             style={{ background: 'radial-gradient(circle at 50% 50%, var(--accent-2), transparent 60%)' }} />
      </div>
    </section>
  )
} 