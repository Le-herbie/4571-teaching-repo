# ScoutForge — FRC scouting shell

A phone-friendly, local-first scouting prototype with a deliberately separated AI video-analysis integration seam. The existing Java lessons at the repository root are untouched.

## Run it

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or API key is required. The sample entries are starter demo data; new observations and schedule imports are saved in that browser's local storage. This is a prototype, not a shared team database: clearing browser storage or changing devices will lose locally saved changes.

## Included

- Overview dashboard with team, observation, and schedule counts.
- Compact team summaries assembled from scout observations, with original notes available in recent entries.
- Quick match-scouting form designed for phone screens.
- CSV schedule import and match list. Required header names: `match, red1, red2, red3, blue1, blue2, blue3`.
- Offline-tolerant local entry and responsive layout.
- AI video pipeline placeholder and implementation outline in [AI_INTEGRATION.md](AI_INTEGRATION.md).

## Important prototype limits

There is no authentication, server API, actual synchronization, video upload, AI inference, or authorization. The schedule import UI says admin/trusted user, but roles cannot be enforced until an authenticated backend exists. Do not put an AI provider secret in `app.js`, HTML, or any browser-delivered file. Browser storage is not a backup or secure database.

## Suggested next implementation

Add an ASP.NET Core API and persistent database for events, matches, scout observations, uploaded-video metadata, and AI suggestions. Keep the frontend-facing observation schema stable. Implement authorization for schedule imports and review actions, then connect a provider behind the documented analysis adapter. AI output should remain a proposal until a scout reviews it.
