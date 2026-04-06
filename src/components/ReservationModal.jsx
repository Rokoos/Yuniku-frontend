import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  Users,
  Phone,
  User,
  Mail,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/i18n/LanguageContext";

// EmailJS Configuration - REPLACE THESE WITH YOUR ACTUAL VALUES
// 1. Create account at https://www.emailjs.com/
// 2. Add Email Service (Gmail, Outlook, etc.)
// 3. Create 2 templates: one for restaurant, one for customer
// 4. Get your Public Key from Account > General
const EMAILJS_CONFIG = {
  SERVICE_ID: "YOUR_SERVICE_ID", // e.g., "service_abc123"
  TEMPLATE_RESTAURANT: "YOUR_TEMPLATE_ID_RESTAURANT", // Template for restaurant notification
  TEMPLATE_CUSTOMER: "YOUR_TEMPLATE_ID_CUSTOMER", // Template for customer confirmation
  PUBLIC_KEY: "YOUR_PUBLIC_KEY", // e.g., "AbCdEfGhIjKlMnOp"
  RESTAURANT_EMAIL: "test@test.com", // Restaurant email address
  RESTAURANT_NAME: "YUNIKU Ramen & Asian Fusion",
  RESTAURANT_ADDRESS: "Nałęczowska 62, 02-922 Warszawa",
  RESTAURANT_PHONE: "+48 538 423 682",
};

