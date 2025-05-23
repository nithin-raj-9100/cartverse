import {
  Briefcase,
  Users,
  Heart,
  Zap,
  Coffee,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Careers = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description:
        "Comprehensive health insurance, dental, vision, and wellness programs.",
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description:
        "Flexible working hours, remote work options, and unlimited PTO.",
    },
    {
      icon: Zap,
      title: "Growth & Development",
      description:
        "Learning stipends, conference attendance, and career development programs.",
    },
    {
      icon: Users,
      title: "Great Team",
      description:
        "Collaborative culture with amazing colleagues who support each other.",
    },
  ];

  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description:
        "Join our engineering team to build amazing user experiences with React, TypeScript, and modern web technologies.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote / New York",
      type: "Full-time",
      description:
        "Drive product strategy and roadmap for our e-commerce platform, working closely with engineering and design teams.",
    },
    {
      title: "Customer Success Specialist",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description:
        "Help our customers succeed by providing exceptional support and building lasting relationships.",
    },
    {
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "Remote / Los Angeles",
      type: "Full-time",
      description:
        "Support our marketing initiatives across digital channels, content creation, and campaign management.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Join Our Team
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-white/90">
            Help us build the future of e-commerce. We're looking for passionate
            people who want to make a difference in how people shop online.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Why CartVerse?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We're building something special, and we want you to be part of
                it.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {benefit.title}
                        </h3>
                        <p className="mt-2 text-gray-600">
                          {benefit.description}
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
                <CardTitle className="text-center text-2xl">
                  Our Culture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-center">
                  <p className="mb-6 text-lg leading-relaxed text-gray-600">
                    At CartVerse, we believe that great products come from great
                    teams. We foster a culture of collaboration, innovation, and
                    continuous learning where everyone's ideas are valued.
                  </p>
                  <div className="grid gap-6 text-left md:grid-cols-3">
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-900">
                        Innovation First
                      </h4>
                      <p className="text-sm text-gray-600">
                        We encourage experimentation and aren't afraid to try
                        new approaches to solve problems.
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-900">
                        Customer Obsessed
                      </h4>
                      <p className="text-sm text-gray-600">
                        Every decision we make is guided by how it will impact
                        our customers' experience.
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-900">
                        Team Success
                      </h4>
                      <p className="text-sm text-gray-600">
                        We win together and support each other to achieve both
                        personal and company goals.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Open Positions
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Find your next opportunity with us.
              </p>
            </div>
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center space-x-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {position.title}
                          </h3>
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            {position.department}
                          </span>
                        </div>
                        <div className="mb-3 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {position.location}
                          </span>
                          <span>{position.type}</span>
                        </div>
                        <p className="text-gray-600">{position.description}</p>
                      </div>
                      <Button className="ml-6">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Briefcase className="mr-2 h-6 w-6 text-primary" />
                Don't See the Right Role?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-gray-600">
                We're always looking for talented people to join our team. Even
                if you don't see a specific role that matches your skills, we'd
                love to hear from you.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Send us your resume and a note about what you're passionate
                  about. We'll keep you in mind for future opportunities that
                  align with your interests and expertise.
                </p>
                <Button asChild>
                  <a href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Perks & Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Compensation & Benefits
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Competitive salary and equity packages</li>
                      <li>
                        • Comprehensive health, dental, and vision insurance
                      </li>
                      <li>• 401(k) retirement plan with company matching</li>
                      <li>• Flexible PTO and paid holidays</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Work Environment
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Remote-first culture with flexible hours</li>
                      <li>• Modern office spaces in key cities</li>
                      <li>• Top-tier equipment and tools</li>
                      <li>• Regular team events and offsites</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Growth & Development
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• $2,000 annual learning and development budget</li>
                      <li>• Conference and workshop attendance</li>
                      <li>• Mentorship and career coaching</li>
                      <li>• Internal mobility and growth opportunities</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Life & Wellness
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        • Wellness stipend for gym, fitness, mental health
                      </li>
                      <li>• Parental leave and family support</li>
                      <li>• Employee assistance programs</li>
                      <li>• Volunteer time off</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
