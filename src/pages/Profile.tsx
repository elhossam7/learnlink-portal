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

interface UserProfile {
  name: string;
  email: string;
  role: string;
  [key: string]: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setProfile(parsedUser);
      setEditedProfile(parsedUser);
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
      localStorage.setItem("user", JSON.stringify(editedProfile));
      setProfile(editedProfile);
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
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={isEditing ? editedProfile?.name : profile.name}
                onChange={(e) => handleChange("name", e.target.value)}
                disabled={!isEditing}
              />
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
                value={isEditing ? editedProfile?.role : profile.role}
                onChange={(e) => handleChange("role", e.target.value)}
                disabled={!isEditing}
              />
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
