import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBookings, mockEvents, addPayment, updateBookingStatus, getCurrentUser } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, CheckCircle2 } from "lucide-react";

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();
  
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const booking = getBookings().find(b => b.booking_id === Number(bookingId));
  const event = booking ? mockEvents.find(e => e.event_id === booking.event_id) : null;

  if (!booking || !event) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-2xl font-bold">Booking not found</h1>
          <Link to="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const payment = addPayment({
        booking_id: booking.booking_id,
        payment_method: paymentMethod as any,
        payment_status: 'completed'
      });

      updateBookingStatus(booking.booking_id, 'confirmed');
      
      setIsProcessing(false);
      toast({
        title: "Payment successful!",
        description: "Your booking has been confirmed",
      });
      
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Complete Payment
            </span>
          </h1>

          <div className="space-y-6">
            {/* Booking Summary */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Event</span>
                  <span className="font-semibold">{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold">
                    {new Date(event.event_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-semibold">{event.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="font-semibold">{booking.quantity} ticket(s)</span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-3xl font-bold text-accent">${booking.total_price}</span>
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Method
              </h2>
              
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-full bg-background/50">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="debit_card">Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="cash">Cash on Arrival</SelectItem>
                </SelectContent>
              </Select>

              {paymentMethod === 'cash' && (
                <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm text-muted-foreground">
                    Please pay at the venue before the event starts. Your booking will be confirmed once payment is received.
                  </p>
                </div>
              )}

              <Button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6 bg-gradient-accent hover:opacity-90"
                size="lg"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Complete Payment - ${booking.total_price}
                  </>
                )}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
