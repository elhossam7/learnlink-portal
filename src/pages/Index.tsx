import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { BookOpen, Users, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: BookOpen,
    title: "Course Management",
    description: "Easily manage courses, assignments, and learning materials.",
  },
  {
    icon: Users,
    title: "Student Tracking",
    description: "Monitor attendance, grades, and student progress effortlessly.",
  },
  {
    icon: Calendar,
    title: "Scheduling",
    description: "Organize classes, events, and parent-teacher meetings.",
  },
  {
    icon: Award,
    title: "Performance Analytics",
    description: "Track and analyze student performance with detailed insights.",
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-up">
              Streamline Your School Management
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-up">
              The all-in-one platform for modern educational institutions. Simplify administration, enhance learning, and engage with your community.
            </p>
            <div className="flex justify-center space-x-4 animate-fade-up">
              <Button size="lg" asChild>
                <Link to="/register">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/demo">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your School?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of schools already using EduManager
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
              asChild
            >
              <Link to="/register">Get Started Today</Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;