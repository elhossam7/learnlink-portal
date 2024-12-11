import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

const getRegisteredStudentIds = () => {
  const storedIds = localStorage.getItem("registeredStudentIds");
  return storedIds ? JSON.parse(storedIds) : [];
};

const validateChildStudentId = (id: string) => {
  const registeredIds = getRegisteredStudentIds();
  return registeredIds.includes(id);
};

const baseSchema = {
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: z.string(),
  role: z.enum(["student", "teacher", "parent"] as const),
};

const studentSchema = z.object({
  ...baseSchema,
  studentId: z.string().min(1, "Student ID is required"),
  gradeLevel: z.string().min(1, "Grade level is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const teacherSchema = z.object({
  ...baseSchema,
  subjects: z.string().min(1, "At least one subject is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const parentSchema = z.object({
  ...baseSchema,
  childName: z.string().min(2, "Child's name must be at least 2 characters"),
  childStudentId: z.string().min(1, "Child's student ID is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine(
  (data) => validateChildStudentId(data.childStudentId),
  {
    message: "Invalid Student ID. Please enter a valid registered student ID.",
    path: ["childStudentId"],
  }
);

type Role = "student" | "teacher" | "parent";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
  studentId?: string;
  gradeLevel?: string;
  subjects?: string;
  childName?: string;
  childStudentId?: string;
};

export const RegisterForm = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(
      selectedRole === "student"
        ? studentSchema
        : selectedRole === "teacher"
        ? teacherSchema
        : parentSchema
    ),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
      studentId: "",
      gradeLevel: "",
      subjects: "",
      childName: "",
      childStudentId: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      console.log("Registration values:", values);
      
      // Register user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            role: values.role,
            // Add role-specific data
            ...(values.role === "student" && {
              student_id: values.studentId,
              grade_level: values.gradeLevel,
            }),
            ...(values.role === "teacher" && {
              subjects: values.subjects,
            }),
            ...(values.role === "parent" && {
              child_name: values.childName,
              child_student_id: values.childStudentId,
            }),
          },
        },
      });

      if (authError) {
        console.error("Registration error:", authError);
        throw new Error(authError.message);
      }

      console.log("Registration successful:", authData);

      // If registering as a student, store the student ID
      if (values.role === "student") {
        const registeredIds = getRegisteredStudentIds();
        if (!registeredIds.includes(values.studentId)) {
          registeredIds.push(values.studentId);
          localStorage.setItem("registeredStudentIds", JSON.stringify(registeredIds));
        }
      }
      
      // Store the user's full name in localStorage for later use
      const fullName = `${values.firstName} ${values.lastName}`;
      localStorage.setItem("registeredUserName", fullName);
      
      // Store the complete user profile
      const userProfile = {
        name: fullName,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: values.role,
        joinDate: new Date().toISOString().split("T")[0],
        lastLogin: new Date().toISOString().split("T")[0],
        ...(values.role === "student" && {
          studentId: values.studentId,
          gradeLevel: values.gradeLevel,
        }),
        ...(values.role === "teacher" && {
          subjects: values.subjects,
        }),
        ...(values.role === "parent" && {
          childName: values.childName,
          childStudentId: values.childStudentId,
        }),
      };
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      
      toast.success("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create account. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>I am a</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: Role) => {
                    field.onChange(value);
                    setSelectedRole(value);
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="student" />
                    </FormControl>
                    <FormLabel className="font-normal">Student</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="teacher" />
                    </FormControl>
                    <FormLabel className="font-normal">Teacher</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="parent" />
                    </FormControl>
                    <FormLabel className="font-normal">Parent</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedRole === "student" && (
          <>
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {selectedRole === "teacher" && (
          <FormField
            control={form.control}
            name="subjects"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subjects (comma-separated)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Math, Science, History" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {selectedRole === "parent" && (
          <>
            <FormField
              control={form.control}
              name="childName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Child's Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="childStudentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Child's Student ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="space-y-4">
          <Button type="submit" className="w-full">
            Create Account
          </Button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

