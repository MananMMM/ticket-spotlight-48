import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";
import Navigation from "@/components/Navigation";
import { mockEvents } from "@/lib/mockData";
import { Sparkles, Calendar, Users, Star } from "lucide-react";

const Home = () => {
  const featuredEvents = mockEvents.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Discover Amazing Events</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Experience Live
            </span>
            <br />
            <span className="text-foreground">
              Entertainment
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book tickets for concerts, theater shows, and cinema screenings all in one place.
            Your next unforgettable experience is just a click away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/events">
              <Button size="lg" className="bg-gradient-accent hover:opacity-90 shadow-glow">
                <Calendar className="mr-2 h-5 w-5" />
                Browse Events
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Events Monthly</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">4.9</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 px-4 bg-background/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Events</h2>
              <p className="text-muted-foreground">Don't miss out on these amazing experiences</p>
            </div>
            <Link to="/events">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map(event => (
              <EventCard key={event.event_id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Why Choose EventHub?</h2>
            <p className="text-muted-foreground">The easiest way to discover and book events</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Easy Booking</h3>
              <p className="text-muted-foreground">
                Book your tickets in seconds with our streamlined checkout process
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Best Selection</h3>
              <p className="text-muted-foreground">
                Access to the widest variety of concerts, theater, and cinema events
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Trusted Platform</h3>
              <p className="text-muted-foreground">
                Join thousands of satisfied customers who trust us for their entertainment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 EventHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
