import {
  RefreshCw,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Returns = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Returns & Exchanges
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We want you to be completely satisfied with your purchase. Here's
            our easy return policy.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="mr-2 h-5 w-5 text-primary" />
                Return Policy Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">30-Day Window</h3>
                  <p className="text-gray-600">
                    Return items within 30 days of purchase
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Original Condition</h3>
                  <p className="text-gray-600">
                    Items must be unused with tags attached
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Free Returns</h3>
                  <p className="text-gray-600">
                    We cover return shipping costs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Return an Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Initiate Your Return
                    </h4>
                    <p className="text-gray-600">
                      Log into your account and go to "Your Orders" to start a
                      return request. Select the item(s) you'd like to return
                      and provide a reason.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Print Return Label
                    </h4>
                    <p className="text-gray-600">
                      We'll email you a prepaid return shipping label. Print it
                      out and attach it to your package.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Package Your Return
                    </h4>
                    <p className="text-gray-600">
                      Pack the item(s) securely in the original packaging if
                      possible. Include all accessories and documentation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Ship Your Return
                    </h4>
                    <p className="text-gray-600">
                      Drop off your package at any UPS location or schedule a
                      pickup. Keep your tracking receipt for your records.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Receive Your Refund
                    </h4>
                    <p className="text-gray-600">
                      Once we receive and process your return (3-5 business
                      days), your refund will be issued to your original payment
                      method.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Returnable Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Clothing and accessories in original condition</li>
                  <li>• Electronics in original packaging</li>
                  <li>• Home and garden items</li>
                  <li>• Books, movies, and games (unopened)</li>
                  <li>• Jewelry and watches</li>
                  <li>• Sports and outdoor equipment</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <XCircle className="mr-2 h-5 w-5" />
                  Non-Returnable Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Personalized or customized items</li>
                  <li>• Perishable goods and food items</li>
                  <li>• Health and personal care items</li>
                  <li>• Digital downloads and software</li>
                  <li>• Gift cards and vouchers</li>
                  <li>• Items damaged by misuse</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Refund Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Processing Time
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Credit/Debit Cards: 3-5 business days</li>
                    <li>• PayPal: 1-2 business days</li>
                    <li>• Store Credit: Instant</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Refund Method
                  </h4>
                  <p className="text-sm text-gray-600">
                    Refunds are processed to your original payment method. If
                    the original payment method is no longer available, we'll
                    issue store credit.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exchanges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="mb-4 text-gray-600">
                  We don't offer direct exchanges. If you need a different size
                  or color, please return your original item and place a new
                  order for the item you want.
                </p>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> To ensure you get the item you
                    want, place your new order first, then return the original
                    item. This way, you won't miss out if the item goes out of
                    stock.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                Damaged or Defective Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="mb-4 text-gray-600">
                  If you receive a damaged or defective item, please contact us
                  immediately:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Take photos of the damage</li>
                  <li>• Contact us within 48 hours of delivery</li>
                  <li>• We'll provide a prepaid return label</li>
                  <li>• Priority processing for replacement or refund</li>
                </ul>
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong> returns@cartverse.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (234) 567-8900
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Holiday Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Items purchased between November 1st and December 24th can be
                returned until January 31st of the following year. This extended
                return window makes gift-giving worry-free!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Returns;
