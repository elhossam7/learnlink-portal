import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const schoolSchema = z.object({
  schoolName: z.string().min(2, "School name must be at least 2 characters"),
  subdomain: z.string()
    .min(3, "Subdomain must be at least 3 characters")
    .max(63, "Subdomain must be less than 63 characters")
    .regex(/^[a-z0-9-]+$/, "Subdomain can only contain lowercase letters, numbers, and hyphens"),
  adminFirstName: z.string().min(2, "First name must be at least 2 characters"),
  adminLastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  language: z.enum(["ar", "fr", "en"]),
});

type RegistrationData = z.infer<typeof schoolSchema>;

const SchoolRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const form = useForm<RegistrationData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      schoolName: "",
      subdomain: "",
      adminFirstName: "",
      adminLastName: "",
      email: "",
      phone: "",
      password: "",
      language: "fr",
    },
  });

  const onSubmit = async (data: RegistrationData) => {
    try {
      // First create the school
      const { data: schoolData, error: schoolError } = await supabase
        .from('schools')
        .insert({
          name: data.schoolName,
          email: data.email,
          phone: data.phone,
        })
        .select()
        .single();

      if (schoolError) throw schoolError;

      // Then create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.adminFirstName,
            last_name: data.adminLastName,
            role: 'admin',
          }
        }
      });

      if (authError) throw authError;

      // Finally create the school admin record
      const { error: adminError } = await supabase
        .from('school_admins')
        .insert({
          user_id: authData.user?.id,
          school_id: schoolData.id,
        });

      if (adminError) throw adminError;

      toast.success("Registration successful! Please check your email to verify your account.");
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  const nextStep = () => {
    const currentFields = step === 1 
      ? ['schoolName', 'subdomain'] 
      : ['adminFirstName', 'adminLastName', 'email', 'phone'];
    
    const isValid = currentFields.every(field => {
      const value = form.getValues(field as keyof RegistrationData);
      return value && value.length > 0;
    });

    if (isValid) {
      setStep(step + 1);
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name="schoolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subdomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Subdomain</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input {...field} />
                      <span className="ml-2">.edumanager.com</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="button" onClick={nextStep} className="w-full">
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="adminFirstName"
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
                name="adminLastName"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="button" onClick={() => setStep(1)} variant="outline" className="mr-2">
              Back
            </Button>
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          </>
        )}

        {step === 3 && (
          <>
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
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="button" onClick={() => setStep(2)} variant="outline" className="mr-2">
              Back
            </Button>
            <Button type="submit">
              Create Account
            </Button>
          </>
        )}
      </form>
    </Form>
  );
};

export default SchoolRegistrationForm;