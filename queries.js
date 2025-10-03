const {connectDB, mongoose} = require('./db');
const Book = require('./models/books');

async function main() {
  try {
    await connectDB();

    // Task 2

    // 1. Find all books in a specific genre
    const fantasyBooks = await Book.find({ genre: "Fantasy" });
    console.log(" Fantasy Books:");
    console.log(fantasyBooks, );

    // 2. Find books published after a certain year
    const modernBooks = await Book.find({ published_year: { $gt: 1950 } });
    console.log(" Books published after 1950:");
    console.log(modernBooks,);

    // 3. Find books by a specific author
    const orwellBooks = await Book.find({ author: "George Orwell" });
    console.log(" Books by George Orwell:");
    console.log(orwellBooks, );

    // 4. Update the price of a specific book
    const updateResult = await Book.updateOne(
      { title: "1984" },
      { $set: { price: 14.99 } }
    );
    console.log(" Update Result for '1984':", updateResult, );

    // 5. Delete a book by its title
    const deleteResult = await Book.deleteOne({ title: "Moby Dick" });
    console.log(" Delete Result for 'Moby Dick':", deleteResult, );




         // Task 3
     // 🔍 1. Find books that are both in stock AND published after 2010
    const recentInStockBooks = await Book.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }, "title author price"); // projection -> only show title, author, price
    console.log("📘 Books in stock and published after 2010:");
    console.log(recentInStockBooks, );

    // 🔍 2. Sort books by price ascending
    const booksAsc = await Book.find({}, "title author price").sort({ price: 1 });
    console.log(" Books sorted by price (ascending):");
    console.log(booksAsc, );

    // 🔍 3. Sort books by price descending
    const booksDesc = await Book.find({}, "title author price").sort({ price: -1 });
    console.log(" Books sorted by price (descending):");
    console.log(booksDesc, );

    // 🔍 4. Pagination -> 5 books per page
    const page = 1; // change this value to 2, 3, etc. for different pages
    const limit = 5;
    const skip = (page - 1) * limit;

    const paginatedBooks = await Book.find({}, "title author price")
      .skip(skip)
      .limit(limit);

    console.log(` Page ${page} (5 books per page):`);
    console.log(paginatedBooks, );



    //Task 4

      // 1. Average price of books by genre
    const avgPriceByGenre = await Book.aggregate([
      {
        $group: {
          _id: "$genre",
          avgPrice: { $avg: "$price" },
          totalBooks: { $sum: 1 }
        }
      },
      { $sort: { avgPrice: -1 } } // optional: highest average first
    ]);
    console.log("💰 Average price by genre:");
    console.log(avgPriceByGenre,);

    // 2. Author with the most books
    const topAuthor = await Book.aggregate([
      {
        $group: {
          _id: "$author",
          bookCount: { $sum: 1 }
        }
      },
      { $sort: { bookCount: -1 } },
      { $limit: 1 }
    ]);
    console.log(" Author with the most books:");
    console.log(topAuthor, );

    // 3. Group books by publication decade and count them
    const booksByDecade = await Book.aggregate([
      {
        $group: {
          _id: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: [ { $divide: ["$published_year", 10] }, 1 ] } ] }, // decade calc
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          decade: { $multiply: ["$_id", 10] },
          count: 1,
          _id: 0
        }
      },
      { $sort: { decade: 1 } }
    ]);
    console.log(" Books grouped by decade:");
    console.log(booksByDecade, );


    //Task 5

     // 1. Create index on title
    await Book.collection.createIndex({ title: 1 });
    console.log(" Created index on 'title' field");

    // 2. Create compound index on author + published_year
    await Book.collection.createIndex({ author: 1, published_year: -1 });
    console.log(" Created compound index on 'author' + 'published_year'");

    // 3. Use explain() to demonstrate performance improvement
    console.log(" Running query without index (collection scan):");
    const noIndexExplain = await Book.find({ title: "1984" }).explain("executionStats");
    console.log("Execution stats (no index):");
    console.log({
      totalDocsExamined: noIndexExplain.executionStats.totalDocsExamined,
      executionTimeMillis: noIndexExplain.executionStats.executionTimeMillis
    }, );

    console.log(" Running query with index:");
    const indexExplain = await Book.find({ title: "1984" }).hint({ title: 1 }).explain("executionStats");
    console.log("Execution stats (with index):");
    console.log({
      totalDocsExamined: indexExplain.executionStats.totalDocsExamined,
      executionTimeMillis: indexExplain.executionStats.executionTimeMillis
    }, );

  } catch (err) {
    console.error(" Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log(" Connection closed");
  }
}

main();



   

