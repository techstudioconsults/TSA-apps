import { CustomButton } from "@workspace/ui/lib";
import Image from "next/image";

const HelpBanner = () => {
  return (
    <section className="relative flex max-w-[1240px] rounded-[15px] bg-primary p-[40px] text-center text-white lg:max-h-[335px] lg:px-[145px] lg:py-[60px] lg:text-left">
      <div className="mx-auto h-fit max-w-[500px] lg:mx-0">
        <p className="text-md font-light text-white">
          Need help choosing a course?
        </p>
        <h5 className="text-white">Talk To An Expert</h5>
        <p className="mb-[32px] mt-[16px] text-sm font-light leading-[22px]">
          Are you indecisive about what course to choose? Would you like to talk
          to a Tech expert over any tech related issue? We have professionals in
          place who are ready and willing to be of help.
        </p>
        <CustomButton
          href="/contact"
          variant="primary"
          size="lg"
          className="w-[159px] bg-mid-blue"
        >
          Get Help
        </CustomButton>
      </div>
      <div className="absolute bottom-0 right-[148px] hidden overflow-hidden lg:block">
        <Image
          priority
          width={279}
          height={400}
          src={"/images/smiling-lady.png"}
          alt={"smiling-lady"}
          className="object-cover"
        />
      </div>
      <div className="absolute left-[-2rem] top-[-2rem] hidden overflow-hidden 2xl:block">
        <Image
          width={116}
          height={118}
          src={"/icons/box-2.png"}
          alt={"icon"}
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-[-2rem] right-[-2rem] hidden overflow-hidden 2xl:block">
        <Image
          width={90}
          height={72}
          src={"/icons/box-1(transparent).png"}
          alt={"icon"}
          className="object-cover"
        />
      </div>
    </section>
  );
};
export default HelpBanner;
