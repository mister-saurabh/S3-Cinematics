import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaptopCode, FaCheck, FaCopy, FaPlay, FaSyncAlt, FaArrowRight, FaCogs, FaSlidersH, FaFileAlt } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';

const products = [
  { id: 'perfume', label: 'Luxury Fragrance', icon: '✨' },
  { id: 'car', label: 'Sports Hypercar', icon: '🏎️' },
  { id: 'jewelry', label: 'Diamond Jewelry', icon: '💎' },
  { id: 'wearable', label: 'Tech Smart Watch', icon: '⌚' },
  { id: 'fashion', label: 'High Fashion Jacket', icon: '🧥' }
];

const styles = [
  { id: 'cyberpunk', label: 'Cyberpunk Neon', desc: 'Glitchy grids, vivid neon contrasts' },
  { id: 'noir', label: 'Cinematic Noir', desc: 'Moody silhouettes, high shadows' },
  { id: 'glossy', label: 'High Fashion Glossy', desc: 'Luxury commercial, pristine look' },
  { id: 'minimal', label: 'Minimalist Architectural', desc: 'Clean lines, raw material backgrounds' }
];

const moods = [
  { id: 'golden', label: 'Golden Hour Rays', desc: 'Warm cinematic sunset haze' },
  { id: 'neon', label: 'Moody Neon Splits', desc: 'Dual-toned ambient highlights' },
  { id: 'volumetric', label: 'Cinematic Volumetric', desc: 'Smoke beams, dramatic spotlights' },
  { id: 'studio', label: 'Soft Studio Light', desc: 'High-end diffuse studio setup' }
];

const audios = [
  { id: 'orchestral', label: 'Epic Orchestral Rise', desc: 'Strings, brass, emotional peak' },
  { id: 'synth', label: 'Moody Synth & Bass', desc: '80s arpeggios, analog warmth' },
  { id: 'ambient', label: 'Zen Ambient Organic', desc: 'Soft wind, water drops, minimal' },
  { id: 'beats', label: 'High-Energy Cyber Beats', desc: 'Deep sub-bass, fast digital rhythm' }
];

const generateSandboxContent = (product, style, mood, audio) => {
  const productLabels = {
    perfume: 'Luxury Fragrance bottle',
    car: 'Electric Hypercar',
    jewelry: 'Diamond Necklace',
    wearable: 'Tech Smart Watch',
    fashion: 'Premium High Fashion Jacket'
  };

  const styleLabels = {
    cyberpunk: 'Cyberpunk Neon',
    noir: 'Cinematic Noir',
    glossy: 'High Fashion Glossy',
    minimal: 'Minimalist Architectural'
  };

  const moodLabels = {
    golden: 'Golden Hour Rays',
    neon: 'Moody Neon Splits',
    volumetric: 'Cinematic Volumetric',
    studio: 'Soft Studio Light'
  };

  const audioLabels = {
    orchestral: 'Epic Orchestral Rise',
    synth: 'Moody Synth & Bass',
    ambient: 'Zen Ambient Organic',
    beats: 'High-Energy Cyber Beats'
  };

  const p = productLabels[product] || product;
  const s = styleLabels[style] || style;
  const m = moodLabels[mood] || mood;
  const a = audioLabels[audio] || audio;

  const prompt = `Cinematic advertising shot, hyper-realistic ${p} showcasing ${s} aesthetics. Volumetric ${m} lighting, high-contrast reflections, detailed materials, 8k resolution, shot on Arri Alexa, masterfully color-graded --ar 16:9 --style raw`;

  let scene1 = `The camera introduces the ${p} in a highly stylized ${s} environment. Subtle light flares sweep across the frame, highlighting the product contours.`;
  let scene2 = `An extreme macro tracking shot focusing on the fine textures of the ${p}. Volumetric ${m} beams illuminate suspended particles in the air.`;
  let scene3 = `The scene builds to a climax to the rhythm of ${a}. The product rotates into full view with a soft, branding-matched glow as the logo is revealed.`;

  if (product === 'perfume') {
    scene1 = `A slow panning shot introduces the sleek luxury perfume bottle suspended in a ${s} atmospheric setting.`;
    scene2 = `Macro focus on the crystal cap. A single drop of premium essence releases, creating ripple waves illuminated by ${m}.`;
    scene3 = `The bottle pulses with light to the rhythm of ${a}, dissolving the background into a clean, premium brand lockup.`;
  } else if (product === 'car') {
    scene1 = `The ${s} headlights cut through dense smoke as the electric hypercar accelerates forward in slow motion.`;
    scene2 = `Track-side camera sweeps past the aerodynamic side panels, reflecting the volumetric ${m} lighting.`;
    scene3 = `The hypercar drifts around a sweeping bend as ${a} peaks, leaving glowing trails of energy that resolve to the logo.`;
  } else if (product === 'jewelry') {
    scene1 = `A macro shot reveals a raw gemstone resting on textured velvet in a ${s} exhibition space.`;
    scene2 = `The raw stone crystallizes into a faceted diamond necklace as refractive rainbows dance under the ${m} lighting.`;
    scene3 = `The necklace spins slowly, catching brilliant reflections, fading out to the sound of ${a} as the emblem appears.`;
  } else if (product === 'wearable') {
    scene1 = `A digital lattice sweeps over a black screen, constructing a high-tech smart watch frame in a ${s} cyber-lab.`;
    scene2 = `The watch display comes to life, displaying a neural pulse syncing with the volumetric ${m} rays.`;
    scene3 = `A finger taps the glass, sending a digital ripple outward to the beat of ${a}, fading to the clean agency branding.`;
  } else if (product === 'fashion') {
    scene1 = `A silhouette model steps out from dark shadows into a high-contrast ${s} runway corridor.`;
    scene2 = `A close-up tracks the gold embroidery and textured fabric of the luxury jacket catching the ${m} spotlights.`;
    scene3 = `The model turns dynamically, matching the crescendo of ${a}, leaving behind a silhouette that morphs into the brand badge.`;
  }

  return {
    prompt,
    storyboard: [
      { scene: '01', title: 'The Opening Hook', desc: scene1 },
      { scene: '02', title: 'Macro Detail Focus', desc: scene2 },
      { scene: '03', title: 'Climactic Resolve', desc: scene3 }
    ],
    labels: { product: p, style: s, mood: m, audio: a }
  };
};

