import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Calendar, User, ChevronLeft } from 'lucide-react';

const Blog = () => {
  const { id } = useParams();
  const { blogPosts, language } = useAppContext();

  // If ID is provided, show detail view, otherwise listing
  if (id) {
    const post = blogPosts.find(p => p.id === parseInt(id));
    if (!post) return <div className="container">Post not found</div>;

    return (
      <div className="blog-detail-page container">
        <Link to="/blog" className="back-link">
          <ChevronLeft size={18} />
          Back to Journal
        </Link>
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="blog-article"
        >
          <img src={post.image} alt={post.title[language]} className="article-hero-img" />
          <div className="article-header">
            <span className="article-date">{post.date}</span>
            <h1 className="serif-title">{post.title[language]}</h1>
          </div>
          <div className="article-content">
            <p className="lead">{post.excerpt[language]}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </motion.article>
      </div>
    );
  }

  return (
    <div className="blog-listing-page section-padding container">
      <div className="page-header">
        <h1 className="serif-title">The Journal</h1>
        <p className="subtitle">Stories of heritage, craft, and the soul of orientation.</p>
        <div className="section-line margin-auto"></div>
      </div>
      
      <div className="blog-grid wide">
        {blogPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/blog/${post.id}`} className="blog-card luxury">
              <div className="blog-img">
                <img src={post.image} alt={post.title[language]} />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="date"><Calendar size={14} /> {post.date}</span>
                  <span className="author"><User size={14} /> OUD AL-ANOOD</span>
                </div>
                <h3>{post.title[language]}</h3>
                <p>{post.excerpt[language]}</p>
                <span className="read-more">Read Full Story</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
