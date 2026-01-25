
export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  gradient: string;
  pattern: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "feynman-technique-vs-active-recall",
    category: "Study Technique",
    title: "The Feynman Technique: Learn Difficult Concepts 4x Faster",
    excerpt: "We analyzed 500 top rankers to see which method leads to better long-term retention compared to rote memorization.",
    content: `
      <h2>Introduction</h2>
      <p>The Feynman Technique is a mental model named after Nobel Prize-winning physicist Richard Feynman. Known as the "Great Explainer," Feynman was revered for his ability to clearly illustrate dense topics like quantum physics for virtually anybody.</p>
      
      <h2>How to use it</h2>
      <p>The technique is simple: identify a concept you want to learn. Then, pretend you are teaching it to a sixth-grade student. If you get stuck or use jargon, it means you don't fully understand it yet. Go back to the source material and re-learn the gap.</p>

      <h2>Active Recall</h2>
      <p>Active recall involves testing yourself on the material you are trying to learn. Instead of reading and re-reading, you close the book and recite what you know. This forces your brain to retrieve information, strengthening neural pathways.</p>

      <h2>Conclusion</h2>
      <p>Combining the Feynman Technique with Active Recall creates a powerhouse study method that ensures you not only remember more but understand deeper.</p>
    `,
    readTime: "5 min read",
    author: "Dr. A. Singh",
    date: "Oct 12, 2024",
    image: "/id1.png", 
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    pattern: "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.2) 0, transparent 50%)"
  },
  {
    id: "2",
    slug: "deep-work-focus",
    category: "Productivity",
    title: "Deep Work: Rewiring Your Brain for Intense Focus",
    excerpt: "In an age of distraction, the ability to focus is a superpower. Here is the protocol to reclaim your attention span.",
    content: `
      <h2>The Distraction Epidemic</h2>
      <p>We live in an attention economy. Social media, emails, and notifications are constantly fighting for our mental bandwidth. This constant switching of context destroys our ability to perform deep, cognitive work.</p>

      <h2>What is Deep Work?</h2>
      <p>Deep Work, a term coined by Cal Newport, refers to professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit.</p>

      <h2>The Protocol</h2>
      <ul>
        <li><strong>Schedule it:</strong> Deep work doesn't happen by accident. Block out 2-4 hours.</li>
        <li><strong>Ritualize it:</strong> Have a dedicated space and routine (e.g., coffee, headphones).</li>
        <li><strong>Eliminate Distractions:</strong> Put your phone in another room. Turn off wifi if needed.</li>
      </ul>
    `,
    readTime: "3 min read",
    author: "Sarah J.",
    date: "Nov 05, 2024",
    image: "/id2.png",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    pattern: "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)"
  },
  {
    id: "3",
    slug: "exam-anxiety-protocol",
    category: "Mental Health",
    title: "Exam Anxiety: The Navy SEAL Protocol for Calm",
    excerpt: "Regulate your nervous system before the big test using 'Box Breathing' and other physiological control techniques.",
    content: `
      <h2>The Physiology of Panic</h2>
      <p>When you're anxious, your body enters a "fight or flight" mode. Your heart rate spikes, your breathing prevents oxygen from reaching your brain efficiently, and your logical thinking shuts down.</p>

      <h2>Box Breathing</h2>
      <p>This technique is used by Navy SEALs to stay calm in high-stakes situations:</p>
      <ol>
        <li>Inhale for 4 seconds.</li>
        <li>Hold your breath for 4 seconds.</li>
        <li>Exhale for 4 seconds.</li>
        <li>Hold your empty breath for 4 seconds.</li>
      </ol>
      <p>Repeat this cycle for 2-3 minutes to instantly lower cortisol levels.</p>
    `,
    readTime: "4 min read",
    author: "Mark Divine",
    date: "Dec 10, 2024",
    image: "/id3.png",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    pattern: "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 10px)"
  },
  {
    id: "4",
    slug: "pomodoro-mastery",
    category: "Time Management",
    title: "The Pomodoro Technique: Mastering Time in 25-Minute Bursts",
    excerpt: "Combat burnout and maintain high energy levels all day by breaking your work into small, manageable intervals.",
    content: `
      <h2>The Power of Intervals</h2>
      <p>The human brain isn't designed to focus for 8 hours straight. Attempting to do so leads to diminishing returns and mental fatigue. Ideally, we work best in sprints.</p>

      <h2>How to Pomodoro</h2>
      <ol>
        <li>Pick a single task.</li>
        <li>Set a timer for 25 minutes.</li>
        <li>Work until the timer rings. Ignore everything else.</li>
        <li>Take a 5-minute break (stretch, walk, water).</li>
        <li>Every 4 cycles, take a longer 15-30 minute break.</li>
      </ol>
      <p>This rhythm keeps your mind fresh and creates a sense of urgency that prevents procrastination.</p>
    `,
    readTime: "3 min read",
    author: "Francesco C.",
    date: "Jan 15, 2025",
    image: "/id4.png",
    gradient: "from-red-500 via-rose-500 to-pink-600",
    pattern: "radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2.5px) 0 0 / 10px 10px"
  }
];
