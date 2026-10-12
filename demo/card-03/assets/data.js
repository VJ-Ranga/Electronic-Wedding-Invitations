/* Card 03 — "Dusty Blue". Edit this file only to make a new couple's card. */
window.WEDDING = {
  couple: {
    first: "Kavya",          // demo name
    second: "Nuwan",         // demo name
    monogram: "K & N"
  },
  and: "and",
  hosts: "together with their families",
  request: "invite you to join them in celebrating their marriage",
  note: "Dinner and dancing to follow",

  // ISO date + 24h times, Sri Lanka time (+05:30)
  date: "2027-04-24",
  start: "16:00",
  end: "22:30",

  venue: {
    name: "Seaside Chapel",                     // demo venue
    address: "Beach Road, Galle",               // demo address
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Galle+Sri+Lanka"
  },

  // WAITING ON CLIENT: the couple's own pre-shoot photos. Free stock placeholders (Pexels licence).
  // Never wedding-day photos: the invitation goes out before the wedding.
  photoStyle: "film",       // polaroid (first 2 photos) | film (3 photos)
  photos: [
    { src: "https://images.pexels.com/photos/27845836/pexels-photo-27845836.jpeg?auto=compress&cs=tinysrgb&w=500", alt: "The couple on the beach at sunset, from their pre-wedding shoot", position: "50% 45%" },
    { src: "https://images.pexels.com/photos/10099992/pexels-photo-10099992.jpeg?auto=compress&cs=tinysrgb&w=500", alt: "The couple walking under a tree", position: "50% 35%" },
    { src: "https://images.pexels.com/photos/13876172/pexels-photo-13876172.jpeg?auto=compress&cs=tinysrgb&w=500", alt: "The couple by the water", position: "50% 30%" }
  ],

  // flowers: [type, x%, y%, width%, rotation] inside each zone
  // types: peony | rose | anemone | bud | sprig-beige | sprig-sage | sprig-teal | leaf-beige | lineflower | linesprig | goldbuds
  flora: {
    stage: [
      ["sprig-teal", 99, 24, 26, 150], ["rose", 80, -2, 22, 0], ["anemone", 93, 8, 32, 20],
      ["sprig-sage", 16, 106, 26, -150], ["rose", 2, 72, 22, 0], ["anemone", 9, 90, 34, -15]
    ],
    a: [
      ["goldbuds", 24, 3, 26, 12], ["sprig-teal", 9, 7, 34, -12], ["rose", 16, 14, 22, 0],
      ["sprig-sage", 7, 40, 30, -18], ["bud", 12, 30, 20, -10], ["bud", 16, 52, 18, 20],
      ["sprig-sage", 3, 95, 28, -140], ["linesprig", 2, 64, 22, -30], ["anemone", 5, 75, 38, -10], ["rose", 13, 91, 30, 10]
    ],
    b: [
      ["sprig-teal", 101, 14, 22, 30], ["rose", 101, 1, 20, 0],
      ["sprig-sage", 103, 62, 26, 150], ["anemone", 100, 42, 30, 20]
    ]
  },

  // icon: toast | rings | sign | dine | cake | car
  schedule: [
    { time: "4:00 PM", title: "Guests Arrive",  note: "Welcome drinks by the sea",      icon: "toast" },
    { time: "4:30 PM", title: "Ceremony",       note: "Vows and rings",                 icon: "rings" },
    { time: "5:15 PM", title: "Registration",   note: "Signing and family photographs", icon: "sign" },
    { time: "7:00 PM", title: "Wedding Dinner", note: "Dinner is served",               icon: "dine" },
    { time: "8:30 PM", title: "Cake & Toast",   note: "Raise a glass with us",          icon: "cake" },
    { time: "10:30 PM", title: "Going Away",    note: "Send-off for the couple",        icon: "car" }
  ],

  dressCode: "Formal · shades of blue welcome",

  rsvp: {
    by: "24 March 2027",
    whatsapp: "94700000000"   // WAITING ON CLIENT: couple's WhatsApp number, digits only with country code
  },

  closing: "We can't wait to celebrate with you"
};
