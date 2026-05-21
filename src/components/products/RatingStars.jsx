// src/components/products/RatingStars.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RatingStars = ({ 
  rating = 0, 
  totalReviews = 0, 
  onRate = null, 
  readonly = false,
  size = 'medium',
  showCount = true 
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const sizes = {
    small: { star: 16, fontSize: '12px' },
    medium: { star: 24, fontSize: '14px' },
    large: { star: 32, fontSize: '16px' }
  };

  const starSize = sizes[size].star;
  const fontSize = sizes[size].fontSize;

  const handleRating = (value) => {
    if (readonly) return;
    setCurrentRating(value);
    if (onRate) {
      onRate(value);
    }
  };

  const getStarType = (index) => {
    const ratingValue = hoverRating || currentRating;
    if (index <= ratingValue) {
      return 'full';
    }
    if (index - 0.5 <= ratingValue) {
      return 'half';
    }
    return 'empty';
  };

  const renderStar = (index) => {
    const starType = getStarType(index);
    const isFull = starType === 'full';
    const isHalf = starType === 'half';

    return (
      <motion.div
        key={index}
        whileHover={{ scale: readonly ? 1 : 1.2 }}
        whileTap={{ scale: readonly ? 1 : 0.9 }}
        style={{
          cursor: readonly ? 'default' : 'pointer',
          display: 'inline-flex',
          position: 'relative'
        }}
        onMouseEnter={() => !readonly && setHoverRating(index)}
        onMouseLeave={() => !readonly && setHoverRating(0)}
        onClick={() => !readonly && handleRating(index)}
      >
        {/* Empty Star (Background) */}
        <svg
          width={starSize}
          height={starSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ddd"
          strokeWidth="1.5"
          style={{ position: 'absolute' }}
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>

        {/* Full Star */}
        {isFull && (
          <svg
            width={starSize}
            height={starSize}
            viewBox="0 0 24 24"
            fill="#FF9800"
            stroke="#FF9800"
            strokeWidth="1"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        )}

        {/* Half Star */}
        {isHalf && (
          <svg
            width={starSize}
            height={starSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF9800"
            strokeWidth="1"
          >
            <defs>
              <clipPath id={`half-${index}`}>
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="#FF9800"
              clipPath={`url(#half-${index})`}
            />
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="none"
              stroke="#FF9800"
              strokeWidth="1.5"
            />
          </svg>
        )}
      </motion.div>
    );
  };

  const getRatingLabel = () => {
    if (currentRating >= 4.5) return 'Excellent';
    if (currentRating >= 4.0) return 'Very Good';
    if (currentRating >= 3.5) return 'Good';
    if (currentRating >= 3.0) return 'Average';
    if (currentRating >= 2.0) return 'Below Average';
    return 'Poor';
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map((index) => renderStar(index))}
      </div>
      
      {showCount && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ 
            fontWeight: 'bold', 
            color: '#FF9800', 
            fontSize 
          }}>
            {currentRating.toFixed(1)}
          </span>
          
          {totalReviews > 0 && (
            <span style={{ color: '#666', fontSize }}>
              ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
            </span>
          )}
          
          {currentRating > 0 && !readonly && (
            <span style={{ color: '#4CAF50', fontSize, marginLeft: '4px' }}>
              {getRatingLabel()}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default RatingStars;