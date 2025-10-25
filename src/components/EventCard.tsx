import { Link } from "react-router-dom";
import { Event } from "@/lib/mockData";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const categoryColors = {
    cinema: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    theater: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    concert: "bg-orange-500/10 text-orange-400 border-orange-500/20"
  };

  return (
    <Link to={`/event/${event.event_id}`}>
      <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-300 hover:scale-[1.02]">
        <div className="aspect-video overflow-hidden bg-muted">
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[event.event_category]}`}>
              {event.event_category.toUpperCase()}
            </span>
            <span className="text-sm font-bold text-accent">${event.ticket_price}</span>
          </div>
          
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {event.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{new Date(event.event_date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{event.event_time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-primary" />
              <span>{event.available_seats} seats available</span>
            </div>
          </div>

          <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
            View Details
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default EventCard;
