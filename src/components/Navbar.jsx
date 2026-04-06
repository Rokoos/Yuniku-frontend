import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Facebook, Instagram, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = ({ onMenuClick, onReviewsClick, onLocationClick, onReservationClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("nav.menu"), onClick: onMenuClick },
    { label: t("nav.reviews"), onClick: onReviewsClick },
    { label: t("nav.location"), onClick: onLocationClick },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FDFBF7]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className={`font-heading text-xl sm:text-2xl font-bold transition-colors ${
              isScrolled ? "text-[#1A2F23]" : "text-[#F5F5F5]"
            }`}
            whileHover={{ scale: 1.02 }}
            data-testid="navbar-logo"
          >
            YUNIKU
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`nav-link font-body text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-[#1A2F23] hover:text-[#C2410C]"
                    : "text-[#F5F5F5] hover:text-[#D4AF37]"
                }`}
                data-testid={`nav-item-${index}`}
              >
                {item.label}
              </button>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher isScrolled={isScrolled} />

            {/* Social Links */}
            <div className="flex items-center space-x-3 ml-2">
              <a
                href="https://www.facebook.com/YunikuAsian/"
                target="_blank"
                rel="noopener noreferrer"
                className={`social-link ${
                  isScrolled ? "text-[#1A2F23]" : "text-[#F5F5F5]"
                }`}
                aria-label="Facebook"
                data-testid="social-facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/yuniku_restauracja?fbclid=IwY2xjawPwmclleHRuA2FlbQIxMABzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEehxbiiUhhpAj7v6VdIh8q6jzLu565B2afOCRAWd51wtTQsvo2pwzUN6lI20I_aem_qiy3jdNISic1ePSVUqzZVA"
                target="_blank"
                rel="noopener noreferrer"
                className={`social-link ${
                  isScrolled ? "text-[#1A2F23]" : "text-[#F5F5F5]"
                }`}
                aria-label="Instagram"
                data-testid="social-instagram"
              >
                <Instagram size={18} />
              </a>
            </div>

            {/* Reservation Button */}
            <Button
              onClick={onReservationClick}
              className="ml-2 bg-[#C2410C] hover:bg-[#A3370A] text-white font-body text-sm px-4 py-2 rounded-full"
              data-testid="nav-reservation-button"
            >
              <CalendarCheck size={16} className="mr-2" />
              {t("nav.reservation")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher isScrolled={isScrolled} />
            <Button
              variant="ghost"
              size="icon"
              className={isScrolled ? "text-[#1A2F23]" : "text-[#F5F5F5]"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#FDFBF7] border-t border-[#1A2F23]/10"
            data-testid="mobile-menu"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 font-body text-[#1A2F23] hover:text-[#C2410C] transition-colors"
                  data-testid={`mobile-nav-item-${index}`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Reservation Button */}
              <Button
                onClick={() => {
                  onReservationClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-[#C2410C] hover:bg-[#A3370A] text-white font-body text-sm py-3 rounded-full mt-2"
                data-testid="mobile-reservation-button"
              >
                <CalendarCheck size={16} className="mr-2" />
                {t("nav.reservation")}
              </Button>

              <div className="flex items-center space-x-4 pt-2 border-t border-[#1A2F23]/10">
                <a
                  href="https://www.facebook.com/YunikuAsian/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A2F23] hover:text-[#C2410C] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/yuniku_restauracja?fbclid=IwY2xjawPwmclleHRuA2FlbQIxMABzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEehxbiiUhhpAj7v6VdIh8q6jzLu565B2afOCRAWd51wtTQsvo2pwzUN6lI20I_aem_qiy3jdNISic1ePSVUqzZVA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A2F23] hover:text-[#C2410C] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
