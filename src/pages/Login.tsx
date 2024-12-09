import { Layout } from "@/components/layout/Layout";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;