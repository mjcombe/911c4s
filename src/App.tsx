import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Menu, X, Instagram, Mail, Maximize2, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

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
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection("home")}>
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

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-porsche-black border-b border-white/10 py-8 px-6 flex flex-col gap-6 md:hidden">
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
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-porsche-black border-t border-white/5 py-20 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <div className="text-2xl font-bold tracking-tighter">
          <span className="text-porsche-silver">911</span>
          <span className="font-light opacity-60">C4S</span>
        </div>
        <p className="text-white/40 text-sm max-w-xs leading-relaxed mt-4">
          A personal ownership journal documenting my Porsche 911 (992.1) Carrera 4S and its unique specification.
        </p>
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-widest text-white/60 font-semibold mb-6">Connect</h4>
        <div className="flex flex-col gap-4">
          <a href="https://www.instagram.com/its.michaeljames/" target="_blank" className="flex items-center gap-3 text-white/40 hover:text-white text-sm">
            <Instagram size={18}/> its.michaeljames
          </a>
          <a href="mailto:mj@911c4s.co.uk" className="flex items-center gap-3 text-white/40 hover:text-white text-sm">
            <Mail size={18}/> mj@911c4s.co.uk
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-widest text-white/60 font-semibold mb-6">Legal</h4>
        <p className="text-white/30 text-[10px] uppercase tracking-widest leading-relaxed">
          This site is a personal project and is not affiliated with Porsche AG.
        </p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between text-[10px] uppercase tracking-widest text-white/20">
      <p>© 2026 MICHAEL JAMES</p>
      <p>Designed for Performance</p>
    </div>
  </footer>
);

const HomePage = ({ onNavigate }: { onNavigate: (s: string) => void }) => (
  <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
    <img src="/IMG_8748.webp" className="absolute inset-0 w-full h-full object-cover opacity-60"/>
    <div className="relative text-center space-y-6">
      <h1 className="text-6xl font-bold">911 Carrera 4S</h1>
      <button onClick={() => onNavigate("gallery")} className="px-10 py-4 bg-white text-black text-xs uppercase tracking-widest">
        Explore Project
      </button>
    </div>
  </section>
);

const AboutPage = () => (
  <div className="pt-32 pb-32 px-6 max-w-6xl mx-auto">
    <img src="/R0020870.webp" className="w-full"/>
  </div>
);

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "/R0020870.webp",
    "/R0020891.webp",
    "/R0020896.webp",
    "/R0020898.webp",
    "/R0020902.webp",
    "/R0020926.webp",
    "/R0021023.webp",
    "/R0021052.webp",
    "/IMG_8760.webp",
    "/IMG_8748.webp",
  ];

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <div key={idx} onClick={() => setSelectedImage(src)} className="cursor-pointer">
            <img src={src} className="w-full"/>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} className="max-w-full max-h-full"/>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  const renderContent = () => {
    switch (activeSection) {
      case "home": return <HomePage onNavigate={setActiveSection}/>;
      case "about": return <AboutPage/>;
      case "gallery": return <GalleryPage/>;
      default: return <HomePage onNavigate={setActiveSection}/>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection}/>
      <main className="flex-grow">{renderContent()}</main>
      <Footer/>
    </div>
  );
}
