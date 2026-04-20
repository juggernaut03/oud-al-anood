import { useParams, Link } from 'react-router-dom';
import './Blog.css';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Calendar, User, ChevronLeft } from 'lucide-react';

const Blog = () => {
  const { id } = useParams();
  const { blogPosts, language, t } = useAppContext();

  if (id) {
    const post = blogPosts.find(
      (p) => String(p.id) === String(id) || p.slug === id
    );
    if (!post) return <div className="container">{t('blog_not_found')}</div>;

    return (
      <div className="blog-detail-page container">
        <Link to="/blog" className="back-link">
          <ChevronLeft size={18} />
          {t('blog_back')}
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
            {post.body?.[language] ? (
              <p>{post.body[language]}</p>
            ) : null}
          </div>
        </motion.article>
      </div>
    );
  }

  return (
    <div className="blog-listing-page section-padding container">
      <div className="page-header">
        <h1 className="serif-title">{t('blog_title')}</h1>
        <p className="subtitle">{t('blog_subtitle')}</p>
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
                  <span className="author"><User size={14} /> {t('blog_author')}</span>
                </div>
                <h3>{post.title[language]}</h3>
                <p>{post.excerpt[language]}</p>
                <span className="read-more">{t('blog_read_more')}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