export default function SandboxPage() {
  const navigate = useNavigate();

  // Selection state
  const [selectedProduct, setSelectedProduct] = useState('perfume');
  const [selectedStyle, setSelectedStyle] = useState('cyberpunk');
  const [selectedMood, setSelectedMood] = useState('neon');
  const [selectedAudio, setSelectedAudio] = useState('synth');

  // Generator engine state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing art-direction parameters...');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Cycle loading texts based on progress
  useEffect(() => {
    if (progress < 25) {
      setLoadingText('Initializing art-direction parameters...');
    } else if (progress < 50) {
      setLoadingText('Simulating lighting vectors & raytracing...');
    } else if (progress < 75) {
      setLoadingText('Compiling cinematic storyboard blocks...');
    } else {
      setLoadingText('Polishing narrative scene structure...');
    }
  }, [progress]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    setResult(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const data = generateSandboxContent(selectedProduct, selectedStyle, selectedMood, selectedAudio);
            setResult(data);
            setIsGenerating(false);
          }, 400);
          return 100;
        }
        return prev + 2.5; // increments to 100 in ~4s
      });
    }, 100);
  };

  const handleCopyPrompt = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProduceCTA = () => {
    if (!result) return;
    const { product, style, mood, audio } = result.labels;
    navigate(`/contact?sandbox=true&product=${encodeURIComponent(product)}&style=${encodeURIComponent(style)}&mood=${encodeURIComponent(mood)}&audio=${encodeURIComponent(audio)}`);
  };

  return (
    <PageTransition>
      <div className="sandbox-page">
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
              AI Creative Sandbox
            </motion.div>
            <motion.h1
              className="page-hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Design Your <span className="highlight">AI Commercial</span>
            </motion.h1>
            <motion.p
              className="page-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Select product parameters, lighting directions, and audio vibes. Our AI engine compiles a detailed video generation prompt and custom storyboard.
            </motion.p>
          </div>
        </section>

        {/* Interactive Sandbox Workspace */}
        <section className="section sandbox-section">
          <div className="sandbox-workspace-grid">
            
            {/* Left: Input Parameters Panel */}
            <div className="sandbox-controls-panel">
              <div className="controls-header">
                <FaCogs className="header-icon" />
                <h3>Art Direction Parameters</h3>
              </div>

              {/* 1. Product/Industry */}
              <div className="control-group">
                <label className="control-label">1. Product Category</label>
                <div className="product-selector-grid">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      className={`product-select-btn ${selectedProduct === p.id ? 'active' : ''}`}
                      onClick={() => setSelectedProduct(p.id)}
                    >
                      <span className="btn-icon">{p.icon}</span>
                      <span className="btn-label">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Visual Style */}
              <div className="control-group">
                <label className="control-label">2. Visual Aesthetics</label>
                <div className="options-selector-grid">
                  {styles.map((s) => (
                    <button
                      key={s.id}
                      className={`option-select-btn ${selectedStyle === s.id ? 'active' : ''}`}
                      onClick={() => setSelectedStyle(s.id)}
                    >
                      <span className="option-title">{s.label}</span>
                      <span className="option-desc">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Mood & Lighting */}
              <div className="control-group">
                <label className="control-label">3. Mood & Lighting</label>
                <div className="options-selector-grid">
                  {moods.map((m) => (
                    <button
                      key={m.id}
                      className={`option-select-btn ${selectedMood === m.id ? 'active' : ''}`}
                      onClick={() => setSelectedMood(m.id)}
                    >
                      <span className="option-title">{m.label}</span>
                      <span className="option-desc">{m.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Audio Vibe */}
              <div className="control-group">
                <label className="control-label">4. Audio & Sound Vibe</label>
                <div className="options-selector-grid">
                  {audios.map((a) => (
                    <button
                      key={a.id}
                      className={`option-select-btn ${selectedAudio === a.id ? 'active' : ''}`}
                      onClick={() => setSelectedAudio(a.id)}
                    >
                      <span className="option-title">{a.label}</span>
                      <span className="option-desc">{a.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trigger Generation */}
              <button 
                className="btn-primary generate-workspace-btn"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                <FaSyncAlt className={isGenerating ? 'spin-icon' : ''} style={{ marginRight: '8px' }} />
                {isGenerating ? 'Generating Storyboard...' : 'Compile Storyboard'}
              </button>
            </div>

            {/* Right: Sandbox Outputs & Storyboard */}
            <div className="sandbox-results-panel">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  /* Loading Simulator Screen */
                  <motion.div 
                    key="sandbox-loader"
                    className="sandbox-loader-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="sandbox-loading-dial">
                      <div className="loading-orbit-ring ring-1" />
                      <div className="loading-orbit-ring ring-2" />
                      <div className="loading-icon-center">
                        <FaLaptopCode />
                      </div>
                    </div>
                    <h4>{loadingText}</h4>
                    <p className="loading-percent">{Math.round(progress)}%</p>
                    <div className="loading-bar-track">
                      <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </motion.div>
                ) : result ? (
                  /* Results Display Screen */
                  <motion.div 
                    key="sandbox-results"
                    className="sandbox-results-content"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Concept Title */}
                    <div className="results-badge-wrap">
                      <span className="results-meta-badge">{result.labels.product}</span>
                      <span className="results-meta-badge">{result.labels.style}</span>
                    </div>
                    <h2>AI Design Concept Ready</h2>

                    {/* Copyable Prompts Card */}
                    <div className="prompt-display-card">
                      <div className="card-top">
                        <span className="label"><FaSlidersH style={{ marginRight: '6px' }} /> Compiled Video Prompt</span>
                        <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={handleCopyPrompt}>
                          {copied ? <><FaCheck /> Copied</> : <><FaCopy /> Copy Prompt</>}
                        </button>
                      </div>
                      <div className="prompt-body-text">
                        "{result.prompt}"
                      </div>
                    </div>

                    {/* Storyboard Block */}
                    <div className="storyboard-results-list">
                      <div className="storyboard-header">
                        <FaFileAlt style={{ marginRight: '8px', color: 'var(--accent-blue)' }} />
                        <h3>Visual Storyboard Flow</h3>
                      </div>
                      <div className="storyboard-flow-container">
                        {result.storyboard.map((item) => (
                          <div className="storyboard-flow-card" key={item.scene}>
                            <div className="flow-num">{item.scene}</div>
                            <div className="flow-info">
                              <h4>{item.title}</h4>
                              <p>{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Lead CTA */}
                    <div className="results-action-card">
                      <div>
                        <h3>Produce This Commercial?</h3>
                        <p>Let's turn this conceptual sandbox prompt and storyboard into an industry-grade cinematic advertisement.</p>
                      </div>
                      <button onClick={handleProduceCTA} className="btn-primary produce-cta-btn">
                        Produce Now <FaArrowRight style={{ marginLeft: '8px' }} />
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  /* Empty state placeholder */
                  <motion.div 
                    key="sandbox-empty"
                    className="sandbox-empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="empty-icon-wrap">
                      <FaLaptopCode />
                    </div>
                    <h3>Start Art Direction</h3>
                    <p>Select your preferred parameters on the left and click <strong>"Compile Storyboard"</strong> to launch the cinematic generator.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>
      </div>
    </PageTransition>
  );
}
