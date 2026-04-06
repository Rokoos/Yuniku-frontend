import { motion } from "framer-motion";
import { Star, Clock, Users, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = ({ onMenuClick, onReservationClick }) => {
  const { t } = useLanguage();
  const heroImage = "https://images.unsplash.com/photo-1704642155498-70b60672f1f3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxkZWxpY2lvdXMlMjByYW1lbiUyMGJvd2wlMjBhdXRoZW50aWN8ZW58MHx8fHwxNzcwMjM5ODMxfDA&ixlib=rb-4.1.0&q=85";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="hero-section relative" data-testid="hero-section">
      {/* Background Image */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroImage})` }}
        data-testid="hero-background"
      />
      
      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6"
        >
          <Star className="w-4 h-4 text-[#D4AF37]" fill="#D4AF37" />
          <span className="text-[#F5F5F5] text-sm font-body">
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-4 leading-tight"
          data-testid="hero-title"
        >
          YUNIKU
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-heading text-lg sm:text-xl text-[#D4AF37] italic mb-6"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="font-body text-base sm:text-lg text-[#F5F5F5]/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          data-testid="hero-description"
        >
          {t("hero.description")}
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10"
        >
          <div className="flex items-center gap-2 text-[#F5F5F5]">
            <Clock className="w-5 h-5 text-[#C2410C]" />
            <span className="font-body text-sm">{t("hero.openFrom")}</span>
          </div>
          <div className="flex items-center gap-2 text-[#F5F5F5]">
            <Users className="w-5 h-5 text-[#C2410C]" />
            <span className="font-body text-sm">{t("hero.happyCustomers")}</span>
          </div>
          <div className="flex items-center gap-2 text-[#F5F5F5]">
            <span className="font-body text-sm font-semibold text-[#D4AF37]">{t("hero.priceRange")}</span>
            <span className="font-body text-sm">{t("hero.perPerson")}</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onMenuClick}
            className="btn-primary px-8 py-6 text-base font-body font-semibold rounded-full"
            data-testid="hero-cta-button"
          >
            {t("hero.viewMenu")}
          </Button>
          <Button
            onClick={onReservationClick}
            variant="outline"
            className="px-8 py-6 text-base font-body font-semibold rounded-full border-2 border-[#F5F5F5] text-[#F5F5F5] bg-transparent hover:bg-[#F5F5F5] hover:text-[#1A2F23] transition-all"
            data-testid="hero-reservation-button"
          >
            <CalendarCheck className="w-5 h-5 mr-2" />
            {t("hero.bookTable")}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
