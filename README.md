# 🥾 bootstraps: software factory extraordinaire

> *"The best way to predict the future is to bootstrap it."* — probably someone, somewhere

Welcome to **bootstraps**, the absurdly awesome software factory that turns caffeine, vibes, and good intentions into shipping code at light speed. ⚡

---

## ✨ Why bootstraps is awesome

- 🚀 **Blazing fast** — From zero to "it works on my machine" in record time.
- 🧠 **Smart by default** — Sensible defaults so you can focus on what actually matters.
- 🧰 **Batteries included** — Everything you need to go from idea to artifact.
- 🪄 **Magical DX** — Tooling so smooth you'll forget you ever wrote a Makefile by hand.
- 🌍 **Built to scale** — From scrappy weekend hacks to planet-scale platforms.
- 🤝 **Plays well with others** — Composable, hackable, and friendly to your stack.

## 🏭 What is this, really?

bootstraps is a **software factory** — a curated set of patterns, templates, and conventions
that lets teams (and the occasional lone wolf) spin up production-ready projects without
re-inventing the wheel, the axle, or the entire transportation industry.

Think of it as:

- The opinionated friend who has *already made* all the tough early decisions.
- A launchpad that handles the boring stuff so you can do the fun stuff.
- A guarantee that day 1 of your project doesn't doom day 365.

## 🎯 Core principles

1. **Velocity without recklessness** — Move fast, but with rails.
2. **Convention over chaos** — Boring choices unlock exciting outcomes.
3. **Joy is a feature** — If it's not delightful to use, it's a bug.
4. **Small surfaces, deep value** — Less to learn, more to gain.

## 🚦 Getting started

```bash
# 1. Clone the awesomeness
git clone <this-repo>

# 2. Bootstrap your project
cd bootstraps

# 3. Profit 📈
```

## 📮 Suggestion site

This repo also hosts a tiny **Next.js (App Router) + TypeScript** "suggestion box"
at its root. Visitors submit a feature suggestion, and the server forwards it to an
Auto webhook that spawns an agent to build it.

### Local development

```bash
# 1. Install dependencies
npm install

# 2. Configure the webhook env vars
cp .env.example .env.local
# then edit .env.local and fill in the two values

# 3. Run the dev server
npm run dev
# open http://localhost:3000
```

The submit form POSTs to `/api/suggest`, a server-only route that adds the bearer
token and forwards `{ suggestion, name, email }` to the webhook. The token is never
exposed to the browser.

### Environment variables

Set these locally in `.env.local` and on Vercel (Project → Settings → Environment Variables):

| Variable | Description |
| --- | --- |
| `AUTO_SUGGESTION_WEBHOOK_URL` | Auto webhook URL that receives forwarded suggestions. |
| `AUTO_SUGGESTION_WEBHOOK_TOKEN` | Bearer token sent as `Authorization: Bearer <token>`. Server-only secret. |

If either variable is missing, `/api/suggest` returns a descriptive `500` so the
misconfiguration is obvious.

## 🌟 The vibe

This project is unapologetically optimistic about software. It believes that good
tooling, kind defaults, and a little bit of magic can make building things feel
like play again.

Welcome aboard. Let's build something awesome. 🛠️
