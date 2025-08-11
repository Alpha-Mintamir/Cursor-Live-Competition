export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-semibold">Virtual Cursor + GPT-5 Build Challenge</div>
          <p className="text-sm text-zinc-400 mt-2">Organized by the Ethiopian Cursor Community.</p>
        </div>
        <div>
          <div className="text-sm text-zinc-400">Socials</div>
          <div className="mt-2 flex gap-4 text-zinc-300">
            <a className="hover:text-white" href="https://github.com/Ethiopian-Cursor-Community/" target="_blank">GitHub</a>
            <a className="hover:text-white" href="https://t.me/CursorCommunityEth" target="_blank">Telegram</a>
            <a className="hover:text-white" href="https://www.linkedin.com/company/108180090/" target="_blank">LinkedIn</a>
          </div>
        </div>
        <div>
          <div className="text-sm text-zinc-400">Contact</div>
          <p className="text-xs text-zinc-500 mt-4">© {new Date().getFullYear()} Ethiopian Cursor Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 