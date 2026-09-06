import { BriefcaseIcon, EnvelopeSimpleIcon, GlobeIcon, HouseIcon, NewspaperIcon, SignOutIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { requireDashboardSession } from "@/lib/dashboard-auth";
import { logoutAction } from "../actions";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: HouseIcon },
  { href: "/dashboard/contact", label: "Contact Messages", icon: EnvelopeSimpleIcon },
  { href: "/dashboard/careers", label: "Careers", icon: BriefcaseIcon },
  { href: "/dashboard/insights", label: "Insights", icon: NewspaperIcon },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireDashboardSession();
  return <div className="min-h-screen bg-white text-copad-deep lg:grid lg:grid-cols-[15.5rem_1fr]">
    <aside className="border-b border-white/10 bg-copad-deep px-5 py-5 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:p-6">
      <Brand locale="en" inverted />
      <nav className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-12 lg:flex-col" aria-label="Dashboard navigation">
        {navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-4 text-sm font-bold text-white/72 transition hover:bg-white/8 hover:text-white"><Icon size={19} />{label}</Link>)}
      </nav>
      <div className="mt-4 flex gap-2 lg:mt-auto lg:flex-col">
        <Link href="/en" className="flex min-h-11 items-center gap-3 rounded-xl px-4 text-sm font-bold text-white/72 transition hover:bg-white/8 hover:text-white"><GlobeIcon size={19} />View Website</Link>
        <form action={logoutAction}><button className="flex min-h-11 w-full items-center gap-3 rounded-xl px-4 text-sm font-bold text-white/72 transition hover:bg-white/8 hover:text-white"><SignOutIcon size={19} />Sign Out</button></form>
      </div>
    </aside>
    <main className="min-w-0 p-5 sm:p-8 lg:p-10 xl:p-12">{children}</main>
  </div>;
}
