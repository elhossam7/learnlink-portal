import { Layout } from "@/components/layout/Layout";
import { RegisterForm } from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;