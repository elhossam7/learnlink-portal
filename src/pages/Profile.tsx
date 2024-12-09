import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserProfile {
  name: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  studentId?: string;
  gradeLevel?: string;
  subjects?: string;
  childName?: string;
  childStudentId?: string;
  joinDate: string;
  lastLogin: string;
  [key: string]: string | undefined;
}

// Simulate a function to retrieve student name by ID
const getStudentNameById = (id: string): string => {
  const studentDatabase: Record<string, string> = {
    "student1": "Alice Johnson",
    "student2": "Bob Smith",
    "student3": "Charlie Brown",
  };
  return studentDatabase[id] || "Unknown Student";
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userProfile"); // Use the correct key
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // Add additional fields if they don't exist
      const enhancedUser = {
        ...parsedUser,
        firstName: parsedUser.firstName || parsedUser.name.split(" ")[0],
        lastName: parsedUser.lastName || parsedUser.name.split(" ")[1] || "",
        joinDate: parsedUser.joinDate || new Date().toISOString().split("T")[0],
        lastLogin: parsedUser.lastLogin || new Date().toISOString().split("T")[0],
        // Automatically detect child's name if parent
        ...(parsedUser.role === "parent" && {
          childName: getStudentNameById(parsedUser.childStudentId),
        }),
      };
      setProfile(enhancedUser);
      setEditedProfile(enhancedUser);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    if (editedProfile) {
      // Update the name field to be the combination of first and last name
      const updatedProfile = {
        ...editedProfile,
        name: `${editedProfile.firstName} ${editedProfile.lastName}`,
      };
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    }
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    if (editedProfile) {
      setEditedProfile({ ...editedProfile, [field]: value });
    }
  };

  if (!profile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p>Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              View and manage your profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={isEditing ? editedProfile?.firstName : profile.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={isEditing ? editedProfile?.lastName : profile.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={isEditing ? editedProfile?.email : profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={profile.role}
                disabled
                className="capitalize bg-muted"
              />
            </div>

            {/* Role-specific fields */}
            {profile.role === "student" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={isEditing ? editedProfile?.studentId : profile.studentId}
                    onChange={(e) => handleChange("studentId", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradeLevel">Grade Level</Label>
                  <Input
                    id="gradeLevel"
                    value={isEditing ? editedProfile?.gradeLevel : profile.gradeLevel}
                    onChange={(e) => handleChange("gradeLevel", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            )}

            {profile.role === "teacher" && (
              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects</Label>
                <Input
                  id="subjects"
                  value={isEditing ? editedProfile?.subjects : profile.subjects}
                  onChange={(e) => handleChange("subjects", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            )}

            {profile.role === "parent" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="childName">Child's Name</Label>
                  <Input
                    id="childName"
                    value={profile.childName}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childStudentId">Child's Student ID</Label>
                  <Input
                    id="childStudentId"
                    value={profile.childStudentId}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            )}

            {/* Account Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Join Date</Label>
                <Input
                  value={profile.joinDate}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label>Last Login</Label>
                <Input
                  value={profile.lastLogin}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              {!isEditing ? (
                <Button onClick={handleEdit}>Edit Profile</Button>
              ) : (
                <>
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
