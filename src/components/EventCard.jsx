import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";

const EventCard = ({ event }) => {
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
    <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image_url} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className={getCategoryColor(event.event_category)}>
            {event.event_category}
          </Badge>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{new Date(event.event_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{event.event_time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Ticket className="h-4 w-4 text-primary" />
            <span>{event.available_seats} seats available</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-sm text-muted-foreground">From</span>
            <div className="text-2xl font-bold text-accent">${event.ticket_price}</div>
          </div>
          <Link to={`/event/${event.event_id}`}>
            <Button className="bg-gradient-accent hover:opacity-90">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
