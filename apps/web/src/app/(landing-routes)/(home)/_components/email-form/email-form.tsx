"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HtmlHTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";

import { LuLoader } from "react-icons/lu";
import {
  cn,
  CustomButton,
  Form,
  FormControl,
  FormItem,
  Input,
  PrimitiveFormField,
  toast,
} from "@workspace/ui/lib";
import { newsletterFormData, newsletterFormSchema } from "@/schemas";
import { submitNewsletterForm } from "@/action/email.action";

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
    control,
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
    <Form {...formMethods}>
      <form
        {...rest}
        onSubmit={handleSubmit(onSubmit)}
        className={cn(`flex h-[48px] max-w-[521px] items-center`, className)}
      >
        <PrimitiveFormField
          name="email"
          control={control}
          render={({ field }) => (
            <FormItem className="h-full">
              <FormControl>
                <Input
                  data-testid="email-input"
                  placeholder={
                    errors.email
                      ? errors.email.message
                      : "Enter Your Email Address"
                  }
                  className={cn(
                    "h-full rounded-none rounded-s-[5px] text-black",
                    errors.email && `placeholder:text-destructive`,
                  )}
                  size={384}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <CustomButton
          type="submit"
          variant="primary"
          isDisabled={isSubmitting}
          className="tsaButton h-[100%] w-[138px] rounded-none rounded-e-[5px] bg-mid-blue"
        >
          {isSubmitting ? <LuLoader /> : buttonTitle}
        </CustomButton>
      </form>
    </Form>
  );
};
