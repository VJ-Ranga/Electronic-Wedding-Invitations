/* Card 02 — "Ivory Peony". Edit this file only to make a new couple's card. */
window.WEDDING = {
  couple: {
    first: "Nethmi",         // demo name
    second: "Dilan",         // demo name
    monogram: "N & D"
  },
  and: "and",
  hosts: "Together with their families",
  request: "invite you to celebrate their marriage",
  note: "Reception to follow",

  // ISO date + 24h times, Sri Lanka time (+05:30)
  date: "2027-03-27",
  start: "15:00",
  end: "22:00",

  venue: {
    name: "The Orchid Pavilion",                // demo venue
    address: "Kandy Road, Kandy",               // demo address
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kandy+Sri+Lanka"
  },

  // WAITING ON CLIENT: the couple's own pre-shoot photos. Free stock placeholders (Pexels licence).
  // Never wedding-day photos: the invitation goes out before the wedding.
  photoStyle: "polaroid",   // polaroid (first 2 photos) | film (3 photos)
  photos: [
    { src: "https://images.pexels.com/photos/21319667/pexels-photo-21319667.jpeg?auto=compress&cs=tinysrgb&w=700", alt: "The couple on a hilltop, from their pre-wedding shoot", position: "50% 70%" },
    { src: "https://images.pexels.com/photos/7695777/pexels-photo-7695777.jpeg?auto=compress&cs=tinysrgb&w=700", alt: "Their hands together, showing the engagement ring", position: "45% 60%" }
  ],

  // flowers: [type, x%, y%, width%, rotation] inside each zone
  // types: peony | rose | anemone | bud | sprig-beige | sprig-sage | sprig-teal | leaf-beige | lineflower | linesprig | goldbuds
  flora: {
    stage: [
      ["sprig-beige", 97, -6, 30, 35], ["lineflower", 101, 34, 24, 10], ["peony", 90, 8, 34, 15],
      ["sprig-beige", 0, 78, 28, -70], ["linesprig", 22, 106, 22, 100], ["peony", 8, 92, 36, -20]
    ],
    a: [
      ["sprig-beige", 86, 31, 26, 50], ["lineflower", 60, 27, 38, 0], ["peony", 20, 29, 34, -10], ["bud", 44, 24, 16, 30],
      ["linesprig", 10, 40, 22, -25],
      ["sprig-beige", 2, 60, 28, -30], ["lineflower", 3, 74, 24, 20], ["peony", 5, 66, 30, 12],
      ["leaf-beige", 103, 82, 20, 30], ["lineflower", 100, 72, 22, 0], ["peony", 95, 93, 40, -15]
    ],
    b: [
      ["lineflower", 98, 20, 34, 15], ["linesprig", 104, 44, 24, 150],
      ["bud", 3, 62, 22, -30], ["linesprig", 2, 74, 22, -160],
      ["lineflower", 74, 104, 20, 0], ["peony", 62, 94, 28, 25]
    ]
  },

  // icon: toast | rings | sign | dine | cake | car
  schedule: [
    { time: "3:00 PM", title: "Guests Arrive",   note: "Welcome drinks on the lawn",     icon: "toast" },
    { time: "3:48 PM", title: "Poruwa Ceremony", note: "At the auspicious time",         icon: "rings" },
    { time: "4:30 PM", title: "Registration",    note: "Signing and family photographs", icon: "sign" },
    { time: "7:00 PM", title: "Wedding Dinner",  note: "Dinner is served",               icon: "dine" },
    { time: "8:30 PM", title: "Cake & Toast",    note: "Raise a glass with us",          icon: "cake" },
    { time: "10:00 PM", title: "Going Away",     note: "Send-off for the couple",        icon: "car" }
  ],

  dressCode: "Formal · ivory and earth tones welcome",

  rsvp: {
    by: "27 February 2027",
    whatsapp: "94700000000"   // WAITING ON CLIENT: couple's WhatsApp number, digits only with country code
  },

  closing: "We can't wait to celebrate with you"
};