const ReservationModal = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeSlots = [
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];

  const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8+"];

  const getGuestLabel = (num) => {
    if (num === "1") return `1 ${t("reservation.person")}`;
    if (num === "8+") return `8+ ${t("reservation.people5plus")}`;
    const n = parseInt(num);
    if (n >= 2 && n <= 4) return `${num} ${t("reservation.people234")}`;
    return `${num} ${t("reservation.people5plus")}`;
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "pl" ? "pl-PL" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.guests
    ) {
      toast.error(t("reservation.errorEmpty"));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(
        language === "pl"
          ? "Podaj prawidłowy adres email"
          : "Please enter a valid email address",
      );
      return;
    }

    setIsSubmitting(true);

    // Generate confirmation number
    const confirmationNumber = `YNK-${Date.now().toString(36).toUpperCase()}`;
    const formattedDate = formatDate(formData.date);

    try {
      // Check if EmailJS is configured
      if (EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID") {
        // MOCKUP MODE - EmailJS not configured yet
        console.log(
          "📧 [MOCKUP] EmailJS not configured. Simulating email send...",
        );
        console.log("📧 Restaurant notification:", {
          to: EMAILJS_CONFIG.RESTAURANT_EMAIL,
          confirmation: confirmationNumber,
          customer: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formattedDate,
          time: formData.time,
          guests: formData.guests,
        });
        console.log("📧 Customer confirmation:", {
          to: formData.email,
          confirmation: confirmationNumber,
          restaurant: EMAILJS_CONFIG.RESTAURANT_NAME,
        });

        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.info(
          language === "pl"
            ? "MOCKUP: Skonfiguruj EmailJS aby wysyłać prawdziwe emaile"
            : "MOCKUP: Configure EmailJS to send real emails",
          { duration: 5000 },
        );
      } else {
        // PRODUCTION MODE - Send actual emails via EmailJS

        // Email parameters for restaurant
        const restaurantParams = {
          to_email: EMAILJS_CONFIG.RESTAURANT_EMAIL,
          confirmation_number: confirmationNumber,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          reservation_date: formattedDate,
          reservation_time: formData.time,
          number_of_guests: formData.guests,
        };

        // Email parameters for customer
        const customerParams = {
          to_email: formData.email,
          to_name: formData.name,
          confirmation_number: confirmationNumber,
          reservation_date: formattedDate,
          reservation_time: formData.time,
          number_of_guests: formData.guests,
          restaurant_name: EMAILJS_CONFIG.RESTAURANT_NAME,
          restaurant_address: EMAILJS_CONFIG.RESTAURANT_ADDRESS,
          restaurant_phone: EMAILJS_CONFIG.RESTAURANT_PHONE,
        };

        // Send email to restaurant
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_RESTAURANT,
          restaurantParams,
          EMAILJS_CONFIG.PUBLIC_KEY,
        );

        // Send confirmation email to customer
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_CUSTOMER,
          customerParams,
          EMAILJS_CONFIG.PUBLIC_KEY,
        );
      }

      setIsSuccess(true);
      toast.success(
        language === "pl"
          ? "Rezerwacja została przyjęta!"
          : "Reservation confirmed!",
      );

      // Reset form after 2.5 seconds and close modal
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
        });
        setIsSuccess(false);
        onClose();
      }, 2500);
    } catch (error) {
      console.error("Email send error:", error);
      toast.error(t("reservation.errorGeneral"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
          data-testid="reservation-modal-backdrop"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md bg-[#FDFBF7] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            data-testid="reservation-modal"
          >
            {/* Header */}
            <div className="bg-[#1A2F23] px-6 py-5 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-xl font-bold text-[#F5F5F5]">
                    {t("reservation.title")}
                  </h2>
                  <p className="font-body text-sm text-[#A3A3A3] mt-1">
                    {t("reservation.subtitle")}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F5F5F5] hover:bg-white/20 transition-colors"
                  data-testid="reservation-modal-close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[#1A2F23] mb-2">
                    {t("reservation.successTitle")}
                  </h3>
                  <p className="font-body text-sm text-[#A3A3A3] text-center">
                    {t("reservation.successMessage")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="font-body text-sm text-[#1A2F23]"
                    >
                      {t("reservation.name")}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3]" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={t("reservation.namePlaceholder")}
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 font-body bg-white border-[#1A2F23]/20 focus:border-[#C2410C] focus:ring-[#C2410C]"
                        data-testid="reservation-name-input"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="font-body text-sm text-[#1A2F23]"
                    >
                      {t("reservation.email")}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3]" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("reservation.emailPlaceholder")}
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 font-body bg-white border-[#1A2F23]/20 focus:border-[#C2410C] focus:ring-[#C2410C]"
                        data-testid="reservation-email-input"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="font-body text-sm text-[#1A2F23]"
                    >
                      {t("reservation.phone")}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3]" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={t("reservation.phonePlaceholder")}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 font-body bg-white border-[#1A2F23]/20 focus:border-[#C2410C] focus:ring-[#C2410C]"
                        data-testid="reservation-phone-input"
                      />
                    </div>
                  </div>

                  {/* Date and Time Row */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="date"
                        className="font-body text-sm text-[#1A2F23]"
                      >
                        {t("reservation.date")}
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3] pointer-events-none z-10" />
                        {!formData.date && (
                          <span className="absolute left-10 top-1/2 -translate-y-1/2 text-[#A3A3A3] font-body text-sm pointer-events-none z-10">
                            dd / mm / yyyy
                          </span>
                        )}
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          min={today}
                          value={formData.date}
                          onChange={handleInputChange}
                          onClick={(e) => e.currentTarget.showPicker()}
                          // className="pl-10 font-body bg-white border-[#1A2F23]/20 focus:border-[#C2410C] focus:ring-[#C2410C]"
                          className={`pl-10 font-body bg-white border-[#1A2F23]/20 focus:border-[#C2410C] focus:ring-[#C2410C] ${!formData.date ? "text-transparent" : "text-inherit"}`}
                          data-testid="reservation-date-input"
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="time"
                        className="font-body text-sm text-[#1A2F23]"
                      >
                        {t("reservation.time")}
                      </Label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) =>
                          handleSelectChange("time", value)
                        }
                      >
                        <SelectTrigger
                          className="font-body bg-white border-[#1A2F23]/20 focus:border-[#C2410C] focus:ring-[#C2410C]"
                          data-testid="reservation-time-select"
                        >
                          <Clock className="w-4 h-4 text-[#A3A3A3] mr-2" />
                          <SelectValue
                            placeholder={t("reservation.timePlaceholder")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem
                              key={time}
                              value={time}
                              className="font-body"
                            >
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="guests"
                      className="font-body text-sm text-[#1A2F23]"
                    >
                      {t("reservation.guests")}
                    </Label>
                    <Select
                      value={formData.guests}
                      onValueChange={(value) =>
                        handleSelectChange("guests", value)
                      }
                    >
                      <SelectTrigger
                        className="font-body bg-white border-[#1A2F23]/20 focus:border-[#C2410C] focus:ring-[#C2410C]"
                        data-testid="reservation-guests-select"
                      >
                        <Users className="w-4 h-4 text-[#A3A3A3] mr-2" />
                        <SelectValue
                          placeholder={t("reservation.guestsPlaceholder")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {guestOptions.map((num) => (
                          <SelectItem
                            key={num}
                            value={num}
                            className="font-body"
                          >
                            {getGuestLabel(num)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-6 font-body font-semibold rounded-xl mt-6"
                    data-testid="reservation-submit-button"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t("reservation.submitting")}
                      </>
                    ) : (
                      t("reservation.submit")
                    )}
                  </Button>

                  <p className="font-body text-xs text-[#A3A3A3] text-center mt-4">
                    {t("reservation.confirmNote")}
                  </p>

                  {/* Phone reservation option */}
                  <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-[#1A2F23]/10">
                    <span className="font-body text-xs text-[#A3A3A3]">
                      {t("reservation.orCallUs")}
                    </span>
                    <a
                      href="tel:+48538423682"
                      className="font-body text-sm font-semibold text-[#C2410C] hover:underline"
                      data-testid="reservation-phone-link"
                    >
                      +48 538 423 682
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;
