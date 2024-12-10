import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "@/types/student";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StudentProfileProps {
  student: Student;
}

export const StudentProfile = ({ student }: StudentProfileProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Student Profile</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{`${student.firstName} ${student.lastName}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info">
            <TabsList>
              <TabsTrigger value="info">Basic Info</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Student ID</p>
                  <p>{student.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Grade</p>
                  <p>{student.grade}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p>{student.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrollment Date</p>
                  <p>{student.enrollmentDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{student.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{student.phoneNumber}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p>{student.address}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="health">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Blood Type</p>
                  <p>{student.healthInfo.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Allergies</p>
                  <ul className="list-disc list-inside">
                    {student.healthInfo.allergies.map((allergy, index) => (
                      <li key={index}>{allergy}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Emergency Contact</p>
                  <p>{student.healthInfo.emergencyContact.name} ({student.healthInfo.emergencyContact.relation})</p>
                  <p>{student.healthInfo.emergencyContact.phone}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attendance">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.attendance.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          record.status === 'present' ? 'bg-green-100 text-green-800' :
                          record.status === 'absent' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="grades">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Semester</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.grades.map((grade, index) => (
                    <TableRow key={index}>
                      <TableCell>{grade.subject}</TableCell>
                      <TableCell>{grade.grade}</TableCell>
                      <TableCell>{grade.semester}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};