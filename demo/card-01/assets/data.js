/* Card 01 — all invitation content lives here. Edit this file only to make a new couple's card. */
window.WEDDING = {
  couple: {
    first: "Amaya",          // demo name
    second: "Kavin",         // demo name
    monogram: "A & K"
  },
  hosts: "Together with their families",
  request: "joyfully invite you to celebrate their wedding",

  // ISO date + 24h times, Sri Lanka time (+05:30)
  date: "2027-02-20",
  start: "09:00",
  end: "15:30",

  venue: {
    name: "The Lakehouse Garden",               // demo venue
    address: "Lake Road, Colombo, Sri Lanka",   // demo address
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Colombo+Sri+Lanka"
  },

  // WAITING ON CLIENT: the couple's own pre-shoot photo and venue photos.
  // These are free stock placeholders (Pexels licence). An invitation goes out before the
  // wedding, so never use wedding-day photos here: venue first, then the pre-shoot.
  photos: {
    hero: "https://images.pexels.com/photos/30619805/pexels-photo-30619805.jpeg?auto=compress&cs=tinysrgb&w=1920",
    heroPosition: "50% 50%",        // which part of the hero photo stays in view on a phone
    portrait: "https://images.pexels.com/photos/10099992/pexels-photo-10099992.jpeg?auto=compress&cs=tinysrgb&w=1200",
    portraitSize: "cover",          // zoom of the round portrait
    portraitPosition: "50% 22%",    // which part of the photo sits inside the ring
    venue: "https://images.pexels.com/photos/30562607/pexels-photo-30562607/free-photo-of-outdoor-evening-event-with-elegant-decor-under-string-lights.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },

  // icon: toast | rings | sign | dine | cake | car
  schedule: [
    { time: "9:00 AM",  title: "Guests Arrive",     note: "Welcome drinks in the garden",   icon: "toast" },
    { time: "9:42 AM",  title: "Poruwa Ceremony",   note: "At the auspicious time",         icon: "rings" },
    { time: "10:30 AM", title: "Registration",      note: "Signing and family photographs", icon: "sign" },
    { time: "12:30 PM", title: "Wedding Lunch",     note: "Buffet lunch is served",         icon: "dine" },
    { time: "2:00 PM",  title: "Cake & Toast",      note: "Raise a glass with us",          icon: "cake" },
    { time: "3:30 PM",  title: "Going Away",        note: "Send-off for the couple",        icon: "car" }
  ],

  dressCode: "Formal · soft pastels welcome",

  rsvp: {
    by: "20 January 2027",
    whatsapp: "94700000000"   // WAITING ON CLIENT: couple's WhatsApp number, digits only with country code
  },

  closing: "We can't wait to celebrate with you"
};
