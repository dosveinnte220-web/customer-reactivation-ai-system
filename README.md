# ReactivationIQ

ReactivationIQ is a demo-friendly customer reactivation MVP built with Next.js, Tailwind, and TypeScript. It includes a dashboard, segmentation logic, customer directory, message generation templates, and a demo workspace that runs without live Supabase, OpenAI, or Twilio credentials.

## Features
- Customer dashboard and segment overview
- CSV validation helpers for import workflows
- Deterministic message template generation
- Demo dataset with fictional customers
- Deployable Next.js app for Vercel

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run start
```

## Notes
This project is intentionally structured as a production-minded MVP with safe demo behavior and clear labels to avoid claiming production data or live provider integrations.
