import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import { blogArticles } from '../data/blogData';

const categories = ['All', 'AI Production', 'Case Studies', 'Masterclass'];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Find the featured post
  const featuredPost = blogArticles.find((article) => article.featured);

  // Filter posts
  const filteredArticles = blogArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      activeCategory === 'All' || article.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <PageTransition>
      <div className="blog-page">
        {/* Page Hero */}
        <section className="page-hero">
          <div className="page-hero-glow" />
          <div className="page-hero-content">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="dot" />
              Creative Insights
            </motion.div>
            <motion.h1
              className="page-hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              The Cinematic <span className="highlight">AI Blog</span>
            </motion.h1>
            <motion.p
              className="page-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Insights, masterclasses, and case studies detailing how we push the absolute limits of AI filmmaking, visual art, and luxury marketing.
            </motion.p>
          </div>
        </section>

        {/* Featured Article Spotlight */}
        {featuredPost && activeCategory === 'All' && !searchTerm && (
          <section className="section featured-blog-section">
            <motion.div 
              className="featured-blog-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="featured-image">
                <img src={featuredPost.image} alt={featuredPost.title} />
                <div className="featured-overlay" />
              </div>
              <div className="featured-info">
                <div className="info-meta">
                  <span className="category-badge">{featuredPost.category}</span>
                  <span className="meta-item"><FaCalendarAlt /> {featuredPost.date}</span>
                  <span className="meta-item"><FaClock /> {featuredPost.readTime}</span>
                </div>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.summary}</p>
                <div className="author-row">
                  <div>
                    <strong>{featuredPost.author}</strong>
                    <span>{featuredPost.authorRole}</span>
                  </div>
                  <Link to={`/blog/${featuredPost.slug}`} className="btn-primary featured-btn">
                    Read Article <FaArrowRight style={{ marginLeft: '8px' }} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Search & Filtering Controls */}
        <section className="blog-controls-section">
          <div className="blog-controls-wrapper">
            
            {/* Category Filter Tabs */}
            <div className="blog-categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`blog-category-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="blog-search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
              />
            </div>
          </div>
        </section>

        {/* Articles Listing Grid */}
        <section className="section blog-grid-section">
          {filteredArticles.length > 0 ? (
            <div className="blog-grid">
              <AnimatePresence mode="popLayout">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.slug}
                    className="blog-card"
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <Link to={`/blog/${article.slug}`} className="blog-card-link">
                      <div className="blog-card-image">
                        <img src={article.image} alt={article.title} />
                        <span className="blog-card-category">{article.category}</span>
                      </div>
                      <div className="blog-card-content">
                        <div className="blog-card-meta">
                          <span><FaCalendarAlt /> {article.date}</span>
                          <span><FaClock /> {article.readTime}</span>
                        </div>
                        <h3>{article.title}</h3>
                        <p>{article.summary}</p>
                        <span className="blog-card-read-more">
                          Read Article <FaArrowRight />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* No Results Found state */
            <div className="blog-no-results">
              <h3>No articles found</h3>
              <p>Try refining your search terms or selecting another category.</p>
              <button 
                className="btn-outline" 
                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                style={{ marginTop: '16px' }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
}
