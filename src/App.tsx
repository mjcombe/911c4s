import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Menu, X, Instagram, Mail, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";

/* =========================
   NAVBAR
========================= */

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
        <div
          className="text-xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveSection("home")}
        >
          <span className="text-porsche-silver">911</span>
          <span className="font-light opacity-60">C4S</span>
        </div>

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

/* =========================
   FOOTER
========================= */

const Footer = () => (
  <footer className="bg-porsche-black border-t border-white/5 py-20 px-6 text-center text-white/30 text-sm">
    © 2026 Personal Automotive Project
  </footer>
);

/* =========================
   HOME PAGE
========================= */

const HomePage = ({ onNavigate }: { onNavigate: (s: string) => void }) => (
  <section className="h-screen flex items-center justify-center text-center">
    <div>
      <h1 className="text-6xl font-bold">911 Carrera 4S</h1>
      <button
        onClick={() => onNavigate("gallery")}
        className="mt-10 px-8 py-4 bg-white text-black text-xs uppercase tracking-widest"
      >
        View Gallery <ChevronRight size={16} />
      </button>
    </div>
  </section>
);

/* =========================
   ABOUT PAGE
========================= */

const AboutPage = () => (
  <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
    <img src="/R0020870.webp" className="w-full max-w-xl mx-auto object-cover" />
  </div>
);

/* =========================
   SPECS PAGE
========================= */

const SpecsPage = () => (
  <div className="pt-32 pb-32 text-center">
    <h2 className="text-4xl">Specification</h2>
  </div>
);

/* =========================
   ✅ FIXED GALLERY PAGE
========================= */

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  /* -------- FIX WAS HERE -------- */
  const images = [
    "/R0020870.webp",
    "/R0020891.webp",
    "/R0020896.webp",
    "/R0020898.webp",
    "/R0020902.webp",
    "/R0020926.webp",
  ];
  /* -------------------------------- */

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <h3 className="text-5xl text-center mb-20 font-bold">Personal Gallery</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedImage(src)}
            className="overflow-hidden cursor-pointer aspect-square relative glass-panel"
          >
            <img
              src={src}
              alt={`Gallery ${idx}`}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 flex items-center justify-center transition">
              <Maximize2 className="text-white w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================
   MAIN APP
========================= */

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
