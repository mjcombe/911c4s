import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Menu, X, Instagram, Mail, Maximize2, ChevronLeft } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// --- Components ---

const Navbar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "specs", label: "Specification" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-porsche-black/80 backdrop-blur-lg py-4 border-b border-white/5" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveSection("home")}
        >
          <span className="text-porsche-silver">911</span>
          <span className="font-light opacity-60">C4S</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`text-xs uppercase tracking-[0.2em] transition-all hover:text-white ${activeSection === item.id ? "text-white font-semibold" : "text-white/50"}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-porsche-black border-b border-white/10 py-8 px-6 flex flex-col gap-6 md:hidden"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-sm uppercase tracking-[0.2em] text-left ${activeSection === item.id ? "text-white" : "text-white/50"}`}
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-porsche-black border-t border-white/5 py-20 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="space-y-6">
        <div className="text-2xl font-bold tracking-tighter">
          <span className="text-porsche-silver">911</span>
          <span className="font-light opacity-60">C4S</span>
        </div>
        <p className="text-white/40 text-sm max-w-xs leading-relaxed">
          A personal ownership journal documenting my Porsche 911 (992.1) Carrera 4S and its unique specification.
        </p>
      </div>
      <div className="space-y-6">
        <h4 className="text-xs uppercase tracking-widest text-white/60 font-semibold">Connect</h4>
        <div className="flex flex-col gap-4">
          <a href="#" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm">
            <Instagram size={18} /> @porsche_992_c4s
          </a>
          <a href="#" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm">
            <Mail size={18} /> contact@911c4s.com
          </a>
        </div>
      </div>
      <div className="space-y-6">
        <h4 className="text-xs uppercase tracking-widest text-white/60 font-semibold">Legal</h4>
        <p className="text-white/30 text-[10px] uppercase tracking-widest leading-relaxed">
          This site is a personal project and is not affiliated with, sponsored by, or endorsed by Porsche AG. Porsche and the Porsche Crest are registered trademarks of Dr. Ing. h.c. F. Porsche AG.
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest text-white/20">
      <p>© 2026 Personal Automotive Project</p>
      <p>Designed for Performance</p>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ onNavigate }: { onNavigate: (s: string) => void }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1280x720/dam/pnr/2018/Products/911/911-Carrera-S-and-4S/911-Carrera-4S-Coupe/P18_0947_a_rgb./jcr:content/P18_0947_a_rgb."
            alt="Porsche 911 Hero"
            className="w-full h-full object-cover opacity-60 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-porsche-black/40 via-transparent to-porsche-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
              911 <span className="font-light opacity-40 italic">Carrera 4S</span>
            </h1>
            <p className="mt-6 text-sm md:text-base uppercase tracking-[0.4em] text-porsche-silver opacity-80">
              My 911 992.1 Specification
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-wrap justify-center gap-12 pt-12"
          >
            {[
              { label: "Power", value: "450 PS" },
              { label: "0-100 km/h", value: "3.4s" },
              { label: "Top Speed", value: "306 km/h" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-mono font-medium">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("about")}
            className="mt-16 px-10 py-4 bg-white text-black text-xs uppercase font-bold tracking-widest hover:bg-porsche-silver transition-colors flex items-center gap-2 mx-auto"
          >
            Explore Project <ChevronRight size={16} />
          </motion.button>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <div className="w-[1px] h-12 bg-white"></div>
        </div>
      </section>

      {/* Quick Specs Section */}
      <section className="py-24 px-6 bg-porsche-charcoal/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Engine", value: "3.0L Twin-Turbo Flat-6" },
              { label: "Power", value: "450 PS / 530 Nm" },
              { label: "Transmission", value: "8-speed PDK" },
              { label: "Drivetrain", value: "All-Wheel Drive" },
            ].map((spec) => (
              <motion.div
                key={spec.label}
                whileHover={{ y: -5 }}
                className="p-8 glass-panel space-y-4"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">{spec.label}</div>
                <div className="text-lg font-bold tracking-tight">{spec.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Photography */}
      <section className="py-32 px-6 bg-porsche-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/40">Visual Presentation</h2>
              <h3 className="text-4xl font-bold tracking-tight">Featured Photography</h3>
            </div>
            <button
              onClick={() => onNavigate("gallery")}
              className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors border-b border-white/20 pb-1"
            >
              View Gallery
            </button>
          </div>

          <div className="space-y-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="aspect-[21/9] overflow-hidden group cursor-pointer"
              onClick={() => onNavigate("gallery")}
            >
              <img
                src="https://images-porsche.imgix.net/-/media/6DFC261DD0B040A0A3FF9081BD9A36B9_7DFF4660C80843078B7D504B7A95BEEC_CZ26W03OX0001-911-carrera-s-side?w=3000&q=45&crop=faces%2Centropy%2Cedges&auto=format"
                alt="White 911 Carrera 4S Side View"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40">My Specification</h2>
            <h3 className="text-5xl font-bold tracking-tight leading-tight">
              My car, my journey. <br />A lifelong passion.
            </h3>
            <p className="text-white/60 leading-relaxed text-lg">
              This Porsche 911 Carrera 4S (992.1) is the culmination of a lifelong dream. Every detail of this specification was carefully selected to create my ideal balance between daily usability and weekend performance. It's more than just a car; it's a personal milestone.
            </p>
            <div className="pt-8 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2">Configuration</h4>
                <p className="text-white font-medium">White Solid</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2">Interior</h4>
                <p className="text-white font-medium">Black Leather</p>
              </div>
            </div>
          </div>
          <div className="aspect-square overflow-hidden">
            <img
              src="/R0020870.webp"
              alt="Porsche 911 Side"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20">
          {[
            { title: "Driving Dynamics", desc: "The all-wheel-drive system provides immense traction, allowing for confident corner exits in all weather conditions. It's exactly how I wanted the car to feel." },
            { title: "My Factory Options", desc: "I equipped this car with the Sport Chrono Package, PASM Sport Suspension (-10mm), and Rear-Axle Steering for maximum agility." },
            { title: "Personal Notes", desc: "This specific car was selected for its balance of touring comfort and track-ready performance capabilities. It's my ideal daily driver." },
          ].map((item) => (
            <div key={item.title} className="space-y-4 p-8 glass-panel">
              <h4 className="text-lg font-bold tracking-tight">{item.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const SpecsPage = () => {
  const equipmentHighlights = [
    "Sport Chrono Package",
    "Porsche Active Suspension Management (PASM)",
    "LED Matrix Headlights",
    "BOSE® Surround Sound System",
    "Sports Exhaust System",
    "Rear Axle Steering",
    "Adaptive Sports Seats",
    "Apple CarPlay",
    "Navigation System",
  ];

  const includedOptions = [
    {
      category: "Exterior",
      items: [
        "Metallic paint finish",
        "Electric folding exterior mirrors",
        "Sports exhaust system including sports tailpipes",
        "LED main headlights including Porsche Dynamic Light System Plus",
      ],
    },
    {
      category: "Interior",
      items: [
        "Heated multifunction GT sports steering wheel",
        "Adaptive sports seats",
        "Seat heating (front)",
        "Interior trim package",
      ],
    },
    {
      category: "Audio / Communication",
      items: [
        "BOSE® Surround Sound System",
        "Navigation including Porsche Communication Management (PCM)",
      ],
    },
    {
      category: "Assistance Systems",
      items: [
        "ParkAssist (front and rear) including reversing camera",
        "Cruise control",
      ],
    },
  ];

  const technicalData = [
    {
      group: "Engine",
      specs: [
        { label: "Engine Type", value: "Petrol engine" },
        { label: "Configuration", value: "Twin turbocharged flat six engine" },
      ],
    },
    {
      group: "Performance",
      specs: [
        { label: "Power Output", value: "approx. 450 PS" },
        { label: "Drivetrain", value: "All wheel drive" },
        { label: "Transmission", value: "PDK transmission" },
      ],
    },
    {
      group: "Body",
      specs: [
        { label: "Type", value: "Coupé" },
        { label: "Doors", value: "Two door" },
      ],
    },
  ];

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Porsche 911 Carrera 4S (992 I)</h2>
        <h3 className="text-5xl font-bold tracking-tight">My 911 992.1 Specification</h3>
      </div>

      <div className="space-y-24">
        <section>
          <h4 className="text-sm uppercase tracking-widest text-white/60 font-semibold border-b border-white/10 pb-4 mb-8">
            Equipment Highlights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipmentHighlights.map((item) => (
              <div key={item} className="flex items-center gap-3 py-3 border-b border-white/5">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                <span className="text-sm text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-sm uppercase tracking-widest text-white/60 font-semibold border-b border-white/10 pb-4 mb-8">
            Included Options
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {includedOptions.map((group) => (
              <div key={group.category} className="space-y-4">
                <h5 className="text-xs uppercase tracking-wider text-white/30 font-bold">{group.category}</h5>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-white/70 leading-relaxed border-l border-white/10 pl-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-sm uppercase tracking-widest text-white/60 font-semibold border-b border-white/10 pb-4 mb-8">
            Technical Data
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 text-xs uppercase tracking-widest text-white/30 font-medium w-1/3">Category</th>
                  <th className="py-4 text-xs uppercase tracking-widest text-white/30 font-medium">Specification</th>
                  <th className="py-4 text-xs uppercase tracking-widest text-white/30 font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {technicalData.map((group) => (
                  group.specs.map((spec, idx) => (
                    <tr key={`${group.group}-${spec.label}`} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 text-xs uppercase tracking-wider text-white/40">
                        {idx === 0 ? group.group : ""}
                      </td>
                      <td className="py-4 text-sm text-white/60">{spec.label}</td>
                      <td className="py-4 text-sm font-mono text-white/90">{spec.value}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h4 className="text-sm uppercase tracking-widest text-white/60 font-semibold border-b border-white/10 pb-4 mb-4">
            Standard Equipment
          </h4>
          <p className="text-xs text-white/30 italic">Detailed standard equipment available upon request.</p>
        </section>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // ✅ FIX: Added .webp extensions — original code had "/R0020870." etc (trailing dot, no extension)
  const images = [
    "/R0020870.webp",
    "/R0020891.webp",
    "/R0020896.webp",
    "/R0020898.webp",
    "/R0020902.webp",
    "/R0020926.webp",
  ];

  const goNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
  }, [images.length]);

  const goPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setSelectedIndex((p) => (p !== null ? (p + 1) % images.length : 0));
      if (e.key === "ArrowLeft") setSelectedIndex((p) => (p !== null ? (p - 1 + images.length) % images.length : 0));
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, images.length]);

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">My Visual Journal</h2>
        <h3 className="text-5xl font-bold tracking-tight">Personal Gallery</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedIndex(idx)}
            className="overflow-hidden group cursor-pointer aspect-square relative glass-panel"
          >
            {/* ✅ grayscale by default, colour on hover — pure Tailwind, no overlay image needed */}
            <img
              src={src}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="text-white w-8 h-8 drop-shadow-lg" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ✅ Lightbox with prev/next + keyboard navigation */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            {/* Close */}
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={32} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-10 p-2"
              onClick={goPrev}
            >
              <ChevronLeft size={40} />
            </button>

            {/* Image */}
            <motion.img
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={images[selectedIndex]}
              alt={`Gallery ${selectedIndex + 1}`}
              className="max-w-full max-h-full object-contain shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-10 p-2"
              onClick={goNext}
            >
              <ChevronRight size={40} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs uppercase tracking-widest">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case "home": return <HomePage onNavigate={setActiveSection} />;
      case "about": return <AboutPage />;
      case "specs": return <SpecsPage />;
      case "gallery": return <GalleryPage />;
      default: return <HomePage onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="flex-grow">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
