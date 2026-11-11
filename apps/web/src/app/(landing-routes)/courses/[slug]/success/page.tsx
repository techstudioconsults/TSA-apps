import { CustomButton, Wrapper } from "@workspace/ui/lib";
import Image from "next/image";
import { LeadEvent } from "./lead-event";

export default async function RegistrationSuccessPage(
  props: any,
  // props: PageProps<"/courses/[slug]/success">,
) {
  const { slug } = await props.params;
  //   const searchParameters = useSearchParams();
  const message =
    // searchParameters.get("msg") ||
    "Thank you for contacting us! Our team is reviewing your message and will respond promptly. Feel free to explore our website for more information in the meantime. We appreciate your patience!";

  return (
    <main className="relative z-[1] bg-background py-16">
      {/* Meta Pixel: one Lead per real form submit. The base pixel loads site-wide in app/layout.tsx. */}
      <LeadEvent />
      <Wrapper className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        {/* <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-50"> */}
        <Image
          src="/images/yes.png"
          alt="Success"
          width={100}
          height={100}
          className="mb-6"
          priority
        />
        {/* </div> */}
        <h1 className="mb-3 text-2xl font-extrabold text-primary sm:text-3xl">
          Registration successful
        </h1>
        <p className="mx-auto mb-8 max-w-[640px] text-balance text-sm text-[#475569] sm:text-base">
          {message}
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <CustomButton
            href={`/courses/${slug}`}
            variant="primary"
            size="lg"
            className="bg-mid-blue text-white"
          >
            Back to course
          </CustomButton>
          <CustomButton
            href="/explore"
            variant="outline"
            size="lg"
            className="border-mid-blue text-mid-blue"
          >
            Explore more programs
          </CustomButton>
        </div>
      </Wrapper>
    </main>
  );
}
