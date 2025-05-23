import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I place an order?",
    answer:
      "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase. Follow the step-by-step checkout process to enter your shipping and payment information.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various digital payment methods. All payments are processed securely through Stripe.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days. Express shipping (1-2 business days) and overnight shipping options are also available. Free shipping is offered on orders over $100.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some items like personalized products or perishables cannot be returned. Please see our Returns page for complete details.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'Your Orders' section.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we only ship within the United States. We're working on expanding our shipping to international destinations in the near future.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click the 'Sign Up' button in the top right corner of any page. You'll need to provide your email address and create a password. You can also sign up during the checkout process.",
  },
  {
    question: "Can I modify or cancel my order?",
    answer:
      "You can modify or cancel your order within 1 hour of placing it, as long as it hasn't been processed for shipping. Contact our customer service team immediately if you need to make changes.",
  },
  {
    question: "Are your products authentic?",
    answer:
      "Yes, all products sold on CartVerse are 100% authentic. We work directly with authorized distributors and manufacturers to ensure product authenticity and quality.",
  },
  {
    question: "How do I contact customer service?",
    answer:
      "You can contact us through our Contact page, email us at support@cartverse.com, or call us at +1 (234) 567-8900. Our customer service hours are Monday-Friday 9 AM-6 PM, Saturday 10 AM-4 PM.",
  },
  {
    question: "Do you offer price matching?",
    answer:
      "We strive to offer competitive prices. While we don't have a formal price matching policy, we regularly review our prices to ensure they're fair and competitive in the market.",
  },
  {
    question: "What if I receive a damaged item?",
    answer:
      "If you receive a damaged item, please contact us immediately with photos of the damage. We'll arrange for a replacement or full refund, and we'll cover all return shipping costs for damaged items.",
  },
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to the most common questions about shopping with
            CartVerse.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqData.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer transition-colors hover:bg-gray-50"
                onClick={() => toggleItem(index)}
              >
                <CardTitle className="flex items-center justify-between text-left">
                  <span className="text-lg font-medium">{item.question}</span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </CardTitle>
              </CardHeader>
              {openItems.includes(index) && (
                <CardContent className="pt-0">
                  <p className="leading-relaxed text-gray-600">{item.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 text-lg font-semibold">
                Still have questions?
              </h3>
              <p className="mb-4 text-gray-600">
                Can't find what you're looking for? Our customer service team is
                here to help.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Contact Support
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
