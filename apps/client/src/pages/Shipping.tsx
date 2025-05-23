import { Truck, Clock, MapPin, Package, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shipping Information
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about our shipping policies and delivery
            options.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5 text-primary" />
                Shipping Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Standard Shipping</h3>
                  <p className="text-gray-600">3-5 business days</p>
                  <p className="mt-1 text-sm text-gray-500">
                    $7.99 (Free on orders $100+)
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Express Shipping</h3>
                  <p className="text-gray-600">1-2 business days</p>
                  <p className="mt-1 text-sm text-gray-500">$14.99</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Overnight Shipping</h3>
                  <p className="text-gray-600">Next business day</p>
                  <p className="mt-1 text-sm text-gray-500">$24.99</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-primary" />
                Free Shipping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  Enjoy <strong>free standard shipping</strong> on all orders
                  over $100! This offer applies to:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>• All domestic orders within the United States</li>
                  <li>• Standard shipping method only</li>
                  <li>
                    • Orders that meet the $100 minimum after any discounts
                    applied
                  </li>
                  <li>• Both single items and multiple item orders</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processing Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  Orders are typically processed within 1-2 business days.
                  Processing time may be longer during peak seasons or
                  promotional events.
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Business Days
                    </h4>
                    <p className="text-sm text-gray-600">
                      Monday - Friday (excluding holidays)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Cut-off Time
                    </h4>
                    <p className="text-sm text-gray-600">
                      Orders placed before 2 PM EST ship same day
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="mb-4 text-gray-600">
                  Currently, we ship to all addresses within the United States,
                  including:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Domestic Shipping
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• All 50 states</li>
                      <li>• Washington D.C.</li>
                      <li>• Puerto Rico</li>
                      <li>• U.S. Virgin Islands</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Special Locations
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• P.O. Boxes (Standard shipping only)</li>
                      <li>• Military addresses (APO/FPO)</li>
                      <li>• Alaska and Hawaii (additional fees may apply)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-blue-800">
                    <strong>International Shipping:</strong> We're working on
                    expanding our shipping to international destinations. Stay
                    tuned for updates!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="mb-4 text-gray-600">
                  Track your order every step of the way:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Order Confirmation
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receive confirmation email immediately after placing
                        your order
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Processing
                      </h4>
                      <p className="text-sm text-gray-600">
                        Order is prepared and packaged for shipment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Shipping</h4>
                      <p className="text-sm text-gray-600">
                        Receive tracking number and monitor your package's
                        journey
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Delivery</h4>
                      <p className="text-sm text-gray-600">
                        Package arrives at your doorstep
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                If you have questions about shipping or need to track an order,
                we're here to help:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> shipping@cartverse.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (234) 567-8900
                </p>
                <p>
                  <strong>Hours:</strong> Monday-Friday 9 AM-6 PM EST
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
