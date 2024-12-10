import { Layout } from "@/components/layout/Layout";
import { StudentList } from "@/components/students/StudentList";

const Students = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <StudentList />
      </div>
    </Layout>
  );
};

export default Students;