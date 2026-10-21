import { useState, useTransition, type FormEvent } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { offertSubject, offertToText, sendOffert, type Offert } from '~/server/offert'
import { site } from '~/data/site'

type State = { tone: 'idle' | 'ok' | 'error'; message: string }

const field =
  'min-h-13 w-full appearance-none rounded-[10px] border-[1.5px] border-[#dcdcd6] bg-paper px-4 py-3 text-base transition-colors focus:border-ink focus:bg-white focus:outline-none user-invalid:border-red'
const label = 'text-xs font-semibold tracking-[0.14em] uppercase'

const occasions = ['Bröllop', 'Dop', 'Firmafest', 'Konferens eller möte', 'Privat fest', 'Julmat', 'Annat']

export function OffertForm() {
  const send = useServerFn(sendOffert)

  const [state, setState] = useState<State>({ tone: 'idle', message: '' })
  const [pending, startTransition] = useTransition()

  async function submit(formData: FormData): Promise<State & { reset?: boolean }> {
    if (formData.get('webbplats')) return { tone: 'idle', message: '' } // honungsfälla mot spam

    const offert = Object.fromEntries(
      [...formData.entries()].filter(([key]) => key !== 'webbplats').map(([k, v]) => [k, String(v)]),
    ) as Offert

    try {
      const result = await send({ data: offert })
      if (result.status === 'sent') {
        return { tone: 'ok', message: 'Tack! Din förfrågan är skickad. Vi återkommer så snart vi kan.', reset: true }
      }
      if (result.status === 'not-configured') {
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(offertSubject(offert))}&body=${encodeURIComponent(offertToText(offert))}`
        return {
          tone: 'ok',
          message: 'Ditt e-postprogram öppnas med förfrågan ifylld – tryck på skicka där. Fungerar det inte? Mejla eller ring oss direkt.',
        }
      }
      return { tone: 'error', message: `${result.message} Ring oss gärna på ${site.phones[0].label}.` }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Något gick fel.'
      return { tone: 'error', message: `${message} Du kan också ringa oss på ${site.phones[0].label}.` }
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    startTransition(async () => {
      const { reset, ...next } = await submit(new FormData(form))
      setState(next)
      if (reset) form.reset()
    })
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-x-4 gap-y-4.5 sm:grid-cols-2">
      <div className="grid gap-2">
        <label htmlFor="f-namn" className={label}>
          Namn <span className="text-red">*</span>
        </label>
        <input id="f-namn" name="namn" type="text" autoComplete="name" required className={field} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="f-telefon" className={label}>
          Telefon
        </label>
        <input id="f-telefon" name="telefon" type="tel" autoComplete="tel" className={field} />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <label htmlFor="f-epost" className={label}>
          E-post <span className="text-red">*</span>
        </label>
        <input id="f-epost" name="epost" type="email" autoComplete="email" required className={field} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="f-typ" className={label}>
          Typ av arrangemang
        </label>
        <select
          id="f-typ"
          name="arrangemang"
          defaultValue=""
          className={`${field} bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='12'%20height='8'%3E%3Cpath%20d='M1%201.5l5%205%205-5'%20fill='none'%20stroke='%23171717'%20stroke-width='1.6'/%3E%3C/svg%3E")] bg-[position:right_16px_center] bg-no-repeat pr-10`}
        >
          <option value="">Välj…</option>
          {occasions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="f-datum" className={label}>
          Datum
        </label>
        <input id="f-datum" name="datum" type="date" className={field} />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <label htmlFor="f-gaster" className={label}>
          Antal gäster
        </label>
        <input id="f-gaster" name="gaster" type="number" min={1} inputMode="numeric" className={field} />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <label htmlFor="f-meddelande" className={label}>
          Meddelande
        </label>
        <textarea
          id="f-meddelande"
          name="meddelande"
          placeholder="Vad planerar ni? Önskemål om meny, allergier, porslin, leverans…"
          className={`${field} field-sizing-content min-h-36 resize-y`}
        />
      </div>
      <div className="sr-only" aria-hidden>
        <label htmlFor="f-webbplats">Lämna tomt</label>
        <input id="f-webbplats" name="webbplats" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-1.5 flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <small className="max-w-[28em] text-[13.5px] leading-normal text-muted">
          Fält markerade med <span className="text-red">*</span> är obligatoriska. Du kan också ringa oss på {site.phones[0].label}.
        </small>
        <button type="submit" disabled={pending} className="btn btn-red disabled:cursor-wait disabled:opacity-70">
          {pending ? 'Skickar…' : 'Skicka förfrågan'} <span aria-hidden>→</span>
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`rounded-[10px] px-4.5 py-4 text-[15px] empty:hidden sm:col-span-2 ${state.tone === 'error' ? 'bg-[#fdecec] text-[#7d0a10]' : 'bg-[#eef6ea] text-[#23461a]'}`}
      >
        {state.message}
      </p>
    </form>
  )
}
