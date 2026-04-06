import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/i18n/LanguageContext";

const ReviewsSection = () => {
  const { t, translations, language } = useLanguage();

  const reviews = translations[language].reviews.testimonials;

  const stats = {
    totalReviews: 288,
    averageRating: 4.7,
    happyCustomers: 160,
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "star-filled" : "star-empty"}
        fill={i < rating ? "#D4AF37" : "none"}
      />
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#1A2F23]" data-testid="reviews-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-4">
            {t("reviews.title")}
          </h2>
          <p className="font-body text-base sm:text-lg text-[#A3A3A3] max-w-2xl mx-auto">
            {t("reviews.subtitle")}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-16 mb-16"
          data-testid="reviews-stats"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="font-heading text-4xl sm:text-5xl font-bold text-[#D4AF37]">
                {stats.averageRating}
              </span>
              <Star className="w-8 h-8 text-[#D4AF37]" fill="#D4AF37" />
            </div>
            <p className="font-body text-sm text-[#A3A3A3]">{t("reviews.averageRating")}</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-4xl sm:text-5xl font-bold text-[#F5F5F5] mb-2">
              {stats.totalReviews}
            </p>
            <p className="font-body text-sm text-[#A3A3A3]">{t("reviews.reviewsCount")}</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-4xl sm:text-5xl font-bold text-[#C2410C] mb-2">
              {stats.happyCustomers}+
            </p>
            <p className="font-body text-sm text-[#A3A3A3]">{t("reviews.happyCustomers")}</p>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="reviews-grid"
        >
          {reviews.map((review, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card
                className="review-card h-full border-0"
                data-testid={`review-${index + 1}`}
              >
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-[#C2410C]/30 mb-4" />

                  {/* Review Text */}
                  <p className="font-body text-sm text-[#1A2F23]/80 mb-6 leading-relaxed">
                    "{review.text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 bg-[#1A2F23]">
                      <AvatarFallback className="bg-[#1A2F23] text-[#F5F5F5] font-body text-sm">
                        {review.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-body font-semibold text-sm text-[#1A2F23]">
                        {review.name}
                      </p>
                      <p className="font-body text-xs text-[#A3A3A3]">
                        {review.date}
                      </p>
                    </div>
                    <div className="flex gap-0.5">{renderStars(5)}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
