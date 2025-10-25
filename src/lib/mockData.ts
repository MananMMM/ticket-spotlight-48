// Mock data based on the MySQL schema provided
import concertSymphonyImg from "@/assets/concert-symphony.jpg";
import theaterRomeoImg from "@/assets/theater-romeo.jpg";
import cinemaDuneImg from "@/assets/cinema-dune.jpg";
import concertJazzImg from "@/assets/concert-jazz.jpg";
import theaterHamiltonImg from "@/assets/theater-hamilton.jpg";
import cinemaInceptionImg from "@/assets/cinema-inception.jpg";
import concertRockImg from "@/assets/concert-rock.jpg";
import theaterPhantomImg from "@/assets/theater-phantom.jpg";

export interface User {
  user_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  password_hash: string;
  created_at: string;
}

export interface Event {
  event_id: number;
  title: string;
  description: string;
  event_category: 'cinema' | 'theater' | 'concert';
  location: string;
  event_date: string;
  event_time: string;
  image_url: string;
  ticket_price: number;
  available_seats: number;
  created_at: string;
}

export interface Ticket {
  ticket_id: number;
  event_id: number;
  ticket_type: string;
  price: number;
  quantity_available: number;
}

export interface Booking {
  booking_id: number;
  user_id: number;
  event_id: number;
  ticket_id: number;
  quantity: number;
  total_price: number;
  booking_date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Payment {
  payment_id: number;
  booking_id: number;
  payment_method: 'credit_card' | 'debit_card' | 'paypal' | 'cash';
  payment_status: 'pending' | 'completed' | 'failed';
  payment_date: string;
}

export const mockEvents: Event[] = [
  {
    event_id: 1,
    title: "The Grand Symphony Orchestra",
    description: "Experience a magnificent evening of classical music performed by world-renowned musicians. Journey through centuries of musical masterpieces from Mozart to modern composers.",
    event_category: "concert",
    location: "Royal Concert Hall",
    event_date: "2025-11-15",
    event_time: "19:30:00",
    image_url: concertSymphonyImg,
    ticket_price: 75,
    available_seats: 350,
    created_at: "2025-10-01T10:00:00Z"
  },
  {
    event_id: 2,
    title: "Romeo and Juliet",
    description: "Shakespeare's timeless tragedy brought to life with stunning performances and modern staging. A story of love, family, and fate that transcends time.",
    event_category: "theater",
    location: "Metropolitan Theater",
    event_date: "2025-11-20",
    event_time: "20:00:00",
    image_url: theaterRomeoImg,
    ticket_price: 60,
    available_seats: 200,
    created_at: "2025-10-02T10:00:00Z"
  },
  {
    event_id: 3,
    title: "Dune: Part Three",
    description: "The epic sci-fi saga continues with breathtaking visuals and an immersive storyline. Experience the desert planet Arrakis like never before on the big screen.",
    event_category: "cinema",
    location: "IMAX Cinemas",
    event_date: "2025-11-18",
    event_time: "18:00:00",
    image_url: cinemaDuneImg,
    ticket_price: 25,
    available_seats: 180,
    created_at: "2025-10-03T10:00:00Z"
  },
  {
    event_id: 4,
    title: "Jazz Nights Live",
    description: "An intimate evening of smooth jazz featuring local and international artists. Enjoy cocktails and world-class music in a cozy atmosphere.",
    event_category: "concert",
    location: "Blue Note Jazz Club",
    event_date: "2025-11-22",
    event_time: "21:00:00",
    image_url: concertJazzImg,
    ticket_price: 45,
    available_seats: 120,
    created_at: "2025-10-04T10:00:00Z"
  },
  {
    event_id: 5,
    title: "Hamilton",
    description: "The revolutionary musical about America's founding father Alexander Hamilton. A hip-hop and jazz infused retelling of American history.",
    event_category: "theater",
    location: "Broadway Theater",
    event_date: "2025-11-25",
    event_time: "19:00:00",
    image_url: theaterHamiltonImg,
    ticket_price: 120,
    available_seats: 300,
    created_at: "2025-10-05T10:00:00Z"
  },
  {
    event_id: 6,
    title: "Inception Re-Release",
    description: "Christopher Nolan's mind-bending masterpiece returns to theaters. Experience the dream within a dream on the big screen once again.",
    event_category: "cinema",
    location: "Grand Cinema",
    event_date: "2025-11-28",
    event_time: "20:30:00",
    image_url: cinemaInceptionImg,
    ticket_price: 18,
    available_seats: 250,
    created_at: "2025-10-06T10:00:00Z"
  },
  {
    event_id: 7,
    title: "Rock Legends Festival",
    description: "A full day of rock music featuring tribute bands and emerging rock artists. Celebrate the golden age of rock and roll.",
    event_category: "concert",
    location: "City Arena",
    event_date: "2025-12-01",
    event_time: "14:00:00",
    image_url: concertRockImg,
    ticket_price: 85,
    available_seats: 500,
    created_at: "2025-10-07T10:00:00Z"
  },
  {
    event_id: 8,
    title: "The Phantom of the Opera",
    description: "Andrew Lloyd Webber's iconic musical about love, obsession, and mystery. A spectacular production with elaborate costumes and sets.",
    event_category: "theater",
    location: "Opera House",
    event_date: "2025-12-05",
    event_time: "19:30:00",
    image_url: theaterPhantomImg,
    ticket_price: 95,
    available_seats: 280,
    created_at: "2025-10-08T10:00:00Z"
  }
];

export const mockTickets: Ticket[] = [
  { ticket_id: 1, event_id: 1, ticket_type: "VIP", price: 150, quantity_available: 50 },
  { ticket_id: 2, event_id: 1, ticket_type: "Standard", price: 75, quantity_available: 300 },
  { ticket_id: 3, event_id: 2, ticket_type: "Premium", price: 90, quantity_available: 50 },
  { ticket_id: 4, event_id: 2, ticket_type: "Standard", price: 60, quantity_available: 150 },
  { ticket_id: 5, event_id: 3, ticket_type: "IMAX", price: 25, quantity_available: 180 },
  { ticket_id: 6, event_id: 4, ticket_type: "Table Seating", price: 65, quantity_available: 40 },
  { ticket_id: 7, event_id: 4, ticket_type: "Standing", price: 45, quantity_available: 80 },
  { ticket_id: 8, event_id: 5, ticket_type: "Orchestra", price: 150, quantity_available: 100 },
  { ticket_id: 9, event_id: 5, ticket_type: "Balcony", price: 120, quantity_available: 200 },
];

// Mock user - stored in localStorage
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

// Mock bookings
export const getBookings = (): Booking[] => {
  const bookingsStr = localStorage.getItem('bookings');
  return bookingsStr ? JSON.parse(bookingsStr) : [];
};

export const addBooking = (booking: Omit<Booking, 'booking_id' | 'booking_date'>) => {
  const bookings = getBookings();
  const newBooking: Booking = {
    ...booking,
    booking_id: Date.now(),
    booking_date: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return newBooking;
};

export const updateBookingStatus = (bookingId: number, status: Booking['status']) => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(b => 
    b.booking_id === bookingId ? { ...b, status } : b
  );
  localStorage.setItem('bookings', JSON.stringify(updatedBookings));
};

// Mock payments
export const getPayments = (): Payment[] => {
  const paymentsStr = localStorage.getItem('payments');
  return paymentsStr ? JSON.parse(paymentsStr) : [];
};

export const addPayment = (payment: Omit<Payment, 'payment_id' | 'payment_date'>) => {
  const payments = getPayments();
  const newPayment: Payment = {
    ...payment,
    payment_id: Date.now(),
    payment_date: new Date().toISOString(),
  };
  payments.push(newPayment);
  localStorage.setItem('payments', JSON.stringify(newPayment));
  return newPayment;
};
