MongoDB Data Layer Fundamentals and Advanced Techniques

This project demonstrates MongoDB operations using Mongoose in Node.js, including CRUD, advanced queries, aggregation pipelines, and indexing.

📂 Project Structure
.
├── models/
│   └── books.js         # Mongoose schema/model for books
├── queries.js          # Main script with tasks (CRUD, queries, aggregation, indexing)
├── package.json        # Project dependencies
├── .env                # Environment variables (MongoDB connection string)
└── README.md           # Project documentation

⚙️ Setup Instructions
1. Clone the Repository
git clone <your-repo-url>
cd <your-project-folder>

2. Install Dependencies
npm install

3. Configure Environment Variables

Create a .env file in the project root and add your MongoDB connection string:

MONGO_URI=mongodb://127.0.0.1:27017/plp-bookstore




4. Run the Script
node queries.js

📘 Tasks Implemented
Task 1: CRUD Operations

Insert multiple book documents.

Update and delete records.

Fetch all books.

Task 2: Queries

Find books by condition (published_year > 2000).

Use projection to return specific fields.

Task 3: Advanced Queries

Books in stock & published after 2010.

Projection (title, author, price).

Sorting by price (asc/desc).

Pagination using limit() and skip().

Task 4: Aggregation Pipeline

Average price of books by genre.

Author with the most books.

Group books by decade and count.

Task 5: Indexing

Index on title.

Compound index on (author, published_year).

Demonstrated performance with .explain().

🛠️ Requirements

Node.js (v16 or later)

MongoDB running locally or via Atlas