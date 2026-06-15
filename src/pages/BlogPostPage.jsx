import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaShareAlt, FaEnvelope, FaChevronRight } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import { blogArticles } from '../data/blogData';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = blogArticles.find((a) => a.slug === slug);

  // Scroll progress bar state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  // Auto-scroll update
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Redirect if not found
  useEffect(() => {
    if (!article) {
      navigate('/blog');
    }
  }, [article, navigate]);

  if (!article) return null;

  // Find related articles (excluding the current one)
  const relatedArticles = blogArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 2);

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 8000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard! 🔗');
    }
  };

  return (
    <PageTransition>
      {/* Scroll Progress Bar */}
      <div className="reading-progress-track">
        <div className="reading-progress-fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="blog-post-page">
        {/* Banner Hero */}
        <section className="post-hero" style={{ backgroundImage: `url(${article.image})` }}>
          <div className="post-hero-overlay" />
          <div className="post-hero-content">
            <Link to="/blog" className="back-link">
              <FaArrowLeft /> Back to Insights
            </Link>
            <span className="post-category-badge">{article.category}</span>
            <h1>{article.title}</h1>
            <div className="post-meta">
              <span className="meta-item"><FaCalendarAlt /> {article.date}</span>
              <span className="meta-item"><FaClock /> {article.readTime}</span>
              <button onClick={handleShare} className="share-btn" aria-label="Share article">
                <FaShareAlt /> Share
              </button>
            </div>
          </div>
        </section>

        {/* Article Body Grid */}
        <section className="section article-body-section">
          <div className="article-layout-grid">
            
            {/* Left/Main Column: Rich Article Content */}
            <article className="article-content-wrapper">
              {article.content.map((block, idx) => {
                if (block.type === 'heading') {
                  return <h2 key={idx} className="article-heading">{block.text}</h2>;
                } else if (block.type === 'quote') {
                  return (
                    <blockquote key={idx} className="article-quote">
                      <p>"{block.text}"</p>
                      <cite>— {article.author}</cite>
                    </blockquote>
                  );
                } else {
                  return <p key={idx} className="article-paragraph">{block.text}</p>;
                }
              })}

              {/* Share & Footer Row */}
              <div className="article-footer-row">
                <div className="article-tags">
                  <span className="tag">#AI</span>
                  <span className="tag">#Filmmaking</span>
                  <span className="tag">#CreativeAgency</span>
                </div>
                <button onClick={handleShare} className="btn-outline share-footer-btn">
                  <FaShareAlt style={{ marginRight: '8px' }} /> Share This Post
                </button>
              </div>
            </article>

            {/* Right Column: Sidebar Widgets */}
            <aside className="article-sidebar">
              
              {/* Author Widget */}
              <div className="sidebar-widget author-widget">
                <h3>Written By</h3>
                <div className="author-box">
                  <div className="author-details">
                    <strong>{article.author}</strong>
                    <span>{article.authorRole}</span>
                  </div>
                </div>
                <p>Saurabh Kr Prajapati is the founder and AI Creative Director behind S3 Cinematics. He specializes in designing cinematic, photorealistic advertising experiences using cutting-edge neural-render pipelines.</p>
              </div>

              {/* Newsletter Widget */}
              <div className="sidebar-widget newsletter-widget">
                <h3>Subscribe to Insights</h3>
                <p>Receive monthly breakdowns of advanced AI prompting techniques, project case studies, and studio insights.</p>
                {subscribed ? (
                  <div className="newsletter-success">
                    <span>✅ Thank you for subscribing!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribeSubmit} className="newsletter-form">
                    <div className="input-group">
                      <FaEnvelope className="envelope-icon" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary newsletter-btn">
                      Subscribe
                    </button>
                  </form>
                )}
              </div>

              {/* Related/Next Posts Widget */}
              <div className="sidebar-widget related-widget">
                <h3>Related Articles</h3>
                <div className="related-posts-list">
                  {relatedArticles.map((rel) => (
                    <Link to={`/blog/${rel.slug}`} className="related-post-card" key={rel.slug}>
                      <div className="card-thumb">
                        <img src={rel.image} alt={rel.title} />
                      </div>
                      <div className="card-info">
                        <h4>{rel.title}</h4>
                        <span>{rel.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Micro-CTA Sidebar Card */}
              <div className="sidebar-widget sidebar-cta-card">
                <h3>Elevate Your Brand</h3>
                <p>Want Hollywood-grade cinematic AI ads for your products?</p>
                <Link to="/contact" className="btn-primary flex-btn">
                  Book a Consultation <FaChevronRight style={{ marginLeft: '6px' }} />
                </Link>
              </div>

            </aside>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
