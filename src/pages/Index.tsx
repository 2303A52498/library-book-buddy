import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, User, ShieldCheck, Search, Calendar, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/library-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Library"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="container relative py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-6xl">
              Welcome to LibraryHub
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
              Your comprehensive library management solution. Search, borrow, and manage books
              with ease. Join thousands of readers in our digital library community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild variant="secondary">
                <Link to="/catalog">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Catalog
                </Link>
              </Button>
              <Button size="lg" asChild variant="outline" className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/student">
                  <User className="mr-2 h-5 w-5" />
                  Student Portal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            System Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for efficient library management
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Advanced Search
              </h3>
              <p className="text-muted-foreground">
                Search books by title, author, ISBN, or category. Find exactly what you need
                with powerful filtering options.
              </p>
            </CardContent>
          </Card>

          <Card className="group transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Easy Borrowing
              </h3>
              <p className="text-muted-foreground">
                Borrow books instantly with a single click. Track your borrowed books and
                manage returns seamlessly.
              </p>
            </CardContent>
          </Card>

          <Card className="group transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-lg bg-secondary/10 p-3">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Due Date Tracking
              </h3>
              <p className="text-muted-foreground">
                Never miss a return date. Get notifications about upcoming due dates and
                avoid late fees.
              </p>
            </CardContent>
          </Card>

          <Card className="group transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-lg bg-warning/10 p-3">
                <DollarSign className="h-6 w-6 text-warning" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Fine Management
              </h3>
              <p className="text-muted-foreground">
                Transparent fine calculation at $0.50 per day. View and manage all fines
                in your dashboard.
              </p>
            </CardContent>
          </Card>

          <Card className="group transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Student Portal
              </h3>
              <p className="text-muted-foreground">
                Access your personal dashboard to view borrowed books, due dates, and
                payment history.
              </p>
            </CardContent>
          </Card>

          <Card className="group transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-lg bg-destructive/10 p-3">
                <ShieldCheck className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Librarian Tools
              </h3>
              <p className="text-muted-foreground">
                Complete inventory management, user oversight, and comprehensive reporting
                for librarians.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Explore our extensive collection and start borrowing today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/catalog">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View Catalog
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/librarian">
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Librarian Access
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 LibraryHub. All rights reserved.</p>
          <p className="mt-2">Professional Library Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
