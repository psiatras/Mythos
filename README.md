# MYTHOS QUEST

An original, mobile-first Modern Greek adventure. Chapter 1 has 12 short missions across Plaka, Monastiraki and the Acropolis, with scripted play that works without paid services.

## Run

Requires Node.js 20.9+ and npm. Run `npm ci`, then `npm run dev` and open `http://localhost:3000`. Use `npm run build` for a production build, `npm start` to serve it, and `npm test` for curriculum and progression checks. With the server running, use `npm run e2e` for the browser flow; it requires Chromium at `/usr/bin/chromium` or `CHROMIUM_PATH` set to another executable.

The first launch asks for an avatar and nickname. Progress stays in browser local storage; no account or database is required. Complete quests in sequence, tap scene hotspots, revisit completed missions, collect artefacts, and review learned vocabulary. Listening uses device speech synthesis where available and shows text after an attempt. Speaking always has a text path.

## Optional OpenAI features

For local development, copy `.env.example` to `.env.local`, set `OPENAI_API_KEY` there, and restart the server. In the Codex cloud environment, add the `MYTHOS_OPENAI_API_KEY` secret in environment settings; its allowed destination is `api.openai.com`. The app accepts either name on the server and never sends the key to the browser. `OPENAI_TEXT_MODEL` defaults to `gpt-4.1-mini`; `OPENAI_TRANSCRIPTION_MODEL` defaults to `gpt-4o-mini-transcribe`. API routes enforce short inputs, bounded sessions, rate limits, request timeouts and structured dialogue output. Audio is sent for transcription and not stored by this app. Transcript text confirms recognised words, not detailed pronunciation quality. Without credentials, Hermes gives scripted clues and text answers complete every mission.

## Deploy on Render

Push the app to a GitHub repository first. This workspace currently has an unborn `work` branch and the GitHub `main` branch is empty, so Render cannot deploy from GitHub until the source is committed and pushed. The included `render.yaml` configures a Node web service with `npm ci && npm run build`, `npm start`, and a `/` health check. In Render, create a Blueprint from the repository or create a Node web service with those commands. Render supplies `PORT`; the app binds to all interfaces. Set `OPENAI_API_KEY` in the Render dashboard only if you want AI features. Anonymous game progress remains in each player's browser and does not require a database.

## Content and provenance

The local seed curriculum is tagged for educator review. The importer, `npm run content:import`, requests selected pages from the MediaWiki API and writes revision-stamped JSON to `data/imported/`. It keeps source text separate from approved game material. Network access to `en.wikibooks.org` is needed only to refresh imported content; the game never calls it at runtime. See [CONTENT_PROVENANCE.md](CONTENT_PROVENANCE.md) and the in-app Credits page for attribution and licences.

## Architecture

`lib/content.ts` holds data-driven missions and vocabulary. `lib/progress.ts` handles unlocks, XP, review intervals and browser persistence. `components/Game.tsx` renders the map, scenes, quest journal, challenges and progress screens. `app/api` contains optional server-side AI endpoints. All current routes work without a database. A future multi-device release can replace the storage functions in `lib/progress.ts` with a hosted persistence adapter.

The `/dev/content` route is available only in development mode. It lets a developer edit mission JSON locally, validate its schema, and download a draft for review and integration into `lib/content.ts`. Run `npm test` and `npm run build` after integration. No unsecured public editing endpoint is provided.

## Current limits

The 12 missions are complete but short, generally closer to 2 minutes than the 5-minute target. Seed language material, transliteration and pronunciation guidance need review by a Modern Greek educator before commercial launch. Device text-to-speech quality varies. The next world is a preview; Chapter 1 is the playable scope. The AI conversation is optional and limited to on-quest learning. Progress is local to one browser.
