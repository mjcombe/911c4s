import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Menu, X, Instagram, Mail, Maximize2, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

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

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-porsche-black border-t border-white/5 py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <p className="text-white/40 text-sm">
        © 2026 Michael James
      </p>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ onNavigate }: { onNavigate: (s: string) => void }) => {
  return (
    <div className="w-full">
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1280x720/dam/pnr/2018/Products/911/911-Carrera-S-and-4S/911-Carrera-4S-Coupe/P18_0947_a_rgb.jpg/jcr:content/P18_0947_a_rgb.jpg" 
            alt="Porsche 911 Hero" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-8xl font-bold text-white">
            911 Carrera 4S
          </h1>

          <button
            onClick={() => onNavigate("gallery")}
            className="mt-10 px-10 py-4 bg-white text-black text-xs uppercase tracking-widest"
          >
            View Gallery
          </button>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <img src="/R0020870.JPG" className="w-full"/>
    </div>
  );
};

const SpecsPage = () => {
  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold">Specification</h2>
    </div>
  );
};

/* ----------- FIXED GALLERY PAGE ----------- */

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "/R0020870.webp",
    "/R0020891.webp",
    "/R0020896.webp",
    "/R0020898.webp",
    "/R0020902.webp",
    "/R0020926.webp",
    "/R0021052.webp",
    "/R0021023.webp",
    "/IMG_8760.webp",
    "/IMG_8748.webp",
  ];

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
          My Visual Journal
        </h2>
        <h3 className="text-5xl font-bold tracking-tight">
          Personal Gallery
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            onClick={() => setSelectedImage(src)}
            className="cursor-pointer"
          >
            <img src={src} className="w-full"/>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 flex items-center justify-center"
          >
            <img src={selectedImage} className="max-w-full max-h-full"/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

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
      <main className="flex-grow">{renderContent()}</main>
      <Footer />
    </div>
  );
}
