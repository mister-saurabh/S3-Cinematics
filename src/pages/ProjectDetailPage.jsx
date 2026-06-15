import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaPlay, FaTools, FaCalendarAlt, FaUser, FaRegEye } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';

import imgLuxury from '../assets/portfolio-luxury.png';
import imgJewellery from '../assets/portfolio-jewellery.png';
import imgAutomobile from '../assets/portfolio-automobile.png';
import imgRealEstate from '../assets/portfolio-realestate.png';
import imgProduct from '../assets/portfolio-product.png';
import imgAICommercial from '../assets/portfolio-aicommercial.png';

const projectsData = {
  1: {
    title: 'Cinematic Brand Film',
    category: 'AI Commercials',
    image: imgAICommercial,
    client: 'Tech Brand Corp',
    type: 'AI Commercial',
    date: 'May 2026',
    role: 'Creative Director & AI Lead',
    tools: ['Midjourney V6', 'Runway Gen-3 Alpha', 'Topaz Video AI', 'Davinci Resolve'],
    brief: 'Create a high-impact, futuristic corporate brand film showcasing human-technology synergy. The campaign needed to feel premium, advanced, and inspiring, steering away from traditional dry corporate videos and steering towards Hollywood-level visuals.',
    concept: 'We engineered a concept centered on "The Speed of Idea." Combining fluid digital transformations with photorealistic human-AI interactive sequences, the video moves at a breakneck pacing, building emotional resonance with sweeping orchestral movements and high-contrast volumetric lighting.',
    storyboard: [
      { scene: '01', title: 'The Spark', desc: 'A lone creator sits in a dark, architectural studio. Volumetric light shafts illuminate particles in the air as a neural mesh begins to hover above the desk, representing raw thought.' },
      { scene: '02', title: 'The Expansion', desc: 'The camera rapidly sweeps outward through a glass window into a futuristic metropolitan skyline. Cascades of digital data flow down skyscraper faces in photorealistic detail.' },
      { scene: '03', title: 'The Convergence', desc: 'Close-up of a human hand merging with a light-particle stream, transitioning into the company logo appearing out of a cinematic lens flare.' }
    ]
  },
  2: {
    title: 'Luxury Perfume Campaign',
    category: 'Luxury Brand Ads',
    image: imgLuxury,
    client: 'Premium Fragrance Co.',
    type: 'Product Ad',
    date: 'April 2026',
    role: 'Visual Director & CGI Artist',
    tools: ['Midjourney V6', 'Luma Dream Machine', 'Adobe After Effects', 'Premiere Pro'],
    brief: 'Design a breathtaking luxury campaign for a high-end perfume, "Aether." The visuals had to capture the feeling of weightlessness, elegance, and olfactory mystery through liquid glass aesthetics.',
    concept: 'Using fluid simulation styles and slow-motion cinematic tracking shots, we created a dreamscape where perfume bottles float through levitating liquid droplets and silk ribbons. The color grading focused on deep violet, gold, and obsidian hues to command high-end aesthetic value.',
    storyboard: [
      { scene: '01', title: 'Liquid Obsidian', desc: 'A slow pan across a smooth, dark liquid surface. A single drop falls, creating golden ripples that rise up to defy gravity.' },
      { scene: '02', title: 'The Vessel', desc: 'The perfume bottle emerges from the golden ripples, wrapping itself in translucent purple silk that flows around the glass contours.' },
      { scene: '03', title: 'Olfactory Burst', desc: 'The bottle cap opens slightly, releasing a galaxy of golden stardust that fills the screen before fading to the luxury brand lockup.' }
    ]
  },
  3: {
    title: 'Diamond Collection Showcase',
    category: 'Jewellery Ads',
    image: imgJewellery,
    client: 'Heritage Jewellers',
    type: 'Jewellery Ad',
    date: 'June 2026',
    role: 'Art Director',
    tools: ['Midjourney V6', 'Runway Gen-3 Alpha', 'Adobe Firefly', 'Davinci Resolve'],
    brief: 'Launch the "Solitaire Aurora" diamond collection. The objective was to showcase the extreme refractive detail, luxury lighting, and unmatched brilliance of diamonds in a high-fashion digital medium.',
    concept: 'We focused on extreme macro cinematography, highlighting the sharp cuts and refraction of light through diamonds. The aesthetic is clean, bright, and deeply luxurious, utilizing prismatic rainbow refraction flares and slow-spinning displays.',
    storyboard: [
      { scene: '01', title: 'Prismatic Refraction', desc: 'A beam of pure light strikes a diamond facet in slow motion, splitting into a brilliant rainbow spectrum that dances across a dark velvet backdrop.' },
      { scene: '02', title: 'Macro Craftsmanship', desc: 'Ultra close-up tracking shot along the platinum band. Individual micro-diamonds catch the light sequentially in a glowing cascade.' },
      { scene: '03', title: 'The Crown', desc: 'A high-angle rotation of the complete necklace showcase, glowing with an ethereal ambient light before resolving to the logo.' }
    ]
  },
  4: {
    title: 'Supercar Launch Film',
    category: 'Automobile Ads',
    image: imgAutomobile,
    client: 'Aero Motors',
    type: 'Automobile Ad',
    date: 'March 2026',
    role: 'CGI Director & Editor',
    tools: ['Unreal Engine 5', 'Midjourney V6', 'Runway Gen-3 Alpha', 'After Effects'],
    brief: 'Launch a next-generation electric hypercar. The brand needed an adrenaline-pumping, visually striking video that highlights aerodynamic elegance and lightning-fast performance.',
    concept: 'We crafted a high-contrast narrative alternating between moody wind-tunnel simulation lines and neon-drenched night-time mountain road drifts. The sound design features heavy synthetic sub-bass mixed with high-frequency electric whines.',
    storyboard: [
      { scene: '01', title: 'Silent Power', desc: 'A low-angle close-up of the supercar headlight slicing through dense fog. The carbon-fiber texture is illuminated by a thin cyan LED strip.' },
      { scene: '02', title: 'Velocity Drift', desc: 'The car accelerates through a mountain pass at night. Raindrops slide backward across the aerodynamic chassis in photorealistic physics.' },
      { scene: '03', title: 'Sonic Exit', desc: 'The supercar charges directly towards the camera, passing under a highway light that blooms, leaving behind a glowing cyan trace that forms the brand name.' }
    ]
  },
  5: {
    title: 'Penthouse Living Experience',
    category: 'Real Estate Ads',
    image: imgRealEstate,
    client: 'Elite Realty Group',
    type: 'Real Estate Ad',
    date: 'April 2026',
    role: 'Spatial Designer & AI Lead',
    tools: ['Midjourney V6', 'Luma Dream Machine', 'Adobe Photoshop', 'Premiere Pro'],
    brief: 'Produce a high-end promotional tour for a multi-million dollar penthouse listing. The video needed to capture the panoramic skyline views, bespoke architectural finishes, and the absolute peak of luxury living.',
    concept: 'We blended architectural photography with slow, sweeping drone-style AI footage. Warm sunset lighting beams through massive floor-to-ceiling glass windows, reflecting off marble flooring and highlighting custom brass detailing.',
    storyboard: [
      { scene: '01', title: 'Golden Entry', desc: 'A slow gimbal push through double oak doors. Sunlight floods across a double-height living room, casting long architectural shadows.' },
      { scene: '02', title: 'Sky Lounge', desc: 'A panning shot from the marble kitchen island out to an infinity pool that appears to merge seamlessly with the city skyline at dusk.' },
      { scene: '03', title: 'Twilight Majesty', desc: 'Drone-style pull back showing the penthouse glowing like a lantern at the top of a modern skyscraper under a starry sky.' }
    ]
  },
  6: {
    title: 'Premium Audio Visualization',
    category: 'Product Visualizations',
    image: imgProduct,
    client: 'Vocalis Audio',
    type: 'Product Visualization',
    date: 'May 2026',
    role: 'Sound Designer & AI Artist',
    tools: ['Midjourney V6', 'Runway Gen-3 Alpha', 'Adobe Audition', 'Davinci Resolve'],
    brief: 'Create a conceptual advertisement for high-fidelity noise-cancelling headphones. The video needed to represent sound waves, isolation, and absolute audio clarity visually.',
    concept: 'We developed an abstract visual metaphor of sound as floating sand particles. When noise-cancelling is activated, the chaotic particles freeze and drop away, leaving a clean, serene environment around the listener.',
    storyboard: [
      { scene: '01', title: 'Sonic Chaos', desc: 'A close-up of a person in a busy subway station. Floating red sand particles buzz frantically in the air, representing noise.' },
      { scene: '02', title: 'The Silence', desc: 'The headphones are placed on the ears. A ripple of blue light expands outward; the red particles instantly freeze, turn white, and fall gently.' },
      { scene: '03', title: 'Pure Resonance', desc: 'The camera moves inside the headphone cup, showing a stylized glowing diaphragm vibrating perfectly in a deep black space.' }
    ]
  },
  7: {
    title: 'Gold Necklace Reveal',
    category: 'Jewellery Ads',
    image: imgJewellery,
    client: 'Fine Jewellery House',
    type: 'Jewellery Ad',
    date: 'March 2026',
    role: 'Art Director',
    tools: ['Midjourney V6', 'Runway Gen-3 Alpha', 'After Effects'],
    brief: 'Create a teaser video for a premium hand-crafted 24k gold necklace. The video needed to feel ancient, royal, and incredibly refined.',
    concept: 'We used warm, low-key lighting highlighting the metallic sheen and details of handcrafted gold. The background is a textured dark stone, creating a strong contrast with the bright, warm gold.',
    storyboard: [
      { scene: '01', title: 'Liquid Gold', desc: 'Molten gold flows through dark channels on a stone slab, cooling to form the intricate patterns of the necklace.' },
      { scene: '02', title: 'The Craft', desc: 'A macro camera tracks across the detailed clasp and joints, showcasing the filigree work under a warm spotlight.' },
      { scene: '03', title: 'Royal Display', desc: 'The necklace hanging in a museum-like alcove, catching a single perfect spotlight that glows warm gold.' }
    ]
  },
  8: {
    title: 'Futuristic AI Storytelling',
    category: 'AI Commercials',
    image: imgAICommercial,
    client: 'Innovation Corp',
    type: 'AI Commercial',
    date: 'February 2026',
    role: 'Creative Director',
    tools: ['Midjourney V6', 'Runway Gen-3 Alpha', 'Suno AI', 'Premiere Pro'],
    brief: 'Develop an experimental brand commercial showing how AI amplifies human creative potential, demonstrating hyper-imaginative worlds generated from prompts.',
    concept: 'We visualised the process of writing a prompt. As words appear, the environment morphs instantly—from a lush jungle to an underwater research base, then to a Martian colony—showing infinite creative flexibility.',
    storyboard: [
      { scene: '01', title: 'The Blank Page', desc: 'A keyboard key is pressed in an empty white room. A single green vine sprouts from the key, rapidly growing up the wall.' },
      { scene: '02', title: 'Instant Evolution', desc: 'The room morphs; the walls dissolve into a deep jungle canopy, which then instantly transitions to bioluminescent coral reefs.' },
      { scene: '03', title: 'Infinite Horizons', desc: 'The creator steps out of a dome onto red Martian sands, looking at a towering city dome under a double moon.' }
    ]
  },
  9: {
    title: 'Premium Watch Showcase',
    category: 'Luxury Brand Ads',
    image: imgLuxury,
    client: 'Swiss Timepieces Inc.',
    type: 'Product Ad',
    date: 'June 2026',
    role: 'Visual lead & Lead compositor',
    tools: ['Midjourney V6', 'Luma Dream Machine', 'Davinci Resolve', 'After Effects'],
    brief: 'Produce a luxury watch commercial focusing on precision gears, luxury metals, and timeless styling.',
    concept: 'We created a sequence showing gears rotating in microscopic detail, suspended in an architectural clockwork cathedral where light shafts align with the hands of the watch.',
    storyboard: [
      { scene: '01', title: 'Precision Motion', desc: 'Zooming into the skeleton back of the watch. Gold and ruby gears turn in perfect harmony, catching sharp highlights.' },
      { scene: '02', title: 'Clockwork Hall', desc: 'A massive architectural space inspired by watch gears. Volumetric light beams rotate like clock hands across columns.' },
      { scene: '03', title: 'Timeless Beauty', desc: 'The complete timepiece rotates slowly into place, casting a sharp shadow that outlines a sundial motif.' }
    ]
  }
};

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectsData[projectId];

  // Before/After comparison slider state
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  // If project doesn't exist, redirect to work
  useEffect(() => {
    if (!project) {
      navigate('/work');
    }
  }, [project, navigate]);

  if (!project) return null;

  // Handle before/after slider drag
  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const startDrag = () => {
    isDragging.current = true;
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
    return () => {
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, []);

  // Filter out current project for related works list
  const relatedProjects = Object.entries(projectsData)
    .filter(([id]) => id !== projectId)
    .slice(0, 3)
    .map(([id, p]) => ({ id, ...p }));

  return (
    <PageTransition>
      <div className="project-detail-page">
        {/* Immersive Header Banner */}
        <section className="project-detail-hero" style={{ backgroundImage: `url(${project.image})` }}>
          <div className="project-detail-hero-overlay" />
          <div className="project-detail-hero-content">
            <Link to="/work" className="back-link">
              <FaArrowLeft /> Back to Portfolio
            </Link>
            <span className="project-badge">{project.category}</span>
            <h1>{project.title}</h1>
            <p className="project-meta-desc">A premium {project.type} crafted for {project.client}.</p>
          </div>
        </section>

        {/* Project Metadata Stats Strip */}
        <section className="project-meta-strip">
          <div className="meta-item">
            <div className="meta-icon"><FaUser /></div>
            <div className="meta-text">
              <span>Client</span>
              <strong>{project.client}</strong>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-icon"><FaRegEye /></div>
            <div className="meta-text">
              <span>Production Type</span>
              <strong>{project.type}</strong>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-icon"><FaCalendarAlt /></div>
            <div className="meta-text">
              <span>Timeline</span>
              <strong>{project.date}</strong>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-icon"><FaTools /></div>
            <div className="meta-text">
              <span>My Role</span>
              <strong>{project.role}</strong>
            </div>
          </div>
        </section>

        {/* Project Description & Details */}
        <section className="section project-description-section">
          <div className="project-grid">
            <div className="project-description-text">
              <span className="section-label">
                <span className="line" /> The Challenge
              </span>
              <h2>Project Brief & Objectives</h2>
              <p>{project.brief}</p>
              
              <span className="section-label" style={{ marginTop: '40px' }}>
                <span className="line" /> The Narrative
              </span>
              <h2>Creative Execution</h2>
              <p>{project.concept}</p>
            </div>

            {/* Sidebar Technologies */}
            <div className="project-sidebar-stack">
              <div className="sidebar-card">
                <h3>Production Stack</h3>
                <p>Advanced generative AI engines & creative tools utilized in this commercial:</p>
                <div className="tool-tags">
                  {project.tools.map((tool) => (
                    <span className="tool-tag" key={tool}>{tool}</span>
                  ))}
                </div>
                <div className="sidebar-cta">
                  <h4>Looking for something similar?</h4>
                  <p>Request a custom cinematic piece tailored for your brand.</p>
                  <Link to={`/contact?type=book&project=${encodeURIComponent(project.title)}`} className="btn-primary sidebar-btn">
                    Inquire Style
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Before/After Visual Slider */}
        <section className="section before-after-section">
          <div className="section-header-center">
            <span className="section-label">
              <span className="line" /> Post-Production Quality
            </span>
            <h2>AI Prompt Concepts vs. Color-Graded Composite</h2>
            <p>Drag the slider to see the dramatic difference professional color grading, compositing, and AI upscaling make on the raw generated output.</p>
          </div>

          <div 
            className="slider-container"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            {/* Before Layer (Desaturated/Flat Raw Log) */}
            <div className="slider-layer layer-before">
              <img 
                src={project.image} 
                alt="Before Grading" 
                className="slider-image raw-log-filter"
              />
              <span className="slider-label label-before">Raw AI Seed Output</span>
            </div>

            {/* After Layer (Fully Graded Premium Composite) */}
            <div 
              className="slider-layer layer-after"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img 
                src={project.image} 
                alt="After Grading" 
                className="slider-image"
              />
              <span className="slider-label label-after">Final Color-Graded Composite</span>
            </div>

            {/* Slider Divider Handle Line */}
            <div 
              className="slider-handle"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="slider-handle-button">
                <span className="arrow-left">&#9664;</span>
                <span className="arrow-right">&#9654;</span>
              </div>
            </div>
          </div>
        </section>

        {/* Scene-by-Scene Storyboard */}
        <section className="section storyboard-section">
          <div className="section-header-center">
            <span className="section-label">
              <span className="line" /> Creative Direction
            </span>
            <h2>Scene-by-Scene Storyboard</h2>
            <p>A breakdown of the conceptual scenes directing the narrative flow and visual rhythm.</p>
          </div>

          <div className="storyboard-grid">
            {project.storyboard.map((item) => (
              <div className="storyboard-card" key={item.scene}>
                <div className="storyboard-number">{item.scene}</div>
                <div className="storyboard-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Projects */}
        <section className="section related-projects-section">
          <div className="section-header-left">
            <span className="section-label">
              <span className="line" /> Explore More
            </span>
            <h2>Similar Productions</h2>
          </div>

          <div className="work-gallery related-gallery">
            {relatedProjects.map((p) => (
              <div key={p.id} className="work-card-container">
                <Link to={`/work/${p.id}`} className="work-card-link-wrapper">
                  <div className="work-card">
                    <div className="work-card-image">
                      <img src={p.image} alt={p.title} />
                      <div className="work-card-overlay">
                        <div className="work-card-play">
                          <FaPlay />
                        </div>
                      </div>
                    </div>
                    <div className="work-card-info">
                      <span className="work-card-type">{p.type}</span>
                      <h3>{p.title}</h3>
                      <p>Client: {p.client}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
