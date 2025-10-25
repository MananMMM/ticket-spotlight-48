import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentUser, getBookings, mockEvents, updateBookingStatus } from "@/lib/mockData";
import { useEffect } from "react";
import { Calendar, MapPin, Ticket, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();
  const bookings = getBookings().filter(b => b.user_id === user?.user_id);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleCancelBooking = (bookingId) => {
    updateBookingStatus(bookingId, 'cancelled');
    toast({
      title: "Booking cancelled",
      description: "Your booking has been cancelled successfully",
    });
    window.location.reload();
  };

  if (!user) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="bg-gradient-primary bg-clip-text text-transparent">{user.full_name}</span>
          </h1>
          <p className="text-muted-foreground">Manage your bookings and upcoming events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="text-3xl font-bold text-primary mb-2">
              {bookings.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Bookings</div>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="text-3xl font-bold text-accent mb-2">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <div className="text-sm text-muted-foreground">Confirmed</div>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {bookings.filter(b => b.status === 'pending').length}
            </div>
            <div className="text-sm text-muted-foreground">Pending Payment</div>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>

        {bookings.length === 0 ? (
          <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-border">
            <p className="text-muted-foreground mb-4">You haven't booked any events yet</p>
            <Button onClick={() => navigate('/events')} className="bg-gradient-primary hover:opacity-90">
              Browse Events
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => {
              const event = mockEvents.find(e => e.event_id === booking.event_id);
              if (!event) return null;

              return (
                <Card key={booking.booking_id} className="p-6 bg-card/50 backdrop-blur-sm border-border">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 overflow-hidden rounded-lg bg-muted flex-shrink-0">
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(booking.status)}`}>
                            {booking.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-accent">${booking.total_price}</div>
                          <div className="text-sm text-muted-foreground">{booking.quantity} ticket(s)</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{new Date(event.event_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-primary" />
                          <span>Booking #{booking.booking_id}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <Button 
                              onClick={() => navigate(`/payment/${booking.booking_id}`)}
                              className="bg-gradient-accent hover:opacity-90"
                              size="sm"
                            >
                              Complete Payment
                            </Button>
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelBooking(booking.booking_id)}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelBooking(booking.booking_id)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
