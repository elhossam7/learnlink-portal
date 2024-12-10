export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  grade: string;
  email: string;
  phoneNumber: string;
  address: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
  healthInfo: {
    bloodType: string;
    allergies: string[];
    medications: string[];
    emergencyContact: {
      name: string;
      relation: string;
      phone: string;
    };
  };
  attendance: {
    date: string;
    status: 'present' | 'absent' | 'late';
  }[];
  grades: {
    subject: string;
    grade: string;
    semester: string;
  }[];
}