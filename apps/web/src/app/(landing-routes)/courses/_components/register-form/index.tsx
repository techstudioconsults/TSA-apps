"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustomButton,
  FormControl,
  FormItem,
  FormMessage,
  Input,
  PrimitiveFormField,
  toast,
} from "@workspace/ui/lib";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Form, useForm } from "react-hook-form";

import { fetchAllCourses } from "~/action/courses.action";
import { submitRegisterForm } from "~/action/register.action";
import { RegisterFormData, registerFormSchema } from "~/schemas";
import useCoursesStore from "~/stores/course.store";

interface RegisterProperties {
  slug: string;
}

export const RegisterForm: FC<RegisterProperties> = ({ slug }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [source, setSource] = useState("direct");
  const { allCourses } = useCoursesStore();
  const router = useRouter();
  const searchParameters = useSearchParams();

  // Memoize the course finding logic to avoid unnecessary recalculations
  const course = useMemo(() => {
    if (allCourses.length === 0 || !slug) return null;

    return allCourses.find((course) => {
      const courseSlug = course.title
        .trim()
        .replaceAll(/[\s/]+/g, "-")
        .toLowerCase();
      return courseSlug === slug.toLowerCase();
    });
  }, [allCourses, slug]);

  // Fetch courses on mount
  useEffect(() => {
    fetchAllCourses();
  }, []);

  // Handle UTM source tracking - listen to URL changes and localStorage
  useEffect(() => {
    const utmSource = searchParameters.get("utm_source");

    if (utmSource) {
      // If UTM source is in URL, use it and store in localStorage
      setSource(utmSource);
      localStorage.setItem("utm_source", utmSource);
    } else {
      // If no UTM source in URL, set to "direct"
      // This ensures we always have the correct source, even if there was a previous UTM source
      setSource("direct");
      localStorage.setItem("utm_source", "direct");
    }
  }, [searchParameters]);

  const formMethods = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      courseId: "",
      schedule: "weekday",
      newsletter: false,
      source: "direct",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = formMethods;

  // Set courseId when course is found
  useEffect(() => {
    if (course?.id) {
      setValue("courseId", course.id);
    }
  }, [course?.id, setValue]);

  // Set source when it's available
  useEffect(() => {
    if (source) {
      setValue("source", source);
    }
  }, [source, setValue]);

  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      if (!course?.id) {
        toast.error("Course not found", {
          description: "Please refresh the page and try again.",
        });
        return;
      }

      setIsSubmitting(true);
      try {
        const formData = {
          ...data,
          source: source,
        };

        const result = await submitRegisterForm(formData);

        if (result.success) {
          const message = result.success || "Registration successful.";
          router.push(
            `/courses/${slug}/success?msg=${encodeURIComponent(message)}`,
          );
        } else {
          toast.error("Registration failed", {
            description: result.error || "Failed to register for the course.",
          });
        }
      } catch {
        toast.error("Connection error", {
          description:
            "Failed to connect to the server. Please check your internet connection and try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [course?.id, source, slug, router],
  );

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="relative z-[2] max-w-[457px] before:absolute before:left-[66px] before:top-[-60px] before:z-[-1] before:hidden before:h-[387px] before:w-[467px] before:rounded-[15px] before:bg-[#072C5B] before:content-empty before:lg:block">
          <div className="h-full rounded-[15px] bg-white p-[29px]">
            <h6 className="mb-[27px] text-[16px] font-[700]">
              Register to learn more about the program pricing and curriculum
            </h6>
            <div className="grid grid-cols-2 gap-[20px]">
              {/* First Name */}
              <PrimitiveFormField
                name="firstName"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        className="w-full rounded-md border px-4 py-2 text-black"
                        {...field}
                      />
                    </FormControl>
                    {errors.firstName && (
                      <FormMessage className="text-xs italic text-destructive">
                        {errors.firstName?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <PrimitiveFormField
                name="lastName"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        className="w-full rounded-md border px-4 py-2 text-black"
                        {...field}
                      />
                    </FormControl>
                    {errors.lastName && (
                      <FormMessage className="text-xs italic text-destructive">
                        {errors.lastName?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Email Address */}
              <PrimitiveFormField
                name="email"
                control={control}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        className="w-full rounded-md border px-4 py-2 text-black"
                        {...field}
                      />
                    </FormControl>
                    {errors.email && (
                      <FormMessage className="text-xs italic text-destructive">
                        {errors.email?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <PrimitiveFormField
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        className="w-full rounded-md border px-4 py-2 text-black"
                        {...field}
                      />
                    </FormControl>
                    {errors.phoneNumber && (
                      <FormMessage className="text-xs italic text-destructive">
                        {errors.phoneNumber?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Hidden courseId field */}
              <PrimitiveFormField
                name="courseId"
                control={control}
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                    {errors.courseId && (
                      <FormMessage>{errors.courseId?.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="col-span-2">
                <CustomButton
                  type="submit"
                  size="lg"
                  variant="primary"
                  className="w-full bg-mid-blue"
                  isDisabled={isSubmitting || !course?.id}
                >
                  {isSubmitting ? (
                    <Loader className="animate-spin text-white" />
                  ) : (
                    "Get Program Package"
                  )}
                </CustomButton>
              </div>
            </div>
          </div>
        </section>
      </form>
    </Form>
  );
};
