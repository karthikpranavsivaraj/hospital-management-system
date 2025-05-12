import React, { useState } from 'react';
import './DoctorReviews.css';

const DoctorReviews = ({ doctorId, reviews = [], onAddReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  
  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) 
    : 'No ratings yet';
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newReview = {
      doctorId,
      rating,
      comment: reviewText,
      date: new Date().toISOString(),
      // In a real app, this would come from the logged-in user
      patientName: 'Anonymous Patient'
    };
    
    onAddReview(newReview);
    
    // Reset form
    setRating(5);
    setReviewText('');
    setShowReviewForm(false);
  };
  
  // Render stars for ratings
  const renderStars = (rating) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    
    return stars;
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="doctor-reviews">
      <div className="reviews-header">
        <div className="reviews-summary">
          <h3>Patient Reviews</h3>
          <div className="average-rating">
            <div className="rating-number">{averageRating}</div>
            <div className="rating-stars">
              {typeof averageRating === 'string' ? (
                <span className="no-ratings">No ratings yet</span>
              ) : (
                renderStars(Math.round(averageRating))
              )}
              <span className="rating-count">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>
        
        <button 
          className="add-review-btn"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? 'Cancel' : 'Add Review'}
        </button>
      </div>
      
      {showReviewForm && (
        <div className="review-form-container">
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label>Your Rating</label>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= rating ? 'filled' : ''}`}
                    onClick={() => setRating(star)}
                  >
                    {star <= rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="reviewText">Your Review</label>
              <textarea
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                className="form-control"
                rows="4"
                placeholder="Share your experience with this doctor..."
              ></textarea>
            </div>
            
            <button type="submit" className="submit-review-btn">
              Submit Review
            </button>
          </form>
        </div>
      )}
      
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to leave a review!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-name">{review.patientName}</div>
                  <div className="review-date">{formatDate(review.date)}</div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              <div className="review-content">
                {review.comment}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorReviews;