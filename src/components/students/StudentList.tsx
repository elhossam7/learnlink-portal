import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  gender: string;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get<Student[]>('http://localhost:8000/api/students/');
        setStudents(response.data); // Ensure response.data is of type Student[]
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">
              {student.first_name} {student.last_name}
            </h2>
            <p className="text-gray-600">{student.email}</p>
            <p className="text-gray-600">Date of Birth: {student.date_of_birth}</p>
            <p className="text-gray-600">Gender: {student.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
