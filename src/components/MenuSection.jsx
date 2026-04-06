import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageContext";

const MenuSection = () => {
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 1,
      key: "tonkotsu",
      price: 45,
      image: "https://images.unsplash.com/photo-1584973544695-07da66d42318?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxkZWxpY2lvdXMlMjByYW1lbiUyMGJvd2wlMjBhdXRoZW50aWN8ZW58MHx8fHwxNzcwMjM5ODMxfDA&ixlib=rb-4.1.0&q=85",
      spicy: 1,
      popular: true,
    },
    {
      id: 2,
      key: "miso",
      price: 42,
      image: "https://images.unsplash.com/photo-1609655523500-7b9d1dd81447?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxkZWxpY2lvdXMlMjByYW1lbiUyMGJvd2wlMjBhdXRoZW50aWN8ZW58MHx8fHwxNzcwMjM5ODMxfDA&ixlib=rb-4.1.0&q=85",
      spicy: 0,
      popular: false,
    },
    {
      id: 3,
      key: "tantanmen",
      price: 48,
      image: "https://images.unsplash.com/photo-1700625914525-54dba25d2125?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZ1c2lvbiUyMGZvb2QlMjBwbGF0dGVyfGVufDB8fHx8MTc3MDIzOTg0Mnww&ixlib=rb-4.1.0&q=85",
      spicy: 3,
      popular: true,
    },
    {
      id: 4,
      key: "shoyu",
      price: 44,
      image: "https://images.unsplash.com/photo-1704642155498-70b60672f1f3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxkZWxpY2lvdXMlMjByYW1lbiUyMGJvd2wlMjBhdXRoZW50aWN8ZW58MHx8fHwxNzcwMjM5ODMxfDA&ixlib=rb-4.1.0&q=85",
      spicy: 1,
      popular: false,
    },
    {
      id: 5,
      key: "vegan",
      price: 40,
      image: "https://images.unsplash.com/photo-1609655523500-7b9d1dd81447?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxkZWxpY2lvdXMlMjByYW1lbiUyMGJvd2wlMjBhdXRoZW50aWN8ZW58MHx8fHwxNzcwMjM5ODMxfDA&ixlib=rb-4.1.0&q=85",
      spicy: 0,
      popular: false,
    },
    {
      id: 6,
      key: "gyoza",
      price: 28,
      image: "https://images.unsplash.com/photo-1700625914525-54dba25d2125?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZ1c2lvbiUyMGZvb2QlMjBwbGF0dGVyfGVufDB8fHx8MTc3MDIzOTg0Mnww&ixlib=rb-4.1.0&q=85",
      spicy: 0,
      popular: true,
    },
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const renderSpicyLevel = (level) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Flame
        key={i}
        size={14}
        className={i < level ? "text-[#C2410C]" : "text-[#A3A3A3]/30"}
        fill={i < level ? "#C2410C" : "none"}
      />
    ));
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]" data-testid="menu-section">
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
            {t("menu.title")}
          </h2>
          <p className="font-body text-base sm:text-lg text-[#A3A3A3] max-w-2xl mx-auto mt-8">
            {t("menu.subtitle")}
          </p>
        </motion.div>

        {/* Menu Grid - Bento Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="menu-grid"
        >
          {menuItems.map((item) => (
            <motion.div key={item.id} variants={cardVariants}>
              <Card
                className="menu-card overflow-hidden bg-white border-0 shadow-lg h-full"
                data-testid={`menu-item-${item.id}`}
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(`menu.dishes.${item.key}.name`)}
                    className="menu-card-image w-full h-full object-cover"
                    loading="lazy"
                  />
                  {item.popular && (
                    <Badge className="absolute top-4 right-4 bg-[#C2410C] hover:bg-[#C2410C] text-white font-body">
                      {t("menu.popular")}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-5 sm:p-6">
                  {/* Name and Price */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-heading text-xl font-semibold text-[#1A2F23]">
                      {t(`menu.dishes.${item.key}.name`)}
                    </h3>
                    <span className="font-heading text-xl font-bold text-[#C2410C]">
                      {item.price} zł
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm text-[#A3A3A3] mb-4 leading-relaxed">
                    {t(`menu.dishes.${item.key}.description`)}
                  </p>

                  {/* Spicy Level */}
                  <div className="flex items-center gap-2">
                    <span className="font-body text-xs text-[#A3A3A3]">{t("menu.spiciness")}</span>
                    <div className="flex gap-0.5">{renderSpicyLevel(item.spicy)}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Price Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center font-body text-sm text-[#A3A3A3] mt-10"
        >
          {t("menu.priceNote")}
        </motion.p>
      </div>
    </section>
  );
};

export default MenuSection;
