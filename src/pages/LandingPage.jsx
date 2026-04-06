import { useRef, useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import ReviewsSection from "@/components/ReviewsSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReservationModal from "@/components/ReservationModal";

const LandingPage = () => {
  const menuRef = useRef(null);
  const reviewsRef = useRef(null);
  const locationRef = useRef(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FDFBF7] grain-overlay"
      data-testid="landing-page"
    >
      <Navbar 
        onMenuClick={() => scrollToSection(menuRef)}
        onReviewsClick={() => scrollToSection(reviewsRef)}
        onLocationClick={() => scrollToSection(locationRef)}
        onReservationClick={() => setIsReservationOpen(true)}
      />
      <HeroSection 
        onMenuClick={() => scrollToSection(menuRef)} 
        onReservationClick={() => setIsReservationOpen(true)}
      />
      <div ref={menuRef}>
        <MenuSection />
      </div>
      <div ref={reviewsRef}>
        <ReviewsSection />
      </div>
      <div ref={locationRef}>
        <LocationSection />
      </div>
      <Footer />
      
      {/* Reservation Modal */}
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
      />
    </motion.div>
  );
};

export default LandingPage;
