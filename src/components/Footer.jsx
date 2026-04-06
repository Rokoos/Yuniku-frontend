import { motion } from "framer-motion";
import { Facebook, Instagram, Heart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] py-12 px-4 sm:px-6 lg:px-8" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Logo */}
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-2">
            YUNIKU
          </h2>
          <p className="font-heading text-sm text-[#D4AF37] italic mb-6">
            Ramen & Asian Fusion
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6 mb-8" data-testid="footer-social">
            <a
              href="https://www.facebook.com/YunikuAsian/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#F5F5F5]/10 flex items-center justify-center text-[#F5F5F5] hover:bg-[#C2410C] hover:text-white transition-all duration-300"
              aria-label="Facebook"
              data-testid="footer-facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/yuniku_restauracja?fbclid=IwY2xjawPwmclleHRuA2FlbQIxMABzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEehxbiiUhhpAj7v6VdIh8q6jzLu565B2afOCRAWd51wtTQsvo2pwzUN6lI20I_aem_qiy3jdNISic1ePSVUqzZVA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#F5F5F5]/10 flex items-center justify-center text-[#F5F5F5] hover:bg-[#C2410C] hover:text-white transition-all duration-300"
              aria-label="Instagram"
              data-testid="footer-instagram"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-[#F5F5F5]/10 mb-6" />

          {/* Copyright */}
          <p className="font-body text-xs text-[#A3A3A3] text-center">
            © {currentYear} YUNIKU Ramen & Asian Fusion. {t("footer.allRights")}
          </p>

          {/* Made with love */}
          <p className="font-body text-xs text-[#A3A3A3] mt-3 flex items-center gap-1">
            {t("footer.madeWith")} <Heart size={12} className="text-[#C2410C]" fill="#C2410C" /> {t("footer.inPoland")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
