"use client"

import { useState } from "react"

const SERVICES = ["Build something new", "Add AI to my product", "Improve an existing app", "Fix or scale something", "Just a chat"]
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

type Status = "idle" | "sending" | "sent" | "error"

/** Freelance enquiry form. Delivered by Web3Forms when NEXT_PUBLIC_WEB3FORMS_KEY is set, otherwise it opens an email draft. */
export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle")
  const [picked, setPicked] = useState<string[]>([])

  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]))

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    if (form.get("botcheck")) return
    const name = String(form.get("name") || "")
    const from = String(form.get("email") || "")
    const message = String(form.get("message") || "")
    const services = picked.join(", ") || "Not specified"

    if (!KEY) {
      const body = `Hi, I'm ${name} (${from}).\n\nAbout: ${services}\n\n${message}`
      location.href = `mailto:${email}?subject=${encodeURIComponent("Freelance project")}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus("sending")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: KEY,
          subject: `Freelance enquiry from ${name}`,
          from_name: "Portfolio contact form",
          name,
          email: from,
          services,
          message,
        }),
      })
      const data = await res.json()
      setStatus(data.success ? "sent" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="cform cform-done" role="status">
        <h3>Thanks, I got it.</h3>
        <p>I&apos;ll reply within 24 hours.</p>
      </div>
    )
  }

  return (
    <form className="cform" onSubmit={submit}>
      <div className="cform-row">
        <label>
          <span>Name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>

      <fieldset>
        <legend>What&apos;s this about?</legend>
        <div className="cform-chips">
          {SERVICES.map((s) => (
            <label key={s} className="chip" data-on={picked.includes(s) ? "" : undefined}>
              <input type="checkbox" checked={picked.includes(s)} onChange={() => toggle(s)} />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <label>
        <span>Message</span>
        <textarea name="message" rows={3} required />
      </label>

      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="cform-hp" />

      <div className="cform-foot">
        <button className="btn btn-solid" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <span className="cform-note" role="status">
          {status === "error" ? "Something went wrong. Please email me directly." : "I reply within 24 hours."}
        </span>
      </div>
    </form>
  )
}
