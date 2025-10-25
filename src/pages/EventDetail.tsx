import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { mockEvents, mockTickets, getCurrentUser, addBooking } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Ticket, ArrowLeft, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();
  
  const event = mockEvents.find(e => e.event_id === Number(id));
  const tickets = mockTickets.filter(t => t.event_id === Number(id));
  
  const [selectedTicket, setSelectedTicket] = useState<number | null>(tickets[0]?.ticket_id || null);
  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-2xl font-bold">Event not found</h1>
          <Link to="/events">
            <Button className="mt-4">Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedTicketData = tickets.find(t => t.ticket_id === selectedTicket);
  const totalPrice = selectedTicketData ? selectedTicketData.price * quantity : 0;

  const handleBooking = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to book tickets",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (!selectedTicket) {
      toast({
        title: "Select a ticket",
        description: "Please select a ticket type",
        variant: "destructive"
      });
      return;
    }

    const booking = addBooking({
      user_id: user.user_id,
      event_id: event.event_id,
      ticket_id: selectedTicket,
      quantity,
      total_price: totalPrice,
      status: 'pending'
    });

    navigate(`/payment/${booking.booking_id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/events">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <img 
                src={event.image_url} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                {event.event_category.toUpperCase()}
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{new Date(event.event_date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{event.event_time}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Ticket className="h-5 w-5 text-primary" />
                  <span>{event.available_seats} seats available</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-3">About this event</h2>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 bg-card/80 backdrop-blur-sm border-border">
              <h2 className="text-2xl font-bold mb-4">Book Tickets</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Ticket Type</label>
                  <div className="space-y-2">
                    {tickets.map(ticket => (
                      <button
                        key={ticket.ticket_id}
                        onClick={() => setSelectedTicket(ticket.ticket_id)}
                        className={`w-full p-3 rounded-lg border text-left transition-all ${
                          selectedTicket === ticket.ticket_id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold">{ticket.ticket_type}</div>
                            <div className="text-sm text-muted-foreground">
                              {ticket.quantity_available} available
                            </div>
                          </div>
                          <div className="text-lg font-bold text-accent">
                            ${ticket.price}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(selectedTicketData?.quantity_available || 1, quantity + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Total Price</span>
                    <span className="text-3xl font-bold text-accent">${totalPrice}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-accent hover:opacity-90"
                    size="lg"
                    onClick={handleBooking}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
