import { Users, Target, Shield, Heart, Award, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "We prioritize your security with SSL encryption and secure payment processing.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your satisfaction is our top priority. We're here to help every step of the way.",
    },
    {
      icon: Award,
      title: "Quality Products",
      description:
        "We partner with trusted brands to bring you only the highest quality products.",
    },
    {
      icon: Globe,
      title: "Innovation",
      description:
        "We continuously improve our platform to provide the best shopping experience.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "20 years experience in e-commerce and retail technology.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description:
        "Former tech lead at major e-commerce platforms, passionate about user experience.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Success",
      description:
        "Dedicated to ensuring every customer has an exceptional shopping experience.",
    },
    {
      name: "David Kim",
      role: "VP of Operations",
      description:
        "Logistics expert focused on fast, reliable delivery and inventory management.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            About CartVerse
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-white/90">
            We're on a mission to create the most trusted and convenient online
            shopping destination, where quality meets affordability and customer
            satisfaction is our top priority.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Our Story
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  Founded in 2023, CartVerse began with a simple vision: to
                  create an online marketplace that puts customers first. We
                  noticed that many e-commerce platforms prioritized quantity
                  over quality, leaving customers frustrated with poor service
                  and subpar products.
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  Our founders, coming from backgrounds in retail, technology,
                  and customer service, decided to build something different.
                  CartVerse was born from the belief that online shopping should
                  be trustworthy, enjoyable, and accessible to everyone.
                </p>
                <p className="text-lg leading-relaxed text-gray-600">
                  Today, we're proud to serve thousands of customers nationwide,
                  offering carefully curated products from trusted brands,
                  backed by exceptional customer service and our commitment to
                  your satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Our Values
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {value.title}
                        </h3>
                        <p className="mt-2 text-gray-600">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Target className="mr-2 h-6 w-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="mb-4 text-xl font-medium text-gray-700">
                    "To democratize access to quality products while building
                    lasting relationships with our customers through trust,
                    transparency, and exceptional service."
                  </p>
                  <p className="text-gray-600">
                    We believe that everyone deserves access to high-quality
                    products at fair prices, backed by customer service that
                    actually cares about your experience.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Meet Our Team
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                The passionate people behind CartVerse
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {team.map((member, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Users className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="font-medium text-primary">{member.role}</p>
                      <p className="mt-2 text-sm text-gray-600">
                        {member.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Why Choose CartVerse?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 text-center md:grid-cols-3">
                <div>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Secure Shopping</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    SSL encryption and secure payment processing protect your
                    information.
                  </p>
                </div>
                <div>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Quality Guarantee</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Every product is carefully vetted to meet our high
                    standards.
                  </p>
                </div>
                <div>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Customer Care</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Dedicated support team ready to help with any questions or
                    concerns.
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

export default About;
