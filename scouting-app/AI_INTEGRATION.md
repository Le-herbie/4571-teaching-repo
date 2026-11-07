# AI video-scouter integration outline

This shell intentionally works without an AI service. The UI shows the planned connection points, while the actual provider is not wired up. This document maps where to add the watching system and the contract it should meet.

## Flow to implement

1. **Video source and ingestion** — Add a backend upload or approved video-source endpoint. Store the video in controlled object storage and save its event, match, duration, and source metadata. The browser currently has no video upload or persistence.
2. **Analysis job** — A backend worker selects the video and match context, creates an analysis job, and invokes your model/service. Make jobs retryable and track `queued`, `processing`, `needs_review`, `complete`, or `failed` states.
3. **Provider adapter (the main AI insertion point)** — Implement a server-side interface such as `IVideoScoutProvider.AnalyzeAsync(video, matchContext, cancellationToken)`. Put model-specific calls, prompting, frame extraction, authentication, and response parsing behind this adapter. The UI should not depend on which provider/model is used.
4. **Structured suggestions** — Normalize model output into observations with a target team, concise claim, category, video timestamp or time range, confidence, and provider/model metadata. Validate team numbers, bounds, and schema on the server. Keep raw model output separately for debugging if appropriate, with suitable access and retention controls.
5. **Scout review** — Add a review queue where a scout can inspect the referenced clip, accept, edit, or reject each suggestion. Only accepted/corrected suggestions become verified scouting entries. Preserve provenance so AI-drafted notes remain distinguishable from human-entered or human-corrected data.
6. **Team summaries** — Generate concise summaries from verified entries, linked to their source match observations. Make uncertainty and limited sample size visible; do not treat an unreviewed model claim as fact.

## Suggested normalized suggestion contract

```json
{
  "id": "server-generated-id",
  "eventId": "event-id",
  "matchId": "match-id",
  "teamNumber": 4571,
  "category": "cycle | defense | mobility | reliability | other",
  "claim": "Completed two cycles from the center line.",
  "startSeconds": 42.1,
  "endSeconds": 57.8,
  "confidence": 0.82,
  "status": "pending_review",
  "provider": "your-provider",
  "modelVersion": "model-version",
  "reviewedBy": null,
  "reviewedAt": null
}
```

Treat confidence as a review aid, not proof of correctness. A claim should be traceable to video and match context. If the robot cannot be identified confidently, return an explicit unknown/ambiguous result instead of assigning the behavior to a team.

## Where the shell changes

- `index.html`: the AI status card, future-draft messaging, and pipeline steps show where a review queue and job status can be added.
- `app.js`: current observations use a small local object schema. Replace local-storage persistence with API calls; add screens for upload, job progress, and accept/edit/reject review. Keep all provider credentials out of this file.
- `styles.css`: responsive layout and reusable cards/forms are ready to extend for a review experience.
- This document: provider adapter and data-flow contract. Add the actual interface, provider implementation, and worker in the future backend project (recommended: ASP.NET Core), not in frontend code.

## API key / secret placement

When you connect your service, put its secret in the **server-side environment or secret manager used by the backend worker**, then read it in the provider adapter. For local development, use a gitignored user-secrets mechanism or environment variable; for deployment, use the hosting platform's secret store. The browser should call your authenticated backend and never receive the provider key. A frontend `.env` value that is bundled into a static app is public, not secret.

Adding a key only authenticates calls to a configured service; it does not supply video ingestion, robot tracking, event/match association, model behavior, or a review workflow. Those need implementation and testing. Training or fine-tuning, if used, is a separate pipeline: collect permitted video, label robot identities/actions and timestamps, version the dataset, split train/validation/test data by match/event to avoid leakage, evaluate errors, and document consent/retention. The app does not currently collect or train on video.

## Before using at an event

- Confirm video source terms, permissions, and any privacy/retention requirements.
- Test across camera angles, occlusion, lighting, crowded field states, and team-number/robot identity ambiguity.
- Measure false team attribution and missed actions, not just average accuracy.
- Make it easy for scouts to correct errors and keep the original evidence.
- Have a safe fallback to manual scouting whenever analysis is unavailable.
