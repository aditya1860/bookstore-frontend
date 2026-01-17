import { useEffect, useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");

  const fetchBooks = useCallback(async () => {
    const res = await fetch(`${API_URL}/api/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setBooks(data);
  }, [token]);

  const addBook = async (e) => {
    e.preventDefault();
    const form = e.target;

    const res = await fetch(`${API_URL}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: form.title.value,
        author: form.author.value,
        price: Number(form.price.value),
      }),
    });

    if (res.ok) {
      fetchBooks();
      form.reset();
    } else {
      alert("Admin access only");
    }
  };

  const deleteBook = async (id) => {
    const res = await fetch(`${API_URL}/api/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Dashboard</h2>

      <form onSubmit={addBook}>
        <input name="title" placeholder="Title" required />
        <input name="author" placeholder="Author" required />
        <input name="price" placeholder="Price" required />
        <button type="submit">Add Book</button>
      </form>

      <hr />

      {books.map((b) => (
        <div key={b._id}>
          {b.title}
          <button onClick={() => deleteBook(b._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
