import { createServerFn } from '@tanstack/react-start'

export type Offert = {
  namn: string
  epost: string
  telefon?: string
  arrangemang?: string
  datum?: string
  gaster?: string
  meddelande?: string
}

export type OffertResult = { status: 'sent' } | { status: 'not-configured' } | { status: 'error'; message: string }

const labels: Record<keyof Offert, string> = {
  namn: 'Namn',
  epost: 'E-post',
  telefon: 'Telefon',
  arrangemang: 'Typ av arrangemang',
  datum: 'Datum',
  gaster: 'Antal gäster',
  meddelande: 'Meddelande',
}

const text = (value: unknown, max = 2000) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

function parseOffert(input: unknown): Offert {
  const data = (input ?? {}) as Record<string, unknown>
  const offert: Offert = {
    namn: text(data.namn, 120),
    epost: text(data.epost, 200),
    telefon: text(data.telefon, 40),
    arrangemang: text(data.arrangemang, 60),
    datum: text(data.datum, 20),
    gaster: text(data.gaster, 10),
    meddelande: text(data.meddelande, 4000),
  }
  if (!offert.namn) throw new Error('Fyll i ditt namn.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(offert.epost)) throw new Error('Fyll i en giltig e-postadress.')
  return offert
}

/** Sammanfattning som text – används både i mejlet och i reservlösningen med mailto. */
export function offertToText(offert: Offert) {
  return (Object.keys(labels) as (keyof Offert)[])
    .filter((key) => offert[key])
    .map((key) => `${labels[key]}: ${offert[key]}`)
    .join('\n')
}

export function offertSubject(offert: Pick<Offert, 'arrangemang'>) {
  return `Offertförfrågan${offert.arrangemang ? ` – ${offert.arrangemang}` : ''}`
}

/**
 * Skickar offertförfrågan som e-post via Resend (https://resend.com).
 * Kräver miljövariablerna RESEND_API_KEY och OFFERT_FROM (en verifierad avsändare).
 * Utan dem svarar funktionen `not-configured` och formuläret öppnar besökarens e-postprogram i stället.
 */
export const sendOffert = createServerFn({ method: 'POST' })
  .validator(parseOffert)
  .handler(async ({ data }): Promise<OffertResult> => {
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.OFFERT_FROM
    const to = process.env.OFFERT_TO ?? 'fredrik.ostrom@live.se'
    if (!apiKey || !from) return { status: 'not-configured' }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.epost,
        subject: offertSubject(data),
        text: `${offertToText(data)}\n\n— Skickat från offertformuläret på freddesmat.se`,
      }),
    })

    if (!response.ok) {
      console.error('Resend svarade', response.status, await response.text())
      return { status: 'error', message: 'Förfrågan kunde inte skickas just nu.' }
    }
    return { status: 'sent' }
  })
