import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, Users, DollarSign, Package, Search, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import { books, borrowedBooks, calculateFine } from "@/lib/bookData";
import { toast } from "sonner";

const LibrarianDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const totalBooks = books.reduce((sum, book) => sum + book.total, 0);
  const availableBooks = books.reduce((sum, book) => sum + book.available, 0);
  const borrowedCount = borrowedBooks.filter((b) => b.status !== "returned").length;
  const totalFines = borrowedBooks
    .filter((b) => b.status === "overdue")
    .reduce((sum, borrowed) => sum + calculateFine(borrowed.dueDate), 0);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
  );

  const handleAddBook = () => {
    toast.success("Book added successfully", {
      description: "New book has been added to the inventory.",
    });
  };

  const handleUpdateInventory = (bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    toast.success(`Inventory updated for "${book?.title}"`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            Librarian Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">Manage your library inventory and users</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-primary/10 p-3">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Books</p>
                <p className="text-2xl font-bold text-foreground">{totalBooks}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-success/10 p-3">
                <BookOpen className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-foreground">{availableBooks}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-warning/10 p-3">
                <Users className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Borrowed</p>
                <p className="text-2xl font-bold text-foreground">{borrowedCount}</p>
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

        {/* Tabs */}
        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
            <TabsTrigger value="borrowers">Active Borrowers</TabsTrigger>
            <TabsTrigger value="fines">Fine Management</TabsTrigger>
          </TabsList>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Book Inventory</CardTitle>
                  <Button onClick={handleAddBook}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Book
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search inventory..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>ISBN</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBooks.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell className="font-mono text-xs">{book.isbn}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{book.category}</Badge>
                        </TableCell>
                        <TableCell>${book.cost.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={book.available > 0 ? "default" : "destructive"}>
                            {book.available}
                          </Badge>
                        </TableCell>
                        <TableCell>{book.total}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateInventory(book.id)}
                          >
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Borrowers Tab */}
          <TabsContent value="borrowers">
            <Card>
              <CardHeader>
                <CardTitle>Active Borrowers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Name</TableHead>
                      <TableHead>Book Title</TableHead>
                      <TableHead>Borrow Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Fine</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {borrowedBooks
                      .filter((b) => b.status !== "returned")
                      .map((borrowed) => {
                        const book = books.find((b) => b.id === borrowed.bookId);
                        const fine =
                          borrowed.status === "overdue"
                            ? calculateFine(borrowed.dueDate)
                            : borrowed.fine;

                        return (
                          <TableRow key={borrowed.id}>
                            <TableCell className="font-medium">
                              {borrowed.userName}
                            </TableCell>
                            <TableCell>{book?.title}</TableCell>
                            <TableCell>
                              {borrowed.borrowDate.toLocaleDateString()}
                            </TableCell>
                            <TableCell>{borrowed.dueDate.toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  borrowed.status === "overdue"
                                    ? "destructive"
                                    : "default"
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
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fines Tab */}
          <TabsContent value="fines">
            <Card>
              <CardHeader>
                <CardTitle>Outstanding Fines</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Name</TableHead>
                      <TableHead>Book Title</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Days Overdue</TableHead>
                      <TableHead>Fine Amount</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {borrowedBooks
                      .filter((b) => b.status === "overdue")
                      .map((borrowed) => {
                        const book = books.find((b) => b.id === borrowed.bookId);
                        const fine = calculateFine(borrowed.dueDate);
                        const daysOverdue = Math.ceil(
                          (new Date().getTime() - borrowed.dueDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        );

                        return (
                          <TableRow key={borrowed.id}>
                            <TableCell className="font-medium">
                              {borrowed.userName}
                            </TableCell>
                            <TableCell>{book?.title}</TableCell>
                            <TableCell>{borrowed.dueDate.toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge variant="destructive">{daysOverdue} days</Badge>
                            </TableCell>
                            <TableCell className="font-semibold text-destructive">
                              ${fine.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline">
                                Send Notice
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
