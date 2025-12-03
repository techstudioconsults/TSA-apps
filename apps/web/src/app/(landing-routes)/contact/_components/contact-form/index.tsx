"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { submitContactForm } from "../../action";

import { ContactFormData, contactFormSchema } from "@/schemas";
import ResponseModal from "@/components/modals/response-modal";
import { CustomButton, FormField } from "@workspace/ui/lib";
import { toast } from "sonner";

export const ContactForm: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  const { handleSubmit, reset } = formMethods;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const result = await submitContactForm(data);

    if (result.success) {
      setResponseMessage(result.success);
      setIsModalOpen(true);
      reset();
    } else {
      toast.error("Something went wrong!", {
        description: result.error || "Failed to register for the course.",
      });
    }

    setIsSubmitting(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setResponseMessage(undefined);
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <section className="max-w-[504px] rounded-lg border-t-8 border-mid-blue bg-white p-6 shadow-lg lg:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="fullName"
              label="Full Name"
              placeholder="Full Name"
              type="text"
              className="text-dark"
            />

            <FormField
              name="email"
              label="Email Address"
              placeholder="example@example.com"
              type="email"
              className="text-dark"
            />

            <FormField
              name="message"
              label="Message or Questions"
              placeholder="Type your message, questions, or inquiries here"
              type="textarea"
              className="text-dark"
            />

            {/* Submit Button */}
            <div>
              <CustomButton
                size="lg"
                type="submit"
                variant="primary"
                className="w-full bg-mid-blue"
                isDisabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader className="animate-spin text-primary" />
                ) : (
                  "Send Message"
                )}
              </CustomButton>
            </div>
          </form>
        </section>
      </FormProvider>

      {/* Response Modal */}
      <ResponseModal
        title={`Message Sent Successfully!`}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        responseMessage={responseMessage || ""}
        isError={false}
      />
    </>
  );
};
