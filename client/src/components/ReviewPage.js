import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Review.css'

const ReviewPage = () => {
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [addMessage, setAddMessage] = useState('');

  const [deleteBookId, setDeleteBookId] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  const [viewBookId, setViewBookId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [viewMessage, setViewMessage] = useState('');


  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/review/:bookId/add', { rating, review_text: reviewText, email, title });
      setAddMessage(response.data.message);
    } catch (error) {
      setAddMessage(error.response?.data?.message || 'Error adding review');
    }
  };

  const handleDeleteReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:5001/review/${deleteBookId}`);
      setDeleteMessage(response.data.message);
    } catch (error) {
      setDeleteMessage(error.response?.data?.message || 'Error deleting review');
    }
  };


  const handleViewReviews = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5001/review/${viewBookId}`);
      setReviews(response.data.reviews);
      setViewMessage(response.data.message);
    } catch (error) {
      setViewMessage(error.response?.data?.message || 'Error fetching reviews');
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="navbar-item">Books</a>
        </div>
        <div className="navbar-right">
          <button className="navbar-button" onClick={() => navigate('/profile')}>Profile</button>
          <button className="navbar-button" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </nav>
      <div className="review-manager">

        <div className="section">
          <h2>Add Review</h2>
          <form onSubmit={handleAddReview}>
            <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
            <textarea placeholder="Review Text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} required></textarea>
            <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <button type="submit">Add Review</button>
          </form>
          {addMessage && <p>{addMessage}</p>}
        </div>

        <div className="section">
          <h2>Delete Review</h2>
          <form onSubmit={handleDeleteReview}>
            <input type="text" placeholder="Review ID" value={deleteBookId} onChange={(e) => setDeleteBookId(e.target.value)} required />
            <button type="submit">Delete Review</button>
          </form>
          {deleteMessage && <p>{deleteMessage}</p>}
        </div>

        <div className="section">
          <h2>View Reviews</h2>
          <form onSubmit={handleViewReviews}>
            <input type="text" placeholder="Book ID" value={viewBookId} onChange={(e) => setViewBookId(e.target.value)} required />
            <button type="submit">Get Reviews</button>
          </form>
          {viewMessage && <p>{viewMessage}</p>}
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <p>Rating: {review.rating}</p>
                <p>Review: {review.review_text}</p>
                <p>User: {review.User.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>

  )
};

export default ReviewPage;
