import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, Calendar, Bell } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Empower Your School with EduManager
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The complete school management solution designed for Moroccan educational institutions
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/register')}
            className="bg-primary hover:bg-primary/90"
          >
            Start Your Free Trial
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<GraduationCap className="w-8 h-8 text-primary" />}
            title="Student Management"
            description="Complete student information system with attendance and grade tracking"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-primary" />}
            title="Staff Management"
            description="Efficiently manage teachers and administrative staff"
          />
          <FeatureCard
            icon={<Calendar className="w-8 h-8 text-primary" />}
            title="Scheduling"
            description="Smart class scheduling and resource allocation"
          />
          <FeatureCard
            icon={<Bell className="w-8 h-8 text-primary" />}
            title="Communication"
            description="Seamless communication between staff, students, and parents"
          />
        </div>

        {/* Language Support */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Supporting Multiple Languages
          </h2>
          <div className="flex justify-center gap-4">
            <LanguageButton lang="ar" name="العربية" />
            <LanguageButton lang="fr" name="Français" />
            <LanguageButton lang="en" name="English" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="p-6 rounded-lg border border-gray-200 hover:border-primary/20 hover:shadow-lg transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const LanguageButton = ({ lang, name }: { lang: string; name: string }) => {
  return (
    <button className="px-4 py-2 rounded-md border border-gray-200 hover:border-primary/20 hover:bg-gray-50 transition-all">
      {name}
    </button>
  );
};

export default Index;