import { Book } from "@/lib/bookData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar } from "lucide-react";
import { toast } from "sonner";

interface BookCardProps {
  book: Book;
  onBorrow?: (bookId: string) => void;
  showBorrowButton?: boolean;
}

const BookCard = ({ book, onBorrow, showBorrowButton = false }: BookCardProps) => {
  const handleBorrow = () => {
    if (book.available === 0) {
      toast.error("This book is currently unavailable");
      return;
    }
    if (onBorrow) {
      onBorrow(book.id);
      toast.success(`You've borrowed "${book.title}"`, {
        description: "Please return within 14 days to avoid fines.",
      });
    }
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute right-2 top-2 flex gap-2">
            <Badge variant={book.available > 0 ? "default" : "destructive"}>
              {book.available > 0 ? `${book.available} Available` : "Unavailable"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="mb-1 font-semibold text-foreground line-clamp-1">{book.title}</h3>
        <p className="mb-2 text-sm text-muted-foreground">{book.author}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{book.publishYear}</span>
          <span>•</span>
          <span>{book.category}</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {book.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Cost</span>
          <span className="text-lg font-bold text-primary">${book.cost.toFixed(2)}</span>
        </div>
        {showBorrowButton && (
          <Button
            onClick={handleBorrow}
            disabled={book.available === 0}
            size="sm"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Borrow
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;
