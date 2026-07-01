import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Coffee, 
  Wifi, 
  Wind, 
  Mountain,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Clock,
  Users,
  Home,
  Utensils,
  Leaf,
  Beef,
  Globe,
  Compass,
  Car
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Components ---

const Counter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Dining', href: '#dining' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location', href: '#location' },
    { name: 'Booking', href: '#booking' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-wood-dark/95 backdrop-blur-md py-3 shadow-xl" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          {/* Logo Placeholder */}
<div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
  <img 
    src="/logoimage.png" 
    alt="Logo" 
    className="w-full h-full object-contain"
    onError={(e) => {
      (e.target as HTMLImageElement).src = "/favicon.png";
    }}
  />
</div>
          <div className="flex flex-col">
            <span className={cn(
              "font-display text-xl tracking-wider font-bold leading-none",
              isScrolled ? "text-gold-accent" : "text-white"
            )}>
              HAMTA FOOTHILLS
            </span>
            <span className={cn(
              "text-[8px] uppercase tracking-[0.3em] font-medium mt-1",
              isScrolled ? "text-warm-beige" : "text-white/80"
            )}>
              Luxury Mountain Cottage
            </span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "text-sm uppercase tracking-widest font-medium transition-colors hover:text-gold-accent",
                isScrolled ? "text-warm-beige" : "text-white"
              )}
            >
              {link.name}
            </motion.a>
          ))}
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => {
    const section = document.getElementById("booking");
    section?.scrollIntoView({ behavior: "smooth" });
  }}
  className="bg-gold-accent text-wood-dark px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
>
  Book Now
</motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} className={isScrolled ? "text-gold-accent" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-wood-dark absolute top-full left-0 w-full overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-warm-beige text-xl font-serif italic tracking-wide"
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-gold-accent text-wood-dark py-4 rounded-xl font-bold uppercase tracking-widest">
                Book Your Stay
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: y1
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-gold-accent uppercase tracking-[0.5em] text-sm font-bold mb-4 block">
            Welcome to Paradise
          </span>
          <h1 className="text-white font-display text-5xl md:text-8xl mb-6 leading-tight">
            Hamta Foothills <br />
            <span className="font-serif italic font-light">Cottage</span>
          </h1>
          <p className="text-warm-beige text-lg md:text-xl font-serif italic mb-10 max-w-2xl mx-auto opacity-90">
            A Luxury Mountain Escape in the heart of Prini, Manali. Experience the Himalayas like never before.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(197, 160, 89, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold-accent text-wood-dark px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-2"
            >
              Book Your Stay <ChevronRight size={18} />
            </motion.a>
            <motion.a
              href="#gallery"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              className="text-white border border-white/30 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm backdrop-blur-sm"
            >
              Explore Gallery
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/1.jpeg" 
              alt="Mountain View" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-wood-dark rounded-2xl p-8 hidden lg:flex flex-col justify-center shadow-xl">
            <span className="text-gold-accent text-4xl font-display mb-2">
              <Counter value={15} />+
            </span>
            <p className="text-warm-beige text-sm uppercase tracking-widest font-bold">Years of Himalayan Hospitality</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-earth-brown uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
            Our Story
          </span>
          <h2 className="text-wood-dark font-display text-4xl md:text-5xl mb-8 leading-tight">
            Where Luxury Meets the <br />
            <span className="font-serif italic text-earth-brown">Wild Himalayas</span>
          </h2>
          <p className="text-wood-medium text-lg leading-relaxed mb-8 font-serif italic">
            Nestled in the serene landscapes of Prini, Manali, Hamta Foothills Cottage is more than just a stay—it's a sanctuary. Crafted with premium local wood and stone, our cottage offers an authentic Himachali experience blended with modern luxury.
          </p>
          
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col">
              <span className="text-gold-accent text-3xl font-display mb-1"><Counter value={500} />+</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-wood-dark/60">Happy Guests</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gold-accent text-3xl font-display mb-1"><Counter value={12} /></span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-wood-dark/60">Luxury Rooms</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            {[
              { icon: <Mountain className="text-gold-accent" />, text: "Peak Views" },
              { icon: <Coffee className="text-gold-accent" />, text: "Local Cuisine" },
              { icon: <Wifi className="text-gold-accent" />, text: "High-speed WiFi" },
              { icon: <Wind className="text-gold-accent" />, text: "Fresh Air" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="p-2 bg-wood-dark/5 rounded-lg">{item.icon}</div>
                <span className="text-sm font-bold uppercase tracking-wider text-wood-dark">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<{
    type: "image" | "video";
    src: string;
  } | null>(null);

  const media = [
    { type: "image", src: "1.jpeg" },
    { type: "image", src: "2.jpeg" },
    { type: "video", src: "1.mp4" },
    { type: "image", src: "3.jpeg" },
    { type: "image", src: "4.jpeg" },
    { type: "video", src: "2.mp4" },
    { type: "image", src: "5.jpeg" },
    { type: "image", src: "6.jpeg" },
    { type: "image", src: "7.jpeg" },
    { type: "image", src: "8.jpeg" },
    { type: "video", src: "3.mp4" },
    { type: "image", src: "9.jpeg" },
    { type: "image", src: "11.jpeg" },
    { type: "image", src: "12.jpeg" },
    { type: "image", src: "14.jpeg" },
    { type: "video", src: "4.mp4" },
    { type: "image", src: "15.jpeg" },
    { type: "image", src: "16.jpeg" },
    { type: "image", src: "17.jpeg" },
    { type: "video", src: "5.mp4" },
    { type: "image", src: "19.jpeg" },

  ];

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMedia(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section id="gallery" className="py-24 px-6 bg-wood-dark text-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="text-gold-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
          Visual Journey
        </span>
        <h2 className="font-display text-4xl md:text-5xl mb-4">
          The Cottage Experience
        </h2>
        <p className="text-warm-beige/60 font-serif italic text-lg">
          Glimpses of your next mountain retreat
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setSelectedMedia(item)}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={`Gallery ${i}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <video
                src={item.src}
                muted
                loop
                autoPlay
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              {item.type === "video" ? (
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xl">
                  ▶
                </div>
              ) : (
                <span className="text-white border border-white/50 px-6 py-2 rounded-full text-xs uppercase tracking-widest">
                  View Large
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="absolute top-10 right-10 text-white hover:text-gold-accent transition-colors"
              onClick={() => setSelectedMedia(null)}
            >
              <X size={40} />
            </button>

            {selectedMedia.type === "image" ? (
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={selectedMedia.src}
                className="max-w-full max-h-full rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.video
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={selectedMedia.src}
                controls
                autoPlay
                className="max-w-full max-h-full rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};



const Dining = () => {
  const meals = [
    {
      type: "Breakfast",
      time: "8 AM to 10 AM",
      price: "₹300 per person",
      details: ["5 hot dishes", "Served with Tea/Coffee", "Freshly prepared at property"]
    },
    {
      type: "Lunch",
      time: "Flexible timings",
      price: "₹400 per person",
      details: ["5 hot dishes", "Freshly prepared at property", "Common dining or rooms"]
    },
    {
      type: "Dinner",
      time: "Flexible timings",
      price: "₹400 per person",
      details: ["5 hot dishes", "Freshly prepared at property", "Common dining or rooms"]
    }
  ];

  return (
    <section id="dining" className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-earth-brown uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
            Food and Dining
          </span>
          <h2 className="text-wood-dark font-display text-4xl md:text-5xl mb-4">Mountain Flavors</h2>
          <p className="text-wood-medium/60 font-serif italic text-lg max-w-2xl mx-auto">
            Hamta Foothills Cottage, Centrally Heated River side Cottage, Manali
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1 bg-wood-dark p-10 rounded-3xl text-warm-beige shadow-2xl">
            <h3 className="font-display text-3xl mb-8 italic">Meals from Fixed Menu</h3>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gold-accent/20 rounded-xl">
                  <Utensils className="text-gold-accent" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Meals Offered</p>
                  <div className="flex gap-4 mt-1">
                    <span className="flex items-center gap-1 text-sm font-medium"><Leaf size={14} className="text-emerald-500" /> Veg</span>
                    <span className="flex items-center gap-1 text-sm font-medium"><Beef size={14} className="text-red-500" /> Non Veg</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gold-accent/20 rounded-xl">
                  <Globe className="text-gold-accent" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Cuisines</p>
                  <p className="text-sm font-medium">South Indian, Chinese, Continental & Local</p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="bg-gold-accent/10 p-6 rounded-2xl border border-gold-accent/20">
                  <p className="text-xs uppercase tracking-widest font-bold text-gold-accent mb-2">All Meals Package</p>
                  <p className="text-3xl font-display italic">₹800 <span className="text-sm font-sans not-italic opacity-60">per person</span></p>
                  <p className="text-[10px] mt-2 opacity-50 uppercase tracking-wider">Breakfast, Lunch & Dinner included</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {meals.map((meal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-wood-dark/5 hover:shadow-xl transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <h4 className="font-display text-2xl italic text-wood-dark group-hover:text-gold-accent transition-colors">{meal.type}</h4>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-accent bg-gold-accent/10 px-3 py-1 rounded-full">{meal.price}</span>
                </div>
                <div className="flex items-center gap-2 text-wood-medium/60 text-xs mb-6">
                  <Clock size={14} /> {meal.time}
                </div>
                <ul className="space-y-3">
                  {meal.details.map((detail, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-wood-medium/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            <div className="bg-gold-accent/5 p-8 rounded-3xl border border-dashed border-gold-accent/30 flex flex-col justify-center items-center text-center">
              <p className="text-wood-dark font-serif italic text-lg mb-2">Custom Requests?</p>
              <p className="text-xs text-wood-medium/60 leading-relaxed">We cater to special dietary needs and preferences. Please inform our staff in advance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Landmarks = () => {
  const landmarks = [
    { name: "Tibetan Monastery", dist: "3.6 km", type: "Temple" },
    { name: "Mall Road", dist: "3.8 km", type: "Nearby" },
    { name: "Hidimba Devi Temple", dist: "5.1 km", type: "Temple" },
    { name: "Vashist Hot Water Springs", dist: "8.3 km", type: "Relaxation" },
    { name: "Solang Valley", dist: "17.1 km", type: "Attraction   " },
    { name: "Rohtang Valley", dist: "33.2 km", type: "High-Pass" },
    { name: "Hamta trek start point/Sethan", dist: "14.1 km", type: "Trek" },
    { name: "Jogni Falls", dist: "7.3 km", type: "Attraction" },
    { name: "Old Manali", dist: "5.5 km", type: "Town" },
    { name: "Sissu", dist: "42.5 km", type: "Town" },
  ];

  return (
    <div className="mt-16 pt-16 border-t border-wood-dark/5">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-wood-dark rounded-full flex items-center justify-center shrink-0">
          <Compass className="text-gold-accent" size={20} />
        </div>
        <div>
          <h4 className="font-bold text-wood-dark uppercase tracking-widest text-sm mb-1">Key Landmarks</h4>
          <p className="text-wood-medium/60 text-xs italic">Explore the beauty around Hamta Foothills</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {landmarks.map((mark, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 10 }}
            className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-wood-dark/5 group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-2 h-2 rounded-full",
                mark.type === "Attraction" ? "bg-gold-accent" : "bg-wood-medium/30"
              )} />
              <span className="text-sm font-medium text-wood-dark group-hover:text-gold-accent transition-colors">{mark.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-wood-medium/40">
              <Car size={12} /> {mark.dist}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Location = () => {
  return (
    <section id="location" className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-earth-brown uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
              Find Us
            </span>
            <h2 className="text-wood-dark font-display text-4xl md:text-5xl mb-8">
              In the Heart of <br />
              <span className="font-serif italic text-earth-brown">Prini, Manali</span>
            </h2>
            
            <div className="space-y-8 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-wood-dark rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-gold-accent" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-wood-dark uppercase tracking-widest text-sm mb-1">Address</h4>
                  <p className="text-wood-medium/80 font-medium">Prini Nullah, Naggar Road, Manali, Himachal Pradesh 175131</p>
                  <p className="text-[10px] uppercase tracking-widest text-gold-accent font-bold mt-1">3.8 km drive to Mall Road</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-wood-dark rounded-full flex items-center justify-center shrink-0">
                  <Phone className="text-gold-accent" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-wood-dark uppercase tracking-widest text-sm mb-1">Contact</h4>
                  <p className="text-wood-medium/80">+91 94184 34297</p>
                  <p className="text-wood-medium/80">+91 94181 33297</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-wood-dark rounded-2xl text-warm-beige">
              <h4 className="font-display text-2xl mb-4 italic">Travel Tip</h4>
              <p className="text-sm opacity-80 leading-relaxed">
                The cottage is located just 4km from the main Manali Mall Road, offering the perfect balance of accessibility and seclusion. We recommend taking a local taxi for the most scenic climb up to Prini.
              </p>
            </div>

            <Landmarks />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3375.4179732239663!2d77.19686217543575!3d32.21991047390142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390463ee6cb7f159%3A0xa4759890728ee78a!2sHamta%20FootHills%20Cottage(By%20Epic%20Hospitality)!5e0!3m2!1sen!2sin!4v1771598961698!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Booking = () => {
  const bookingPlatforms = [
    { 
      name: "WhatsApp", 
      icon: <img  src = "/whatsapp.jpg"></img>, 
      color: "bg-[#25D366]", 
      link: "https://wa.me/919418133297",
      description: "Direct chat with our host"
    },
    { 
      name: "MakeMyTrip", 
      icon: <img src="/makemytrip.jpg"></img>,
      color: "bg-[#E61B2E]", 
      link: "https://www.makemytrip.com/hotels/hamta_foothills_cottage_centrally_heated_river_side_cottage_manali-details-manali.html",
      description: "Best for Indian travelers"
    },
        { 
      name: "Goibibo", 
      icon: <img src = "/gobibo.png"></img>, 
      color: "bg-[#E61B2E]", 
      link: "https://www.goibibo.com/hotels/hamta-foothills-cottage-centrally-heated-river-side-cottage-manali-hotel-in-manali-8358980773755012793/",
      description: "Best for Indian travelers"
    },
        { 
      name: "Trip.com", 
      icon: <img src = "/trip.png"></img>, 
      color: "bg-[#E61B2E]", 
      link: "https://in.trip.com/hotels/manali-hotel-detail-104502777/hamta-foothills-manali-cottage/",
      description: "Best for Indian travelers"
    },
        { 
      name: "TripAdvisor", 
      icon: <img src = "tripadvisor.png"></img>, 
      color: "bg-[#E61B2E]", 
      link: "https://www.tripadvisor.in/Hotel_Review-g11901504-d25446251-Reviews-Hamta_Foothills_Cottage-Prini_Manali_Tehsil_Kullu_District_Himachal_Pradesh.html",
      description: "Best for Indian travelers"
    },
    { 
      name: "Agoda", 
      icon: <img src = "agoda.png"></img>, 
      color: "bg-[#873F97]", 
      link: "https://www.agoda.com/hamta-foothills-manali-cottage/hotel/manali-in.html?cid=1844104&ds=CX6Y1DMTGdSAufv0",
      description: "Global booking partner"
    },
    { 
      name: "Planet Of Hotels", 
      icon: <img src = "/planetofhotels.png"></img>, 
      color: "bg-[#873F97]", 
      link: "https://en.planetofhotels.com/india/jagatsukh/hamta-foothills-cottage-manali",
      description: "Global booking partner"
    },
  ];

  return (
    <section id="booking" className="py-24 px-6 relative overflow-hidden">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-wood-dark/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
            Reservations
          </span>
          <h2 className="text-white font-display text-4xl md:text-6xl mb-6">Secure Your Mountain Escape</h2>
          <p className="text-warm-beige/70 font-serif italic text-xl mb-16 max-w-2xl mx-auto">
            Choose your preferred platform to book your stay at Hamta Foothills Cottage. We look forward to welcoming you.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {bookingPlatforms.map((platform, i) => (
              <motion.a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-3xl group transition-all hover:bg-white/10 hover:border-gold-accent/50"
              >
                <div className={cn("w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg", platform.color)}>
                  {platform.icon}
                </div>
                <h3 className="text-white text-2xl font-display mb-2">{platform.name}</h3>
                <p className="text-warm-beige/50 text-sm mb-8">{platform.description}</p>
                <div className="inline-flex items-center gap-2 text-gold-accent font-bold uppercase tracking-widest text-xs group-hover:text-white transition-colors">
                  Book Now <ChevronRight size={14} />
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-20 p-10 border border-gold-accent/20 rounded-3xl bg-gold-accent/5">
            <p className="text-warm-beige text-lg font-serif italic mb-4">"All in all great place to stay highly recommended."</p>
            <div className="flex justify-center gap-1 text-gold-accent">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-xs uppercase tracking-widest text-gold-accent font-bold mt-4 block">— Amit A.</span>
          </div>
          <div className="mt-20 p-10 border border-gold-accent/20 rounded-3xl bg-gold-accent/5">
            <p className="text-warm-beige text-lg font-serif italic mb-4">"Best view from the room and hotel staff is very polite and helpful ❤️."</p>
            <div className="flex justify-center gap-1 text-gold-accent">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-xs uppercase tracking-widest text-gold-accent font-bold mt-4 block">— Tikam T.</span>
          </div>
          <div className="mt-20 p-10 border border-gold-accent/20 rounded-3xl bg-gold-accent/5">
            <p className="text-warm-beige text-lg font-serif italic mb-4">"Best cottage to stay in manali, peaceful environment and rooms are comfortable and clean. River view from balcony is beautiful, easy to access anywhere from there. Love the stay."</p>
            <div className="flex justify-center gap-1 text-gold-accent">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-xs uppercase tracking-widest text-gold-accent font-bold mt-4 block">— Ved P.</span>
          </div>
          <div className="mt-20 p-10 border border-gold-accent/20 rounded-3xl bg-gold-accent/5">
            <p className="text-warm-beige text-lg font-serif italic mb-4">"Very nice and tranquil stay with beautiful water stream beside the cottage.. Very pleasant, clean rooms, very cooperative staff and food quality is the best. ❤️ Hamta Foothills."</p>
            <div className="flex justify-center gap-1 text-gold-accent">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-xs uppercase tracking-widest text-gold-accent font-bold mt-4 block">— Karan B.</span>
          </div>
          <div className="mt-20 p-10 border border-gold-accent/20 rounded-3xl bg-gold-accent/5">
            <p className="text-warm-beige text-lg font-serif italic mb-4">"Beautiful place with river view and peaceful place. Hospitality was very good, food is also good and staff was very friendly and room was very neat and clean."</p>
            <div className="flex justify-center gap-1 text-gold-accent">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-xs uppercase tracking-widest text-gold-accent font-bold mt-4 block">— Aman K.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-wood-dark text-warm-beige py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <span className="font-display text-3xl tracking-wider font-bold text-gold-accent block mb-2">
              HAMTA FOOTHILLS
            </span>
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-white/60 block mb-6">
              Luxury Mountain Cottage
            </span>
            <p className="max-w-md text-warm-beige/60 leading-relaxed">
              Experience the true essence of Himalayan hospitality. Our cottage in Prini offers a blend of traditional architecture and modern luxury for an unforgettable stay.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm opacity-60">
              <li><a href="#home" className="hover:text-gold-accent transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-gold-accent transition-colors">About Us</a></li>
              <li><a href="#gallery" className="hover:text-gold-accent transition-colors">Gallery</a></li>
              <li><a href="#booking" className="hover:text-gold-accent transition-colors">Booking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold-accent hover:text-wood-dark transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold-accent hover:text-wood-dark transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4 text-[10px] uppercase tracking-widest opacity-40">
          <span>© 2026 Hamta Foothills Cottage. All Rights Reserved.</span>
          <span>Designed with Love in the Himalayas</span>
        </div>
      </div>
    </footer>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[200] bg-wood-dark flex flex-col items-center justify-center"
    >
      <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
  className="text-gold-accent mb-8"
>
  <img
    src="/favicon.png"
    alt="Logo"
    className="w-20 h-20 object-contain"
  />
</motion.div>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        className="h-[1px] bg-gold-accent/30 relative"
      >
        <motion.div 
          animate={{ x: [0, 200, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-0 left-0 h-full w-10 bg-gold-accent"
        />
      </motion.div>
      <span className="mt-4 text-gold-accent text-[10px] uppercase tracking-[0.5em] font-bold">
        Hamta Foothills
      </span>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <Hero />
          <About />
          <Dining />
          <Gallery />
          <Location />
          <Booking />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
