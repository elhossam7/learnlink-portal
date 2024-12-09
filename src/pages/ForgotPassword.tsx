import { Layout } from "@/components/layout/Layout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Reset Password</h1>
          <ForgotPasswordForm />
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;