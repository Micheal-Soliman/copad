# COPAD CMS setup

1. Run `migrations/001_cms.sql` in the Supabase SQL editor.
2. Add these server environment variables to the deployment:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DASHBOARD_PASSWORD`
   - `DASHBOARD_SESSION_SECRET` (a long random value)

The service-role key is used only by server modules and is never exposed to browser code. RLS is enabled and forced on all CMS tables; public forms write through authenticated server actions.

Dashboard areas:

- `/dashboard/contact`: contact submissions and status updates.
- `/dashboard/careers`: vacancy publishing/editing plus submitted applications.
- `/dashboard/insights`: bilingual news and article publishing with compressed Base64 cover images.
