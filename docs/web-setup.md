# Web setup and deployment

The repository now includes a minimal JavaScript web application scaffold: React + Vite + Tailwind CSS in `frontend/`, and an Express API in `backend/`. Electron remains optional for a future desktop build. PostgreSQL is the database configured for the web API; the existing SQLite schema remains the local/offline design proposal.

## Run locally

1. Install Node.js 20 or newer and PostgreSQL.
2. From the repository root, install dependencies:

   ```bash
   npm install
   ```

3. Create a PostgreSQL database, then apply the starter schema:

   ```bash
   psql "$DATABASE_URL" -f backend/src/database/schema.sql
   ```

   Set `DATABASE_URL` in the environment first, or run the command with the connection URL directly.
4. Copy `.env.example` to `.env` and set `DATABASE_URL` and `PGSSL` as appropriate.
5. Start the frontend and API in development mode:

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173`. Vite proxies `/api` requests to the API at `http://localhost:3000`.

## Production deployment

- Build the frontend with `npm run build`.
- Run the API with `npm start` and set `NODE_ENV=production`, `PORT` (or `API_PORT`), `DATABASE_URL`, and `PGSSL=true` when required by the PostgreSQL provider.
- The Express server serves `frontend/dist` in production, so the web UI and API can share one origin. For separate frontend/API hosting, configure `CORS_ORIGIN` with the exact frontend origin(s).
- Use a managed PostgreSQL service, HTTPS, protected environment secrets, automated database backups, and a migration process in production. Never commit `.env` or database credentials.

## Current scope

The scaffold provides a starter dashboard, `GET /api/health`, and `GET /api/products`. It is not yet a complete POS application: authentication, authorization, sales, inventory transactions, database migrations, tests, and production hardening still need implementation before real business use.
