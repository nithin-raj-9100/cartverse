import {
  Shield,
  Eye,
  Database,
  Cookie,
  Lock,
  Mail,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
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
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Privacy Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                At CartVerse, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our website and services.
              </p>
              <p className="text-gray-600">
                By using our Service, you agree to the collection and use of
                information in accordance with this policy. We will not use or
                share your information with anyone except as described in this
                Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 font-semibold text-gray-900">
                    Personal Information
                  </h4>
                  <p className="mb-2 text-gray-600">
                    We may collect the following personal information:
                  </p>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      • Name and contact information (email, phone, address)
                    </li>
                    <li>• Account credentials (username, password)</li>
                    <li>
                      • Payment information (credit card details, billing
                      address)
                    </li>
                    <li>• Shipping and delivery information</li>
                    <li>• Purchase history and preferences</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-gray-900">
                    Automatically Collected Information
                  </h4>
                  <p className="mb-2 text-gray-600">
                    We automatically collect certain information when you use
                    our Service:
                  </p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• IP address and device information</li>
                    <li>• Browser type and version</li>
                    <li>• Operating system</li>
                    <li>• Pages viewed and time spent on our site</li>
                    <li>• Referring website</li>
                    <li>• Location data (with your permission)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-gray-900">
                    Cookies and Tracking Technologies
                  </h4>
                  <p className="text-gray-600">
                    We use cookies and similar tracking technologies to enhance
                    your experience, analyze usage patterns, and provide
                    personalized content. You can control cookie settings
                    through your browser preferences.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  We use the collected information for the following purposes:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="mb-2 font-semibold text-gray-900">
                      Service Operations
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Process and fulfill orders</li>
                      <li>• Manage your account</li>
                      <li>• Provide customer support</li>
                      <li>• Send order confirmations and updates</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="mb-2 font-semibold text-gray-900">
                      Communication
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Send promotional emails (with consent)</li>
                      <li>• Notify about policy changes</li>
                      <li>• Respond to inquiries</li>
                      <li>• Send security alerts</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="mb-2 font-semibold text-gray-900">
                      Improvement
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Analyze usage patterns</li>
                      <li>• Improve our services</li>
                      <li>• Develop new features</li>
                      <li>• Personalize user experience</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="mb-2 font-semibold text-gray-900">
                      Legal Compliance
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Comply with legal obligations</li>
                      <li>• Prevent fraud and abuse</li>
                      <li>• Enforce our terms of service</li>
                      <li>• Protect user safety</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information only in the
                  following circumstances:
                </p>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      Service Providers
                    </h5>
                    <p className="text-sm text-gray-600">
                      We may share information with trusted third-party service
                      providers who help us operate our business (payment
                      processors, shipping companies, email services).
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      Legal Requirements
                    </h5>
                    <p className="text-sm text-gray-600">
                      We may disclose information if required by law, court
                      order, or to protect our rights, property, or safety.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      Business Transfers
                    </h5>
                    <p className="text-sm text-gray-600">
                      In the event of a merger, acquisition, or sale of assets,
                      your information may be transferred as part of the
                      transaction.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      With Your Consent
                    </h5>
                    <p className="text-sm text-gray-600">
                      We may share information for any other purpose with your
                      explicit consent.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5 text-primary" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="mb-2 font-semibold text-gray-900">
                      Technical Measures
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• SSL/TLS encryption</li>
                      <li>• Secure payment processing</li>
                      <li>• Regular security audits</li>
                      <li>• Access controls and authentication</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="mb-2 font-semibold text-gray-900">
                      Organizational Measures
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Employee training on data protection</li>
                      <li>• Limited access to personal data</li>
                      <li>• Data retention policies</li>
                      <li>• Incident response procedures</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-yellow-50 p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> While we strive to protect your
                    information, no method of transmission over the Internet or
                    electronic storage is 100% secure. We cannot guarantee
                    absolute security.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cookie className="mr-2 h-5 w-5 text-primary" />
                Cookies and Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  We use cookies and similar technologies to improve your
                  experience on our website:
                </p>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      Essential Cookies
                    </h5>
                    <p className="text-sm text-gray-600">
                      Required for the website to function properly (login
                      sessions, shopping cart, security features).
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      Analytics Cookies
                    </h5>
                    <p className="text-sm text-gray-600">
                      Help us understand how visitors use our website to improve
                      functionality and user experience.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      Marketing Cookies
                    </h5>
                    <p className="text-sm text-gray-600">
                      Used to provide personalized content and advertisements
                      based on your interests.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  You can control cookie preferences through your browser
                  settings. Disabling certain cookies may affect website
                  functionality.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  You have the following rights regarding your personal
                  information:
                </p>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      Access and Portability
                    </h5>
                    <p className="text-sm text-gray-600">
                      Request a copy of the personal information we hold about
                      you.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Correction</h5>
                    <p className="text-sm text-gray-600">
                      Request correction of inaccurate or incomplete
                      information.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Deletion</h5>
                    <p className="text-sm text-gray-600">
                      Request deletion of your personal information (subject to
                      legal requirements).
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Opt-out</h5>
                    <p className="text-sm text-gray-600">
                      Unsubscribe from marketing communications at any time.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  To exercise these rights, please contact us using the
                  information provided below.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We retain your personal information only as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, comply
                with legal obligations, resolve disputes, and enforce
                agreements. When information is no longer needed, we securely
                delete or anonymize it.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our Service is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13. If you become aware that a child has provided personal
                information, please contact us so we can take appropriate
                action.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new Privacy
                Policy on this page and updating the "Last updated" date. We
                encourage you to review this Privacy Policy periodically.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600">
                  If you have questions about this Privacy Policy or our data
                  practices, please contact us:
                </p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Email:</strong> privacy@cartverse.com
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Commerce St, Shopping City,
                    12345
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (234) 567-8900
                  </p>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  We will respond to your inquiry within 30 days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
