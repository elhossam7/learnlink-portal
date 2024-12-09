import { Layout } from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-700">
          Welcome to LearnLink Portal! We are dedicated to providing a seamless
          educational experience for students, teachers, and parents. Our platform
          offers a range of tools to enhance learning and communication within
          educational communities.
        </p>
      </div>
    </Layout>
  );
};

export default About;
