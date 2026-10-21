/**
 * VECKANS LUNCH – det här är den enda filen som behöver ändras varje vecka.
 *
 * 1. Ändra `week`.
 * 2. Ändra `date` (ÅÅÅÅ-MM-DD) och rätterna för varje dag.
 * 3. Spara och pusha – sajten byggs om automatiskt.
 *
 * Dagens rätter markeras automatiskt med ”Idag” och visas i heron på startsidan.
 */

export type LunchDay = {
  day: 'Måndag' | 'Tisdag' | 'Onsdag' | 'Torsdag' | 'Fredag'
  /** ÅÅÅÅ-MM-DD */
  date: string
  dishes: string[]
  extra?: { label: string; text: string }
}

export type LunchWeek = {
  week: number
  days: LunchDay[]
}

export const lunchWeek = {
  week: 43,
  days: [
    {
      day: 'Måndag',
      date: '2026-10-19',
      dishes: ['Stekt fisk med remouladsås & kokt potatis', 'Pasta m kyckling i currysås'],
    },
    {
      day: 'Tisdag',
      date: '2026-10-20',
      dishes: ['Stekt fläsk m löksås & kokt potatis', 'Wienerkorv m gurkmajo & potatismos'],
    },
    {
      day: 'Onsdag',
      date: '2026-10-21',
      dishes: ['Fiskgratäng m dillsås & kokt potatis', 'Chili con carne, serveras med ris'],
    },
    {
      day: 'Torsdag',
      date: '2026-10-22',
      dishes: [
        'Köttfärslimpa m brunsås, kokt potatis & lingonsylt',
        'Skånsk kalops, kokt potatis & skivade rödbetor',
      ],
    },
    {
      day: 'Fredag',
      date: '2026-10-23',
      dishes: ['Fläskschnitzel m choronsås & stekt potatis'],
      extra: { label: 'Dessert', text: 'Exotiskfruktsallad m vispgrädde' },
    },
  ],
} satisfies LunchWeek

/** Priser – bekräftade på Facebook-affischen ”Dagens lunchbuffé” 21/10 2026. */
export const lunchPrices = [
  { label: 'Lunch', price: 130 },
  { label: 'Pensionärer', price: 110 },
  { label: 'Avhämtning', price: 95 },
] as const

const longDate = new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', timeZone: 'UTC' })

/** ”19/10” */
export function formatShort(iso: string) {
  const [, month, day] = iso.split('-').map(Number)
  return `${day}/${month}`
}

/** ”Måndag 19 – fredag 23 oktober” */
export function weekRange(week: LunchWeek) {
  const first = week.days.at(0)
  const last = week.days.at(-1)
  if (!first || !last) return ''
  const start = longDate.formatToParts(new Date(`${first.date}T00:00:00Z`))
  const end = longDate.format(new Date(`${last.date}T00:00:00Z`))
  const startDay = start.find((p) => p.type === 'day')?.value ?? ''
  const startMonth = start.find((p) => p.type === 'month')?.value ?? ''
  const sameMonth = end.endsWith(startMonth)
  return `${first.day} ${sameMonth ? startDay : `${startDay} ${startMonth}`} – ${last.day.toLowerCase()} ${end}`
}
