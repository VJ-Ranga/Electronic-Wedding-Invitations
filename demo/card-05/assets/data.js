/* Card 05 — "Midnight Cocktail". Edit this file only to make a new card. */
window.WEDDING = {
  // the two big lines on the card
  couple: {
    first: "Cocktails",
    second: "Dancing",
    monogram: "R & T"
  },
  and: "&",
  hosts: "You are invited to an evening of",
  request: "Hosted by Rashmi & Tharindu",       // demo names
  note: "Dress to sparkle",

  seal: "RT",                                        // text on the wax seal
  pageTitle: "Cocktails & Dancing — You're Invited",
  calendarTitle: "Cocktails & Dancing",
  eventName: "your Cocktails & Dancing evening",     // used in the WhatsApp reply
  declineWish: "Have a wonderful night.",

  // ISO date + 24h times, Sri Lanka time (+05:30)
  date: "2026-12-19",
  start: "20:00",
  end: "23:59",

  venue: {
    name: "The Rooftop Lounge",                 // demo venue
    address: "Marine Drive, Colombo",           // demo address
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Colombo+Sri+Lanka"
  },

  // WAITING ON CLIENT: their own photos. Free stock placeholders (Pexels licence).
  photoStyle: "film",       // polaroid (first 2 photos) | film (3 photos)
  photos: [
    { src: "https://images.pexels.com/photos/6174132/pexels-photo-6174132.jpeg?auto=compress&cs=tinysrgb&w=500", alt: "Friends raising their glasses", position: "50% 50%" },
    { src: "https://images.pexels.com/photos/15326834/pexels-photo-15326834.jpeg?auto=compress&cs=tinysrgb&w=500", alt: "Cocktails held up in a toast", position: "50% 40%" },
    { src: "https://images.pexels.com/photos/3402697/pexels-photo-3402697.jpeg?auto=compress&cs=tinysrgb&w=500", alt: "Champagne coupes at a party", position: "50% 45%" }
  ],

  // decorations: [type, x%, y%, width%, rotation] inside each zone
  // types: balloon-gold|champagne|cream|blush|plum|violet|pink|black · sparkle · confetti-blush|party · streamer · discoball · plus all flower types
  flora: {
    stage: [
      ["confetti-party", 8, 98, 44, 0], ["discoball", 95, -10, 34, 0], ["sparkle", 4, 4, 18, 0],
      ["balloon-violet", 2, 80, 24, -10], ["balloon-gold", 102, 86, 22, 8]
    ],
    a: [
      ["confetti-party", 103, 30, 30, 0], ["discoball", 10, 6, 36, 0], ["sparkle", 94, 6, 20, 0],
      ["balloon-violet", -2, 56, 28, -12], ["balloon-gold", 6, 73, 26, 6],
      ["confetti-party", 8, 96, 40, 30], ["balloon-pink", 102, 82, 28, 10], ["sparkle", 98, 60, 14, 0]
    ],
    b: [
      ["sparkle", 2, 4, 16, 0], ["streamer", 100, 8, 34, 10], ["confetti-party", 4, 96, 36, 0], ["balloon-black", 103, 62, 24, 8]
    ]
  },

  // icon: toast | rings | sign | dine | cake | car | music | gift
  schedule: [
    { time: "8:00 PM",  title: "Doors Open",        note: "Welcome cocktail on arrival", icon: "toast" },
    { time: "8:30 PM",  title: "Canapés",           note: "Small plates all evening",    icon: "dine" },
    { time: "9:30 PM",  title: "Dance Floor Opens", note: "DJ until late",               icon: "music" },
    { time: "11:00 PM", title: "Dessert Bar",       note: "Something sweet",             icon: "cake" },
    { time: "12:00 AM", title: "Midnight Toast",    note: "Glasses up",                  icon: "toast" },
    { time: "1:00 AM",  title: "Carriages",         note: "Safe travels home",           icon: "car" }
  ],

  dressCode: "Cocktail attire · black, gold and sparkle",

  rsvp: {
    by: "5 December 2026",
    whatsapp: "94700000000"   // WAITING ON CLIENT: host's WhatsApp number, digits only with country code
  },

  closing: "See you on the dance floor"
};
