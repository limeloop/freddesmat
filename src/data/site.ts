/** Kontaktuppgifter och fakta – hämtade från nuvarande freddesmat.se och Facebook-sidan. */
export const site = {
  name: 'Freddes Mat',
  url: 'https://www.freddesmat.se',
  phones: [
    { label: '0611-201 22', href: 'tel:+4661120122' },
    { label: '070-328 02 06', href: 'tel:+46703280206' },
  ],
  email: 'fredrik.ostrom@live.se',
  place: 'Kafé 9:an, Kusthöjden',
  street: 'Sälstensgränd 133',
  postalCode: '871 30',
  city: 'Härnösand',
  facebook: 'https://www.facebook.com/freddesmat.se',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Freddes+Mat+S%C3%A4lstensgr%C3%A4nd+133+H%C3%A4rn%C3%B6sand',
  hours: {
    lunch: 'Mån–fre 10.30–13.00',
    lunchLong: 'Måndag–fredag 10.30–13.00',
    other: 'Övrig tid är det öppet för beställning.',
  },
} as const

export const nav = [
  { to: '/', hash: 'lunch', label: 'Lunch' },
  { to: '/catering', label: 'Catering' },
  { to: '/om-oss', label: 'Om oss' },
  { to: '/kontakt', label: 'Kontakt' },
] as const
