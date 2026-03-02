import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Menu, X, Instagram, Mail, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";

/* ================= NAVBAR ================= */

const Navbar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-porsche-black/80 backdrop-blur-lg py-4 border-b border-white/5" : "py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between">
        <div onClick={() => setActiveSection("home")} className="cursor-pointer font-bold">
          <span className="text-porsche-silver">911</span>
          <span className="opacity-60"> C4S</span>
        </div>

        <div className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveSection(item.id)} className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white">
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

/* ================= FOOTER ================= */

const Footer = () => (
  <footer className="bg-porsche-black border-t border-white/5 py-16 text-center text-white/30 text-sm">
    © 2026 Personal Automotive Project
  </footer>
);

/* ================= HOME ================= */

const HomePage = ({ onNavigate }: { onNavigate: (s: string) => void }) => (
  <section className="h-screen flex items-center justify-center text-center">
    <div>
      <h1 className="text-6xl font-bold">911 Carrera 4S</h1>
      <button onClick={() => onNavigate("gallery")} className="mt-10 px-10 py-4 bg-white text-black text-xs uppercase tracking-widest flex items-center gap-2 mx-auto">
        Explore Gallery <ChevronRight size={16} />
      </button>
    </div>
  </section>
);

/* ================= ABOUT ================= */

const AboutPage = () => (
  <div className="pt-32 pb-32 px-6 max-w-6xl mx-auto">
    <img src="/R0020870.webp" className="w-full object-cover rounded-sm" />
  </div>
);

/* ================= SPECS ================= */

const SpecsPage = () => (
  <div className="pt-32 pb-32 text-center">
    <h2 className="text-4xl">Specification</h2>
  </div>
);

/* ================= PREMIUM GALLERY ================= */

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "/R0020870.webp",
    "/R0020891.webp",
    "/R0020896.webp",
    "/R0020898.webp",
    "/R0020902.webp",
    "/R0020926.webp",
  ];

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">My Visual Journal</h2>
        <h3 className="text-5xl font-bold tracking-tight">Personal Gallery</h3>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => setSelectedImage(src)}
            className="overflow-hidden group cursor-pointer aspect-square relative glass-panel"
          >
            <img
              src={src}
              alt={`Gallery ${idx}`}
              className="
                w-full h-full object-cover
                transition duration-700 ease-out
                filter grayscale contrast-110 brightness-90
                group-hover:grayscale-0
                group-hover:brightness-100
                group-hover:contrast-100
                group-hover:scale-105
              "
            />

            {/* premium overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
              <Maximize2 className="text-white w-8 h-8 opacity-80" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              src={selectedImage}
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ================= MAIN APP ================= */

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
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
        <motion.div key={activeSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {renderContent()}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
