# Talk to Jesus

Conversational devotional app — prayer guidance, parables, and "what would Jesus do" reflections, each running its own tuned persona.

Built **November–December 2024**, back when this idea wasn't everywhere yet. There are a fair few of these around now. This one got there first.

Also a frontend sidequest — an excuse to build something atmospheric where the visual treatment was the point.

---

## The particle field

`components/particles.tsx` — 6,000 points via `@react-three/fiber`, drifting on three axes at slightly different rates so the motion never visibly loops:

```tsx
points.current.rotation.x = clock.getElapsedTime() * 0.05;
points.current.rotation.y = clock.getElapsedTime() * 0.03;
points.current.rotation.z = clock.getElapsedTime() * 0.02;
```

Additive blending with `depthWrite` off, so overlapping points pile into brighter patches instead of z-fighting. That's what makes it glow rather than look like a flat field of dots.

WebGL can't prerender, so the canvas mounts through `next/dynamic` with `ssr: false`. It's `aria-hidden` with `pointerEvents: 'none'` — a decorative layer shouldn't eat clicks or turn up in a screen reader — and `dpr` is capped at 1.5 so 6,000 points don't get multiplied again by a retina pixel ratio.

The rest is layered `backdrop-blur` over gradients, self-hosted Adelle Sans, and Framer Motion for transitions.

## The personas

There's no single chatbot. `getSystemPrompt(chatId)` composes a shared base prompt with a mode-specific extension, so each surface behaves differently — **prayer** helps you write one, **parable** builds modern parallels from biblical wisdom, **wwjd** applies old teaching to current situations, **kindness** suggests concrete acts of service.

Composing beats four separate prompts because tone stays consistent while intent changes, and tweaking the shared voice updates all four at once.

Errors stay in character too. API dies and you get *"My child, I apologize but I am unable to respond at this moment"* rather than a stack trace — in an app like this a raw error message shatters the whole thing.

## Stack

Next.js (pages router) · TypeScript · Tailwind · three.js / react-three-fiber · Framer Motion · DeepSeek · [Privy](https://privy.io) for auth

```bash
npm install
cp .env.example .env.local   # DeepSeek key + Privy app ID
npm run dev
```

Won't build without a valid Privy ID — the provider initialises during prerender.

## Rate limiting

Chat endpoint is IP-limited to 20 requests/hour with a 2,000-char cap, because it fronts a paid API on a public route.

It's an in-memory map, so **per-instance** — serverless runs several, so this bounds abuse rather than stopping it. Proper fix is a shared store if it ever sees real traffic. Flagging it rather than pretending.

## Known gaps

**No streaming** — responses land all at once, so a long reflection feels like it hung. Biggest UX problem here and the first thing I'd fix.

**No conversation memory** — every message is independent. The system prompt carries the persona, nothing carries the thread, so you can't refer back to what you just said.

Also ~16MB of unoptimized images in `public/`, and no tests. The visual design is the best part of this and it currently loads slowly enough to undercut itself.

MIT
