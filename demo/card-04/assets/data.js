/* Card 04 — "Blush Birthday". Edit this file only to make a new card. */
window.WEDDING = {
  // the two big lines on the card: a name, then the age
  couple: {
    first: "Shenali",        // demo name
    second: "30",
    monogram: "Shenali · 30"
  },
  and: "is turning",
  hosts: "Please join us to celebrate",
  request: "an evening of dinner, cake and dancing",
  note: "Dinner and cake to follow",

  seal: "30",                                        // text on the wax seal
  pageTitle: "Shenali's 30th Birthday — You're Invited",
  calendarTitle: "Shenali's 30th Birthday",
  eventName: "Shenali's 30th birthday",              // used in the WhatsApp reply
  declineWish: "Wishing you a wonderful birthday.",

  // ISO date + 24h times, Sri Lanka time (+05:30)
  date: "2026-11-28",
  start: "19:00",
  end: "23:30",

  venue: {
    name: "The Garden Room",                    // demo venue
    address: "Flower Road, Colombo",            // demo address
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Colombo+Sri+Lanka"
  },

  // WAITING ON CLIENT: their own photos. Free stock placeholders (Pexels licence).
  photoStyle: "polaroid",   // polaroid (first 2 photos) | film (3 photos)
  photos: [
    { src: "https://images.pexels.com/photos/7951453/pexels-photo-7951453.jpeg?auto=compress&cs=tinysrgb&w=700", alt: "Portrait of the birthday host", position: "50% 20%" },
    { src: "https://images.pexels.com/photos/19310821/pexels-photo-19310821.jpeg?auto=compress&cs=tinysrgb&w=700", alt: "A birthday cake with sparklers", position: "50% 45%" }
  ],

  // decorations: [type, x%, y%, width%, rotation] inside each zone
  // types: balloon-gold|champagne|cream|blush|plum|violet|pink|black · sparkle · confetti-blush|party · streamer · discoball · plus all flower types
  flora: {
    stage: [
      ["confetti-blush", 12, 98, 42, 0], ["balloon-cream", 80, -14, 22, -6], ["balloon-blush", 104, 12, 26, 16], ["balloon-gold", 92, -6, 30, 8],
      ["sparkle", 5, 6, 16, 0], ["balloon-plum", 3, 84, 26, -12]
    ],
    a: [
      ["confetti-blush", 102, 22, 30, 0], ["balloon-cream", -1, 24, 26, -16], ["balloon-gold", 21, 2, 30, 6], ["balloon-blush", 7, 9, 34, -10],
      ["sparkle", 93, 7, 18, 0], ["confetti-blush", -3, 72, 30, 40],
      ["balloon-gold", 93, 93, 26, -6], ["balloon-plum", 101, 79, 30, 12], ["sparkle", 3, 93, 16, 0]
    ],
    b: [
      ["sparkle", 97, 9, 18, 0], ["confetti-blush", -3, 44, 28, 0], ["streamer", 99, 47, 34, 20],
      ["balloon-blush", 1, 70, 26, -10], ["sparkle", 72, 103, 14, 0]
    ]
  },

  // icon: toast | rings | sign | dine | cake | car | music | gift
  schedule: [
    { time: "7:00 PM",  title: "Guests Arrive",    note: "Welcome drinks in the garden", icon: "toast" },
    { time: "8:00 PM",  title: "Dinner",           note: "Dinner is served",             icon: "dine" },
    { time: "8:45 PM",  title: "Wishes & Gifts",   note: "A few words from friends",     icon: "gift" },
    { time: "9:00 PM",  title: "Cake & Candles",   note: "Make a wish",                  icon: "cake" },
    { time: "9:30 PM",  title: "Music & Dancing",  note: "The floor is open",            icon: "music" },
    { time: "11:30 PM", title: "Goodnight",        note: "Safe travels home",            icon: "car" }
  ],

  dressCode: "Smart · blush and gold welcome",

  rsvp: {
    by: "14 November 2026",
    whatsapp: "94700000000"   // WAITING ON CLIENT: host's WhatsApp number, digits only with country code
  },

  closing: "It won't be a party without you"
};
