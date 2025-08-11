export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold">About the Challenge</h1>
      <p className="mt-4 text-zinc-300">
        We hosted a Cursor Live Building Competition using Cursor and GPT-5.
        The event ran from 5:00 PM – 9:00 PM (11:00 – 3:00 LT), and prizes were awarded to the top performers.
      </p>
      <p className="mt-2 text-zinc-300">
        From more than 100 registrations, 30 participants were selected based on first‑come, first‑served order,
        GitHub profile review, and priority for those who couldn’t join the last in‑person hackathon.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="card-surface p-4">
          <div className="text-sm text-zinc-400">Tools</div>
          <div className="mt-1 font-semibold">Cursor + GPT-5</div>
        </div>
        <div className="card-surface p-4">
          <div className="text-sm text-zinc-400">Participants</div>
          <div className="mt-1 font-semibold">30 selected (100+ registered)</div>
        </div>
        <div className="card-surface p-4">
          <div className="text-sm text-zinc-400">Schedule</div>
          <div className="mt-1 text-zinc-300">5:00 PM – 9:00 PM (11:00 – 3:00 LT)</div>
        </div>
      </div>

      <div className="mt-10 card-surface p-4 sm:p-6 flex items-center gap-4">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQGU6g1uCXXc8Q/profile-displayphoto-crop_800_800/B4DZhj13H2GsAM-/0/1754021723417?e=1757548800&v=beta&t=MYsfqLe6v4wdR0Kgbx3ZxR1uojucN1ki43HzkS1KClE"
          alt="Alpha Lencho"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">Alpha Lencho</div>
          <div className="text-sm text-zinc-400">Host & Organizer · Cursor Ambassador</div>
          <a
            className="text-sm text-accent hover:underline"
            target="_blank"
            href="https://www.linkedin.com/in/alpha-lencho-13b8281bb/"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <p className="mt-6 text-zinc-400 text-sm">Organized by the Ethiopian Cursor Community.</p>
    </div>
  )
} 