import { BookOpen, Calendar, ArrowRight, PenTool } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const comingSoonPosts = [
    {
      title: "The Future of E-commerce: Trends to Watch",
      excerpt:
        "Exploring emerging technologies and customer expectations shaping online retail.",
      category: "Industry Insights",
      readTime: "5 min read",
    },
    {
      title: "How to Choose Quality Products Online",
      excerpt: "A comprehensive guide to making informed purchasing decisions.",
      category: "Shopping Tips",
      readTime: "3 min read",
    },
    {
      title: "Sustainable Shopping: Making a Difference",
      excerpt:
        "Understanding the impact of our purchasing choices on the environment.",
      category: "Sustainability",
      readTime: "4 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            CartVerse Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Insights, tips, and stories from the world of e-commerce
          </p>
        </div>

        <Card className="mb-12">
          <CardContent className="pb-8 pt-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <PenTool className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Our Blog is Coming Soon!
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600">
              We're working hard to bring you engaging content about e-commerce
              trends, shopping tips, product guides, and industry insights. Stay
              tuned for our launch!
            </p>
            <Button asChild>
              <a href="/contact">
                Get Notified When We Launch
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <div className="mb-12">
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
            What to Expect
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {comingSoonPosts.map((post, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                      {post.category}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              Topics We'll Cover
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">
                  Shopping & Products
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Product reviews and comparisons</li>
                  <li>• Buying guides and recommendations</li>
                  <li>• Seasonal shopping tips</li>
                  <li>• How to spot quality products</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">
                  Industry Insights
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• E-commerce trends and innovations</li>
                  <li>• Technology in retail</li>
                  <li>• Customer experience stories</li>
                  <li>• Market analysis and forecasts</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">
                  Lifestyle & Tips
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Sustainable shopping practices</li>
                  <li>• Budget-friendly shopping strategies</li>
                  <li>• Organization and storage ideas</li>
                  <li>• Gift guides and holiday shopping</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">
                  Behind the Scenes
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Company updates and news</li>
                  <li>• Team spotlights and interviews</li>
                  <li>• Community stories</li>
                  <li>• Partnership announcements</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
