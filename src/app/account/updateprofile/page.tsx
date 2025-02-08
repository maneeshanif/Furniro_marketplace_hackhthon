

"use client";

import { useState, useRef } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { formSchema } from "@/validation/userFormvalidation";

export default function UpdateProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, updateUser } = useUser();
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: "1234567890",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      bio: "I'm a marketer with a passion for digital strategies.",
    },
  });


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Use URL.createObjectURL for preview
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const formData = new FormData();

    // Append form values
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append image file if exists
    if (fileInputRef.current?.files?.[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    try {
      const response = await fetch("/api/user/profileupdate", {
        method: "POST",
        body: formData, // Use FormData for file uploads
        credentials: "include",
      });

      if (!response.ok) {
        const result = await response.json();
        console.log(result);
        toast(result.message);
        throw new Error("Failed to update profile");
      }

      const result = await response.json();
      updateUser({
        name: values.name,
        email: values.email,
        image: result.data.image || user.image, // Use updated image from response
      });
      toast(result.message);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className=' w-full flex flex-col  bg-white items-center  '>
        <div className=' w-[90%] h-full md:w-[1440px] flex flex-col  space-y-2 py-16 items-center justify-center    '>
    <div className="space-y-6 ">
      <div>
        <h1 className="text-3xl text-golden font-bold tracking-tight">Update Profile</h1>
        <p className="text-mygray">Manage your account details and preferences.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={previewImage || user.image} alt="Profile" />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Form fields remain the same */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-myblack">Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" className="focus:text-golden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Add other fields similarly */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-myblack" >Email</FormLabel>
                <FormControl>
                  <Input placeholder="JnT2D@example.com" className="focus:text-golden" {...field} />
                </FormControl>
                <FormDescription>This email will be used for account-related notifications.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-myblack">Phone Number</FormLabel>
                <FormControl >
                  <Input placeholder="1234567890" className="focus:text-golden" {...field} />
                </FormControl>
                <FormDescription>Your phone number for order updates and authentication.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-myblack">Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" className="focus:text-golden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-myblack">City</FormLabel>
                  <FormControl>
                    <Input placeholder="Anytown" className="focus:text-golden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-myblack">State</FormLabel>
                  <FormControl>
                    <Input placeholder="CA" className="focus:text-golden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-myblack">Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="12345" className="focus:text-golden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-myblack">Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us a little about yourself" className="focus:text-golden resize-none"   {...field} />
                </FormControl>
                <FormDescription>You can @mention other users and organizations.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-golden" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin " />}
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
    </div>
    </div>
  );
}
