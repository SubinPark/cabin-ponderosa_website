import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "cancellation",
    question: "What is your cancellation policy?",
    answer: `Cancellations made 60 or more days before arrival receive a full refund. Cancellations within 60 days forfeit the 50% deposit. Cancellations within 30 days forfeit all payments.

We recommend purchasing travel insurance for added protection.`
  },
  {
    id: "checkin",
    question: "What are the check-in and check-out times?",
    answer: "Standard check-in is at 4:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request at no additional charge, subject to availability. Please contact us to arrange."
  },
  {
    id: "pets",
    question: "Are pets allowed?",
    answer: "Unfortunately, we do not allow pets due to guest allergies. Service animals are welcome. If you have questions about specific circumstances, please contact us directly."
  },
  {
    id: "winter",
    question: "What should I know about winter access?",
    answer: "During snow season (November-March), 4WD or AWD vehicles are recommended. Snow chains may be required. We provide plow service for snowfall of 4+ inches. Shovels and de-icing salt are available on-site. Check road conditions before traveling."
  },
  {
    id: "guests",
    question: "How many guests can stay?",
    answer: "The cabin comfortably sleeps 4-8 guests depending on configuration. Only confirmed guests are allowed on the property. Additional guests beyond the booking must be approved in advance."
  },
  {
    id: "amenities",
    question: "What amenities are included?",
    answer: "Amenities include a fully equipped kitchen, hot tub, wood-burning fireplace, WiFi, smart TV, premium linens, towels, and access to the deck and fire pit. All utilities are included in your stay."
  },
  {
    id: "parking",
    question: "Is there parking available?",
    answer: "Yes, ample parking is available on-site for multiple vehicles. The cabin is located on a private property with dedicated parking areas."
  },
  {
    id: "activities",
    question: "What activities are nearby?",
    answer: "The cabin is surrounded by outdoor activities including hiking, fishing, swimming at nearby lakes (Blue Lake Springs, Lake Alpine), skiing (Bear Valley), and exploring state parks (Calaveras Big Trees). Arnold town is just 5 minutes away for dining and shopping."
  }
];

export function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full space-y-4">
      {faqItems.map((item) => (
        <div key={item.id} className="border border-border rounded-none overflow-hidden">
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/5 transition-colors text-left"
          >
            <h4 className="font-medium text-foreground pr-4">{item.question}</h4>
            <ChevronDown
              className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                openId === item.id ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {openId === item.id && (
            <div className="px-6 py-4 bg-secondary/5 border-t border-border">
              <div className="text-sm text-muted-foreground font-light leading-relaxed whitespace-pre-wrap">
                {item.answer}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
