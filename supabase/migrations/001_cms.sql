create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  category text not null,
  message text not null,
  locale text not null check (locale in ('en', 'ar')),
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.career_applications (
  id bigint generated always as identity primary key,
  vacancy_id text not null,
  vacancy_title text not null,
  name text not null,
  email text not null,
  phone text not null,
  experience integer not null check (experience >= 0),
  message text,
  cv_name text not null,
  cv_mime text not null,
  cv_base64 text not null,
  locale text not null check (locale in ('en', 'ar')),
  status text not null default 'new' check (status in ('new', 'reviewing', 'shortlisted', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.career_vacancies (
  id bigint generated always as identity primary key,
  slug text not null unique,
  status text not null default 'published' check (status in ('draft', 'published')),
  title_en text not null,
  title_ar text not null,
  department_en text not null,
  department_ar text not null,
  location_en text not null,
  location_ar text not null,
  employment_type_en text not null,
  employment_type_ar text not null,
  summary_en text not null,
  summary_ar text not null,
  responsibilities_en jsonb not null default '[]'::jsonb,
  responsibilities_ar jsonb not null default '[]'::jsonb,
  requirements_en jsonb not null default '[]'::jsonb,
  requirements_ar jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.insights (
  id bigint generated always as identity primary key,
  slug text not null unique,
  category text not null check (category in ('health-education', 'manufacturing', 'quality', 'company-news')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at date not null default current_date,
  reading_minutes integer not null default 4 check (reading_minutes between 1 and 60),
  cover_image_base64 text,
  title_en text not null,
  title_ar text not null,
  excerpt_en text not null,
  excerpt_ar text not null,
  body_en text not null,
  body_ar text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_messages_status_created_idx on public.contact_messages (status, created_at desc);
create index if not exists career_applications_status_created_idx on public.career_applications (status, created_at desc);
create index if not exists career_vacancies_status_order_idx on public.career_vacancies (status, sort_order, created_at desc);
create index if not exists insights_status_published_idx on public.insights (status, published_at desc);

alter table public.contact_messages enable row level security;
alter table public.contact_messages force row level security;
alter table public.career_applications enable row level security;
alter table public.career_applications force row level security;
alter table public.career_vacancies enable row level security;
alter table public.career_vacancies force row level security;
alter table public.insights enable row level security;
alter table public.insights force row level security;

comment on column public.insights.cover_image_base64 is 'Compressed insight cover image stored as a data URL by explicit project requirement.';
