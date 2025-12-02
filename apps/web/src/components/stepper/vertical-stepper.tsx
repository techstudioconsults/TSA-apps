"use client";

interface Step {
  label: string;
  description: string;
}

interface VerticalStepperProperties {
  steps: Step[];
  currentStep: number;
}

export const VerticalStepper = ({
  steps,
  currentStep,
}: VerticalStepperProperties) => {
  return (
    <div className="relative flex flex-col">
      {steps.map((step, index) => (
        <div key={index} className="relative flex items-start">
          {/* Vertical line */}
          {index !== steps.length - 1 && (
            <div
              className={`absolute left-4 top-6 h-full w-px ${
                currentStep > index ? "border-[#ED9742]" : "bg-mid-blue"
              }`}
            ></div>
          )}
          {/* Step Indicator */}
          <div className="z-10 mr-4 flex flex-col items-center">
            <div
              className={`flex h-[32px] w-[32px] items-center justify-center rounded-full border-[8px] ${(index + 1) % 2 === 0 ? `border-[#ED9742]` : `border-mid-blue`} bg-white`}
            >
              {/* {currentStep > index ? "✓" : index + 1} */}
            </div>
          </div>
          {/* Step Content */}
          <div className="mb-8">
            <h6 className="mb-[1rem] font-semibold">{step.label}</h6>
            <p className="text-mid-grey-III">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
