import { useState, useEffect, useRef } from 'react';
import './TestimonialCarousel.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialCarousel = () => {
  const { testimonials, language } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (!isHovered) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1)),
        4500
      );
    }
    return () => resetTimeout();
  }, [currentIndex, isHovered, testimonials.length]);

  const goTo = (i) => setCurrentIndex(i);
  const goPrev = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const goNext = () => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  const t = testimonials[currentIndex];

  return (
    <div
      className="tc-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Arrows */}
      <button className="tc-arrow tc-arrow-left" onClick={goPrev} aria-label="Previous">
        <ChevronLeft size={20} />
      </button>
      <button className="tc-arrow tc-arrow-right" onClick={goNext} aria-label="Next">
        <ChevronRight size={20} />
      </button>

      {/* Card */}
      <div className="tc-card-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="tc-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="tc-quote-icon">
              <Quote size={20} />
            </div>
            <p className="tc-text">{t.text[language]}</p>
            <div className="tc-author">
              <div className="tc-author-avatar">
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="tc-author-name">{t.name}</h4>
                <div className="tc-stars">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="tc-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`tc-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
