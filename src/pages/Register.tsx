import { Layout } from "@/components/layout/Layout";
import { SchoolRegistrationForm } from "@/components/auth/SchoolRegistrationForm";

const Register = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Register Your School</h1>
          <SchoolRegistrationForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;