import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockEvents, mockTickets, addBooking, getCurrentUser } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Clock, Ticket, ArrowLeft, Users } from "lucide-react";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();
  
  const [selectedTicket, setSelectedTicket] = useState("");
  const [quantity, setQuantity] = useState(1);

  const event = mockEvents.find(e => e.event_id === Number(id));
  const eventTickets = mockTickets.filter(t => t.event_id === Number(id));

  useEffect(() => {
    if (eventTickets.length > 0) {
      setSelectedTicket(eventTickets[0].ticket_id.toString());
    }
  }, [eventTickets]);

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

  const selectedTicketInfo = eventTickets.find(t => t.ticket_id === Number(selectedTicket));
  const totalPrice = selectedTicketInfo ? selectedTicketInfo.price * quantity : 0;

  const handleBooking = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to book tickets",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (!selectedTicketInfo || selectedTicketInfo.quantity_available < quantity) {
      toast({
        title: "Not enough tickets",
        description: "Please select a lower quantity",
        variant: "destructive"
      });
      return;
    }

    const booking = addBooking({
      user_id: user.user_id,
      event_id: event.event_id,
      quantity: quantity,
      total_price: totalPrice
    });

    toast({
      title: "Booking created!",
      description: "Proceed to payment to confirm your booking",
    });

    navigate(`/payment/${booking.booking_id}`);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'concert':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'theater':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'cinema':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Image */}
          <div className="space-y-6">
            <div className="relative rounded-lg overflow-hidden h-96 lg:h-full">
              <img 
                src={event.image_url} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={getCategoryColor(event.event_category)}>
                  {event.event_category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {event.title}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {event.description}
              </p>
            </div>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Date</div>
                  <div className="font-semibold">{new Date(event.event_date).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Time</div>
                  <div className="font-semibold">{event.event_time}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-semibold">{event.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Available Seats</div>
                  <div className="font-semibold">{event.available_seats} seats</div>
                </div>
              </div>
            </Card>

            {/* Booking Section */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Ticket className="h-5 w-5 text-accent" />
                Book Tickets
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ticket Type</label>
                  <Select value={selectedTicket} onValueChange={setSelectedTicket}>
                    <SelectTrigger className="w-full bg-background/50">
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTickets.map(ticket => (
                        <SelectItem key={ticket.ticket_id} value={ticket.ticket_id.toString()}>
                          {ticket.ticket_type} - ${ticket.price} ({ticket.quantity_available} available)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <Select value={quantity.toString()} onValueChange={(val) => setQuantity(Number(val))}>
                    <SelectTrigger className="w-full bg-background/50">
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} ticket{num > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total Price</span>
                    <span className="text-3xl font-bold text-accent">${totalPrice}</span>
                  </div>
                  
                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-gradient-accent hover:opacity-90"
                    size="lg"
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
