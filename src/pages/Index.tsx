import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { BookOpen, Users, Calendar, Award, ChartBar, MessageSquare, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: BookOpen,
    title: "Learning Management",
    description: "Complete virtual classroom solution with assignments, resources, and assessments.",
  },
  {
    icon: Users,
    title: "Student Management",
    description: "Comprehensive student profiles, enrollment, and academic tracking.",
  },
  {
    icon: Calendar,
    title: "Scheduling & Attendance",
    description: "Smart timetabling and automated attendance tracking system.",
  },
  {
    icon: Award,
    title: "Examination Management",
    description: "Create, conduct, and grade exams with detailed analytics.",
  },
  {
    icon: ChartBar,
    title: "Analytics & Reports",
    description: "Data-driven insights for better decision making.",
  },
  {
    icon: MessageSquare,
    title: "Communication Hub",
    description: "Seamless communication between staff, students, and parents.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security for your institution's data.",
  },
  {
    icon: Globe,
    title: "Cloud-Based Solution",
    description: "Access your school management system anywhere, anytime.",
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-up">
              The Complete School Management Solution
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-up">
              Streamline your educational institution with our all-in-one platform. From admissions to alumni management, we've got you covered.
            </p>
            <div className="flex justify-center space-x-4 animate-fade-up">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link to="/register">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/demo">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-sm opacity-90">Schools Trust Us</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-sm opacity-90">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-sm opacity-90">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Run Your Institution
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
        <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of institutions already using our platform
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

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="text-gray-600 mb-4">
                "This platform has revolutionized how we manage our school. The automation and insights have saved us countless hours."
              </p>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-sm text-gray-500">School Principal</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="text-gray-600 mb-4">
                "The comprehensive features and intuitive interface make it easy for our staff to focus on what matters - education."
              </p>
              <div className="font-semibold">Mohammed Ahmed</div>
              <div className="text-sm text-gray-500">IT Administrator</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="text-gray-600 mb-4">
                "Parent communication has never been easier. We love how everything is integrated into one platform."
              </p>
              <div className="font-semibold">Lisa Chen</div>
              <div className="text-sm text-gray-500">Teacher</div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;