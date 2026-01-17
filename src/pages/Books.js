import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Books() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");

  // 🔒 Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(
        `${API_URL}/api/books?search=${search}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setBooks(data);
        setPages(1);
      } else {
        setBooks(data.books || []);
        setPages(data.pages || 1);
      }
    };

    fetchBooks();
  }, [search, page, token]);

  // ➕ Add to cart (NO DUPLICATES)
  const addToCart = (book) => {
    const exists = cart.find((item) => item.book === book._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.book === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          book: book._id,
          title: book.title,
          price: book.price,
          quantity: 1,
        },
      ]);
    }
  };

  // 🧾 Checkout
  const checkoutHandler = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const res = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cart.map((c) => ({
          book: c.book,
          quantity: c.quantity,
        })),
      }),
    });

    if (res.ok) {
      alert("Order placed successfully");
      setCart([]);
    } else {
      alert("Order failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Available Books</h2>

      {/* Search */}
      <input
        placeholder="Search by title / author"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{
          padding: "8px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      {/* Books List */}
      {books.length === 0 && <p>No books found</p>}

      {books.map((b) => (
        <div
          key={b._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <strong>{b.title}</strong>
          <p>Author: {b.author}</p>
          <p>Price: ₹{b.price}</p>
          <button onClick={() => addToCart(b)}>Add to Cart</button>
        </div>
      ))}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {pages}
        </span>

        <button disabled={page === pages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

      {/* Cart */}
      <div style={{ marginTop: "30px" }}>
        <h3>Cart</h3>

        {cart.map((item) => (
          <p key={item.book}>
            {item.title} × {item.quantity} — ₹{item.price * item.quantity}
          </p>
        ))}

        <button
          onClick={checkoutHandler}
          disabled={cart.length === 0}
          style={{ marginTop: "10px" }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Books;
