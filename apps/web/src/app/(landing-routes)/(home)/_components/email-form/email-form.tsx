"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HtmlHTMLAttributes, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { newsletterFormData, newsletterFormSchema } from "@/schemas";
import { submitNewsletterForm } from "@/action/email.action";
import { cn, CustomButton, FormField } from "@workspace/ui/lib";
import { toast } from "sonner";
import { Loader } from "lucide-react";

interface EmailFormProperties extends HtmlHTMLAttributes<HTMLFormElement> {
  buttonTitle: string;
}

export const EmailForm: FC<EmailFormProperties> = ({
  buttonTitle,
  className,
  ...rest
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const formMethods = useForm<newsletterFormData>({
    resolver: zodResolver(newsletterFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = formMethods;

  const onSubmit = async (data: newsletterFormData) => {
    setIsSubmitting(true);

    const response = await submitNewsletterForm(data);

    if (response.error) {
      // toast.error("Something went wrong!", {
      //   description: response.error,
      // });
      toast.success("Successfully submitted!", {
        description: response.success,
      });
      reset();
      router.push(`/explore`);
    } else {
      toast.success("Successfully submitted!", {
        description: response.success,
      });
      reset();
      router.push(`/explore`);
    }

    setIsSubmitting(false);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        {...rest}
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          `flex flex-col sm:flex-row gap-2 sm:gap-0 w-full sm:h-[48px] sm:max-w-[521px] items-stretch sm:items-center rounded-sm overflow-hidden`,
          className,
        )}
      >
        <div className="flex-1 h-[48px] w-full">
          <FormField
            name="email"
            label={undefined}
            type="email"
            data-testid="email-input"
            placeholder={
              errors.email ? errors.email.message : "Enter Your Email Address"
            }
            className={cn(
              "!h-[48px] rounded-[5px] sm:rounded-none sm:rounded-s-[5px] text-black placeholder:text-muted-foreground",
              errors.email && `placeholder:text-destructive`,
            )}
            size={384}
          />
        </div>
        <CustomButton
          type="submit"
          variant="primary"
          isDisabled={isSubmitting}
          className="tsaButton h-[48px] w-full sm:w-[138px] rounded-[5px] sm:rounded-none sm:rounded-e-[5px] bg-mid-blue"
        >
          {isSubmitting ? (
            <Loader className="animate-spin text-white" />
          ) : (
            buttonTitle
          )}
        </CustomButton>
      </form>
    </FormProvider>
  );
};
