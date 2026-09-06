# COPAD content system

Public page components should not own copy. Keep bilingual content in this directory and select it with `getDictionary(locale)` from `content/dictionary.ts`.

- `site.ts`: existing global navigation and page-section copy.
- `dictionary.ts`: shared interface, form, Contact, Careers, and Insights labels.
- `careers.ts`: bilingual vacancy records used by listings and vacancy pages.
- `partnerships.ts`: bilingual partnership category records.
- `insights.ts`: fallback Insights records used before Supabase is configured.
- `ui.ts`: compact bilingual labels shared by animated sections and page chrome.

Published Insights and Careers vacancies move to Supabase when the environment variables are present. Both English and Arabic versions are edited together from the dashboard. The local records remain a safe fallback for preview and first setup.
