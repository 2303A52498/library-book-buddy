import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, User, ShieldCheck } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-primary">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl">LibraryHub</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant={isActive("/catalog") ? "default" : "ghost"}
            asChild
          >
            <Link to="/catalog">
              <BookOpen className="mr-2 h-4 w-4" />
              Catalog
            </Link>
          </Button>
          <Button
            variant={isActive("/student") ? "default" : "ghost"}
            asChild
          >
            <Link to="/student">
              <User className="mr-2 h-4 w-4" />
              Student
            </Link>
          </Button>
          <Button
            variant={isActive("/librarian") ? "default" : "ghost"}
            asChild
          >
            <Link to="/librarian">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Librarian
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
