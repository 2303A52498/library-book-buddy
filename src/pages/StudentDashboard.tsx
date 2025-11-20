import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Calendar, DollarSign, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { borrowedBooks, books, calculateFine } from "@/lib/bookData";
import { toast } from "sonner";

const StudentDashboard = () => {
  // Filter for current student (mock user "s1")
  const myBorrowedBooks = borrowedBooks.filter(
    (borrowed) => borrowed.userId === "s1" && borrowed.status !== "returned"
  );

  const totalFines = myBorrowedBooks.reduce((sum, borrowed) => {
    if (borrowed.status === "overdue") {
      return sum + calculateFine(borrowed.dueDate);
    }
    return sum + borrowed.fine;
  }, 0);

  const handleReturn = (borrowId: string) => {
    const borrowed = borrowedBooks.find((b) => b.id === borrowId);
    const book = books.find((b) => b.id === borrowed?.bookId);
    toast.success(`Successfully returned "${book?.title}"`, {
      description: "Thank you for returning on time!",
    });
  };

  const handlePayFine = () => {
    toast.success("Fine payment processed", {
      description: `$${totalFines.toFixed(2)} has been paid successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            Student Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">Welcome back, John Smith</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Books Borrowed</p>
                <p className="text-2xl font-bold text-foreground">{myBorrowedBooks.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-warning/10 p-3">
                <AlertCircle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overdue Books</p>
                <p className="text-2xl font-bold text-foreground">
                  {myBorrowedBooks.filter((b) => b.status === "overdue").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-destructive/10 p-3">
                <DollarSign className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Fines</p>
                <p className="text-2xl font-bold text-foreground">${totalFines.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Borrowed Books Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Currently Borrowed Books</CardTitle>
          </CardHeader>
          <CardContent>
            {myBorrowedBooks.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Borrow Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fine</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myBorrowedBooks.map((borrowed) => {
                    const book = books.find((b) => b.id === borrowed.bookId);
                    const fine =
                      borrowed.status === "overdue"
                        ? calculateFine(borrowed.dueDate)
                        : borrowed.fine;

                    return (
                      <TableRow key={borrowed.id}>
                        <TableCell className="font-medium">{book?.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-3 w-3" />
                            {borrowed.borrowDate.toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-3 w-3" />
                            {borrowed.dueDate.toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              borrowed.status === "overdue" ? "destructive" : "default"
                            }
                          >
                            {borrowed.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              fine > 0 ? "font-semibold text-destructive" : ""
                            }
                          >
                            ${fine.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReturn(borrowed.id)}
                          >
                            Return
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No books currently borrowed. Visit the catalog to borrow books!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Fine Payment */}
        {totalFines > 0 && (
          <Card className="border-destructive/50">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">
                  Outstanding Fines
                </h3>
                <p className="text-sm text-muted-foreground">
                  You have ${totalFines.toFixed(2)} in unpaid fines
                </p>
              </div>
              <Button variant="destructive" onClick={handlePayFine}>
                <DollarSign className="mr-2 h-4 w-4" />
                Pay Fines
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
