import { supabase } from "@/integrations/supabase/client";

export interface SchoolRegistrationData {
  schoolName: string;  // Required to match schema
  subdomain: string;  // Required to match schema
  email: string;
  password: string;
  phone: string;
  confirmPassword?: string;
}

export const registerSchool = async (data: SchoolRegistrationData) => {
  // First, sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.schoolName,
        last_name: "Admin",
        role: "admin",
      },
    },
  });

  if (authError) {
    throw authError;
  }

  if (!authData.user) {
    throw new Error("Failed to create user account");
  }

  // Set the session to use it for the next requests
  const { data: session } = await supabase.auth.getSession();
  
  if (!session?.session) {
    throw new Error("Failed to get session");
  }

  // Create the school with authenticated user
  const { data: schoolData, error: schoolError } = await supabase
    .from("schools")
    .insert({
      name: data.schoolName,
      email: data.email,
      phone: data.phone,
    })
    .select()
    .single();

  if (schoolError) {
    throw schoolError;
  }

  // Create the school admin record
  const { error: adminError } = await supabase.from("school_admins").insert({
    user_id: authData.user.id,
    school_id: schoolData.id,
    role: "admin",
  });

  if (adminError) {
    throw adminError;
  }

  return { user: authData.user, school: schoolData };
};