import {
  FileText,
  Calendar,
  User,
  ShoppingCart,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Please read these terms carefully before using our services.
          </p>
          <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            Last updated: January 15, 2024
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-600">
                By accessing and using CartVerse ("the Service," "we," "us," or
                "our"), you agree to be bound by these Terms and Conditions
                ("Terms"). If you do not agree to these Terms, please do not use
                our Service.
              </p>
              <p className="text-gray-600">
                We reserve the right to update these Terms at any time. Changes
                will be effective immediately upon posting. Your continued use
                of the Service after changes are posted constitutes acceptance
                of the new Terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                Use of Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Eligibility
                  </h4>
                  <p className="text-gray-600">
                    You must be at least 18 years old to use our Service. By
                    using our Service, you represent and warrant that you meet
                    this age requirement.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Account Registration
                  </h4>
                  <p className="text-gray-600">
                    To access certain features, you may need to create an
                    account. You are responsible for maintaining the
                    confidentiality of your account credentials and for all
                    activities under your account.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Prohibited Uses
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Using the Service for any unlawful purpose</li>
                    <li>
                      • Attempting to interfere with the Service's security
                      features
                    </li>
                    <li>• Uploading malicious code or harmful content</li>
                    <li>• Impersonating another person or entity</li>
                    <li>• Violating any applicable laws or regulations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5 text-primary" />
                Orders and Purchases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Order Acceptance
                  </h4>
                  <p className="text-gray-600">
                    All orders are subject to acceptance by CartVerse. We
                    reserve the right to refuse or cancel any order for any
                    reason, including limitations on quantities available for
                    purchase, inaccuracies in product descriptions, or suspected
                    fraudulent activity.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">Pricing</h4>
                  <p className="text-gray-600">
                    All prices are displayed in USD and are subject to change
                    without notice. We strive to display accurate pricing, but
                    errors may occur. In case of pricing errors, we reserve the
                    right to correct the price and seek payment of the correct
                    amount or cancel the order.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Product Availability
                  </h4>
                  <p className="text-gray-600">
                    Product availability is subject to change. We do not
                    guarantee that any product will be available at any
                    particular time. If a product becomes unavailable after you
                    place an order, we will notify you and issue a full refund.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-primary" />
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Payment Methods
                  </h4>
                  <p className="text-gray-600">
                    We accept major credit cards, PayPal, and other payment
                    methods as displayed during checkout. Payment must be
                    received before order processing.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Payment Security
                  </h4>
                  <p className="text-gray-600">
                    All payments are processed securely through our payment
                    partners. We do not store your complete payment information
                    on our servers.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">Taxes</h4>
                  <p className="text-gray-600">
                    You are responsible for applicable taxes. Tax amounts will
                    be calculated and displayed during checkout based on your
                    shipping address.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping and Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Shipping terms and delivery timeframes are estimates and not
                guarantees. We are not responsible for delays caused by shipping
                carriers or circumstances beyond our control.
              </p>
              <p className="text-gray-600">
                Risk of loss and title for products purchased pass to you upon
                delivery to the carrier. For complete shipping information,
                please see our Shipping Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  The Service and its original content, features, and
                  functionality are owned by CartVerse and are protected by
                  international copyright, trademark, patent, trade secret, and
                  other intellectual property laws.
                </p>
                <p className="text-gray-600">
                  You may not reproduce, distribute, modify, create derivative
                  works of, publicly display, or otherwise use our content
                  without our express written permission.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Service "As Is"
                  </h4>
                  <p className="text-gray-600">
                    The Service is provided on an "as is" and "as available"
                    basis. We make no warranties, expressed or implied,
                    regarding the Service's reliability, availability, or
                    suitability for your needs.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Limitation of Liability
                  </h4>
                  <p className="text-gray-600">
                    In no event shall CartVerse be liable for any indirect,
                    incidental, special, or consequential damages arising out of
                    or in connection with your use of the Service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your privacy is important to us. Please review our Privacy
                Policy, which also governs your use of the Service, to
                understand our practices regarding the collection and use of
                your information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We may terminate or suspend your access to the Service
                immediately, without prior notice, for any reason, including if
                you breach these Terms. Upon termination, your right to use the
                Service will cease immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance
                with the laws of the State of California, without regard to its
                conflict of law provisions. Any disputes arising under these
                Terms shall be subject to the exclusive jurisdiction of the
                courts in California.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600">
                  If you have questions about these Terms & Conditions, please
                  contact us:
                </p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Email:</strong> legal@cartverse.com
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Commerce St, Shopping City,
                    12345
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (234) 567-8900
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
