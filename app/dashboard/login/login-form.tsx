"use client";

import { LockKeyIcon } from "@phosphor-icons/react";
import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);
  return <form action={action} className="mt-8 grid gap-5">
    <label className="text-xs font-black text-copad-deep/65">Dashboard password
      <span className="mt-2 flex items-center gap-3 rounded-2xl border border-copad-deep/12 bg-white px-4 focus-within:border-copad-green focus-within:ring-4 focus-within:ring-copad-green/10">
        <LockKeyIcon size={18} className="text-copad-green" />
        <input name="password" type="password" autoComplete="current-password" required className="min-h-13 w-full bg-transparent text-base text-copad-deep outline-none" />
      </span>
    </label>
    {state.error ? <p role="alert" className="rounded-xl border border-copad-red/20 bg-copad-red/5 px-4 py-3 text-sm text-copad-red">{state.error}</p> : null}
    <button disabled={pending} className="min-h-13 rounded-full bg-copad-green px-7 text-sm font-black text-white transition hover:bg-copad-deep disabled:opacity-55">{pending ? "Signing in…" : "Sign in"}</button>
  </form>;
}

