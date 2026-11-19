"use client"

import { useRef } from "react"
import { ContactForm } from "./contact-form"

/** A "Get in touch" button that opens the freelance form in a modal dialog. */
export function ContactDialog({ email }: { email: string }) {
  const dialog = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button className="btn btn-solid" type="button" onClick={() => dialog.current?.showModal()}>
        Get in touch
      </button>
      <dialog
        ref={dialog}
        className="modal"
        aria-labelledby="contact-title"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close()
        }}
      >
        <div className="modal-head">
          <h2 id="contact-title">Tell me about your project</h2>
          <button className="modal-x" type="button" aria-label="Close" onClick={() => dialog.current?.close()}>
            ×
          </button>
        </div>
        <ContactForm email={email} />
      </dialog>
    </>
  )
}
