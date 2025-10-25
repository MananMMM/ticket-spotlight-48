import concertSymphony from "@/assets/concert-symphony.jpg";
import theaterRomeo from "@/assets/theater-romeo.jpg";
import cinemaDune from "@/assets/cinema-dune.jpg";
import concertJazz from "@/assets/concert-jazz.jpg";
import theaterHamilton from "@/assets/theater-hamilton.jpg";
import cinemaInception from "@/assets/cinema-inception.jpg";
import concertRock from "@/assets/concert-rock.jpg";
import theaterPhantom from "@/assets/theater-phantom.jpg";

export const mockEvents = [
  {
    event_id: 1,
    title: "Summer Symphony Night",
    description: "Experience a magical evening with our orchestra performing classical masterpieces under the stars.",
    event_category: "concert",
    location: "Central Concert Hall",
    event_date: "2025-11-15",
    event_time: "19:30:00",
    ticket_price: 75,
    available_seats: 150,
    image_url: concertSymphony,
    created_at: "2025-01-01T00:00:00.000Z"
  },
  {
    event_id: 2,
    title: "Romeo and Juliet",
    description: "A timeless tale of love and tragedy brought to life on stage by our talented theater company.",
    event_category: "theater",
    location: "Royal Theater",
    event_date: "2025-11-20",
    event_time: "20:00:00",
    ticket_price: 65,
    available_seats: 200,
    image_url: theaterRomeo,
    created_at: "2025-01-01T00:00:00.000Z"
  },
  {
    event_id: 3,
    title: "Dune: Part Two",
    description: "The epic saga continues in this stunning sci-fi masterpiece. Experience it on the big screen.",
    event_category: "cinema",
    location: "IMAX Cinema Downtown",
    event_date: "2025-11-10",
    event_time: "18:00:00",
    ticket_price: 25,
    available_seats: 300,
    image_url: cinemaDune,
    created_at: "2025-01-01T00:00:00.000Z"
  },
  {
    event_id: 4,
    title: "Jazz Night Live",
    description: "Smooth jazz and soulful melodies in an intimate setting. Featuring world-renowned artists.",
    event_category: "concert",
    location: "Blue Note Jazz Club",
    event_date: "2025-11-18",
    event_time: "21:00:00",
    ticket_price: 55,
    available_seats: 100,
    image_url: concertJazz,
    created_at: "2025-01-01T00:00:00.000Z"
  },
  {
    event_id: 5,
    title: "Hamilton",
    description: "The revolutionary Broadway musical that's changing theater history. Don't miss this spectacular show.",
    event_category: "theater",
    location: "Broadway Theater",
    event_date: "2025-11-25",
    event_time: "19:00:00",
    ticket_price: 120,
    available_seats: 180,
    image_url: theaterHamilton,
    created_at: "2025-01-01T00:00:00.000Z"
  },
  {
    event_id: 6,
    title: "Inception",
    description: "Christopher Nolan's mind-bending thriller returns to the big screen for a special anniversary showing.",
    event_category: "cinema",
    location: "Grand Cinema",
    event_date: "2025-11-12",
    event_time: "20:30:00",
    ticket_price: 20,
    available_seats: 250,
    image_url: cinemaInception,
    created_at: "2025-01-01T00:00:00.000Z"
  },
  {
    event_id: 7,
    title: "Rock Legends Festival",
    description: "The biggest rock festival of the year featuring top bands from around the world.",
    event_category: "concert",
    location: "Stadium Arena",
    event_date: "2025-11-30",
    event_time: "18:00:00",
    ticket_price: 95,
    available_seats: 500,
    image_url: concertRock,
    created_at: "2025-01-01T00:00:00.000Z"
  },
  {
    event_id: 8,
    title: "The Phantom of the Opera",
    description: "Andrew Lloyd Webber's iconic musical comes to life with stunning visuals and haunting melodies.",
    event_category: "theater",
    location: "Opera House",
    event_date: "2025-12-05",
    event_time: "19:30:00",
    ticket_price: 85,
    available_seats: 220,
    image_url: theaterPhantom,
    created_at: "2025-01-01T00:00:00.000Z"
  }
];

export const mockTickets = [
  { ticket_id: 1, event_id: 1, ticket_type: "VIP", price: 120, quantity_available: 50 },
  { ticket_id: 2, event_id: 1, ticket_type: "Standard", price: 75, quantity_available: 100 },
  { ticket_id: 3, event_id: 2, ticket_type: "Premium", price: 95, quantity_available: 80 },
  { ticket_id: 4, event_id: 2, ticket_type: "Standard", price: 65, quantity_available: 120 },
  { ticket_id: 5, event_id: 3, ticket_type: "Standard", price: 25, quantity_available: 300 },
  { ticket_id: 6, event_id: 4, ticket_type: "VIP", price: 85, quantity_available: 30 },
  { ticket_id: 7, event_id: 4, ticket_type: "Standard", price: 55, quantity_available: 70 },
  { ticket_id: 8, event_id: 5, ticket_type: "Premium", price: 150, quantity_available: 60 },
  { ticket_id: 9, event_id: 5, ticket_type: "Standard", price: 120, quantity_available: 120 },
  { ticket_id: 10, event_id: 6, ticket_type: "Standard", price: 20, quantity_available: 250 },
];

let currentUser = null;
let bookings = [];
let payments = [];

export const getCurrentUser = () => {
  if (!currentUser) {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      currentUser = JSON.parse(stored);
    }
  }
  return currentUser;
};

export const setCurrentUser = (user) => {
  currentUser = user;
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

export const getBookings = () => {
  const stored = localStorage.getItem('bookings');
  if (stored) {
    bookings = JSON.parse(stored);
  }
  return bookings;
};

export const addBooking = (booking) => {
  const newBooking = {
    ...booking,
    booking_id: Date.now(),
    booking_date: new Date().toISOString(),
    status: 'pending'
  };
  bookings.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return newBooking;
};

export const updateBookingStatus = (bookingId, status) => {
  bookings = bookings.map(b => 
    b.booking_id === bookingId ? { ...b, status } : b
  );
  localStorage.setItem('bookings', JSON.stringify(bookings));
};

export const getPayments = () => {
  const stored = localStorage.getItem('payments');
  if (stored) {
    payments = JSON.parse(stored);
  }
  return payments;
};

export const addPayment = (payment) => {
  const newPayment = {
    ...payment,
    payment_id: Date.now(),
    payment_date: new Date().toISOString(),
    amount: 0
  };
  payments.push(newPayment);
  localStorage.setItem('payments', JSON.stringify(payments));
  return newPayment;
};
