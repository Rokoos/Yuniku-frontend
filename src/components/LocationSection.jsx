import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";

const LocationSection = () => {
  const { t } = useLanguage();

  const contactInfo = {
    address: "Nałęczowska 62, 02-922 Warszawa",
    phone: "+48 538 423 682",
    hours: {
      weekdays: "11:00 - 22:00",
      weekend: "12:00 - 23:00",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]"
      data-testid="location-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2F23] mb-4 brush-decoration">
            {t("location.title")}
          </h2>
          <p className="font-body text-base sm:text-lg text-[#A3A3A3] max-w-2xl mx-auto mt-8">
            {t("location.subtitle")}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="map-container h-[300px] sm:h-[400px] lg:h-full min-h-[400px]"
            data-testid="location-map"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2446.8!2d21.0089!3d52.1756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47192d2b7d07f0e9%3A0x0!2sNa%C5%82%C4%99czowska%2062%2C%2002-922%20Warszawa!5e0!3m2!1spl!2spl!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokalizacja YUNIKU Ramen"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6 sm:p-8 space-y-6">
                {/* Address */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-start gap-4"
                  data-testid="contact-address"
                >
                  <div className="w-12 h-12 rounded-full bg-[#1A2F23]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#C2410C]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-[#1A2F23] mb-1">
                      {t("location.address")}
                    </h3>
                    <p className="font-body text-sm text-[#A3A3A3]">
                      {contactInfo.address}
                    </p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-start gap-4"
                  data-testid="contact-phone"
                >
                  <div className="w-12 h-12 rounded-full bg-[#1A2F23]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#C2410C]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-[#1A2F23] mb-1">
                      {t("location.phone")}
                    </h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="font-body text-sm text-[#A3A3A3] hover:text-[#C2410C] transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </motion.div>

                {/* Hours */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-start gap-4"
                  data-testid="contact-hours"
                >
                  <div className="w-12 h-12 rounded-full bg-[#1A2F23]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#C2410C]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-[#1A2F23] mb-1">
                      {t("location.hours")}
                    </h3>
                    <div className="space-y-1">
                      <p className="font-body text-sm text-[#A3A3A3]">
                        <span className="text-[#1A2F23]">
                          {t("location.weekdays")}
                        </span>{" "}
                        {contactInfo.hours.weekdays}
                      </p>
                      <p className="font-body text-sm text-[#A3A3A3]">
                        <span className="text-[#1A2F23]">
                          {t("location.weekend")}
                        </span>{" "}
                        {contactInfo.hours.weekend}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Additional Note */}
            {/* <motion.p
              variants={itemVariants}
              className="font-body text-sm text-[#A3A3A3] text-center mt-6"
            >
              {t("location.reservationNote")}
            </motion.p> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
