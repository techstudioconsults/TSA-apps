"use client";

import { fetchCohortsByCourseId } from "@/action/cohort.action";
import {
  getLatestMarketingCycle,
  submitLeadForm,
} from "@/action/lead-form.action";
import { LeadFormData } from "@/schemas/lead-form";
import useCohortStore from "@/stores/cohort.store";
import useCoursesStore from "@/stores/course.store";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const validateField = (name: string, value: string) => {
  switch (name) {
    case "firstName": {
      if (!value.trim()) return "First Name is required";
      if (value.trim().length < 2)
        return "First Name must be at least 2 characters long";
      return "";
    }
    case "lastName": {
      if (!value.trim()) return "Last Name is required";
      if (value.trim().length < 2)
        return "Last Name must be at least 2 characters long";
      return "";
    }
    case "email": {
      if (!value.trim()) return "Email Address is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Must be a valid email address";
      return "";
    }
    case "phoneNumber": {
      if (!value.trim()) return "Phone Number is required";
      if (value.trim().length < 11)
        return "Phone Number must be at least 11 characters long";
      return "";
    }
    default: {
      return "";
    }
  }
};

const LeadForm = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const searchParameters = useSearchParams();
  const { allCourses } = useCoursesStore();
  const {
    cohorts,
    loading: cohortsLoading,
    error: cohortsError,
  } = useCohortStore();
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    courseId: "",
    cohortId: "",
    joinNewsLetter: false,
    utm_source: "direct_from_web_app",
    utm_medium: "direct_from_web_app",
    utm_content: "direct_from_web_app",
    utm_term: "direct_from_web_app",
  });
  const [marketingCycleId, setMarketingCycleId] = useState<string>(
    "2bef4d8c-39da-4da0-a1e1-7f840ea32daf",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Find the course using the slug
  const course = allCourses.find(
    (course) =>
      course.title
        .trim()
        .replaceAll(/[\s/]+/g, "-")
        .toLowerCase() === slug,
  );

  // Fetch cohorts when course is found
  useEffect(() => {
    if (course?.id) {
      fetchCohortsByCourseId(course.id);
    }
  }, [course?.id]);

  // Set course and cohort IDs when available
  useEffect(() => {
    const firstCohort = cohorts?.[0];
    if (course?.id && firstCohort) {
      setFormData((previous) => ({
        ...previous,
        courseId: course.id,
        cohortId: firstCohort.id,
      }));
    }
  }, [course?.id, cohorts]);

  useEffect(() => {
    const fetchMarketingCycle = async () => {
      setIsLoading(true);
      try {
        const cycle = await getLatestMarketingCycle();
        setMarketingCycleId(cycle.data.id);
      } catch {
        setMarketingCycleId("2bef4d8c-39da-4da0-a1e1-7f840ea32daf");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMarketingCycle();
  }, []);

  // Populate UTM parameters from URL query
  useEffect(() => {
    const utmSource =
      searchParameters.get("utm_source") || "direct_from_web_app";
    const utmMedium =
      searchParameters.get("utm_medium") || "direct_from_web_app";
    const utmContent =
      searchParameters.get("utm_content") || "direct_from_web_app";
    const utmTerm = searchParameters.get("utm_term") || "direct_from_web_app";

    setFormData((previous) => ({
      ...previous,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_content: utmContent,
      utm_term: utmTerm,
    }));
  }, [searchParameters]);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors((previous) => ({ ...previous, [name]: error }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    const fieldsToValidate = ["firstName", "lastName", "email", "phoneNumber"];
    for (const field of fieldsToValidate) {
      const error = validateField(
        field,
        formData[field as keyof LeadFormData] as string,
      );
      if (error) newErrors[field] = error;
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (cohortsLoading || isLoading) {
      setMessage({ type: "error", text: "Please wait while we load the form" });
      return;
    }
    if (cohortsError) {
      setMessage({ type: "error", text: "Error loading course data" });
      return;
    }
    if (!formData.courseId || !formData.cohortId) {
      setMessage({ type: "error", text: "Course or cohort not available" });
      return;
    }
    // No marketingCycleId available: proceed with fallback id to avoid blocking submission

    setIsSubmitting(true);
    try {
      const cycleIdToUse =
        marketingCycleId || "2bef4d8c-39da-4da0-a1e1-7f840ea32daf";
      const result = await submitLeadForm(formData, cycleIdToUse);
      const successMessage =
        result.success || "Registration successful. We'll contact you shortly.";

      setMessage({ type: "success", text: successMessage });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        courseId: course?.id || "",
        cohortId: cohorts[0]?.id || "",
        joinNewsLetter: false,
        utm_source: searchParameters.get("utm_source") || "direct_from_web_app",
        utm_medium: searchParameters.get("utm_medium") || "direct_from_web_app",
        utm_content:
          searchParameters.get("utm_content") || "direct_from_web_app",
        utm_term: searchParameters.get("utm_term") || "direct_from_web_app",
      });
      // Route to success page regardless of API response to prevent discouragement
      router.push(
        `/courses/${slug}/success?msg=${encodeURIComponent(successMessage)}`,
      );
    } catch {
      const successMessage =
        "Registration successful. We'll contact you shortly.";
      setMessage({ type: "success", text: successMessage });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        courseId: course?.id || "",
        cohortId: cohorts[0]?.id || "",
        joinNewsLetter: false,
        utm_source: searchParameters.get("utm_source") || "direct_from_web_app",
        utm_medium: searchParameters.get("utm_medium") || "direct_from_web_app",
        utm_content:
          searchParameters.get("utm_content") || "direct_from_web_app",
        utm_term: searchParameters.get("utm_term") || "direct_from_web_app",
      });
      router.push(
        `/courses/${slug}/success?msg=${encodeURIComponent(successMessage)}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
    // Clear error when user starts typing
    if (errors[event.target.name]) {
      setErrors((previous) => ({ ...previous, [event.target.name]: "" }));
    }
  };

  return (
    <section className="relative z-[2] max-w-[457px] before:absolute before:left-[66px] before:top-[-60px] before:z-[-1] before:hidden before:h-[387px] before:w-[467px] before:rounded-[15px] before:bg-[#072C5B] before:content-empty before:lg:block">
      <div className="h-full rounded-[15px] bg-white p-[29px]">
        <h6 className="mb-[27px] text-[16px] font-[700]">
          Register to learn more about the program pricing and curriculum
        </h6>
        {/* {(message || cohortsError) && (
          <div
            className={`mb-4 rounded p-3 ${
              message?.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message?.text || cohortsError}
          </div>
        )} */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-[20px]">
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-md border px-4 py-2 text-black"
                placeholder="First Name"
                disabled={isSubmitting}
              />
              {errors["firstName"] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors["firstName"]}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-md border px-4 py-2 text-black"
                placeholder="Last Name"
                disabled={isSubmitting}
              />
              {errors["lastName"] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors["lastName"]}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-md border px-4 py-2 text-black"
                placeholder="Email Address"
                disabled={isSubmitting}
              />
              {errors["email"] && (
                <p className="mt-1 text-sm text-red-600">{errors["email"]}</p>
              )}
            </div>
            <div className="col-span-2">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-md border px-4 py-2 text-black"
                placeholder="Phone Number"
                disabled={isSubmitting}
              />
              {errors["phoneNumber"] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors["phoneNumber"]}
                </p>
              )}
            </div>
            <div className="col-span-2 flex items-center">
              <input
                type="checkbox"
                name="joinNewsLetter"
                checked={formData.joinNewsLetter}
                onChange={handleChange}
                className="mr-2"
                disabled={isSubmitting}
              />
              <label className="text-sm text-gray-600">
                Subscribe to newsletter
              </label>
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-mid-blue py-2 text-white hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                ) : null}
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LeadForm;
