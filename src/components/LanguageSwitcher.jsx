import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const LanguageSwitcher = ({ isScrolled = false }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all font-body text-sm font-medium ${
        isScrolled
          ? "border-[#1A2F23]/20 text-[#1A2F23] hover:bg-[#1A2F23]/5"
          : "border-[#F5F5F5]/30 text-[#F5F5F5] hover:bg-[#F5F5F5]/10"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-testid="language-switcher"
      aria-label={`Switch to ${language === "pl" ? "English" : "Polish"}`}
    >
      <span className={language === "pl" ? "font-bold" : "opacity-50"}>PL</span>
      <span className="opacity-30">|</span>
      <span className={language === "en" ? "font-bold" : "opacity-50"}>EN</span>
    </motion.button>
  );
};

export default LanguageSwitcher;
