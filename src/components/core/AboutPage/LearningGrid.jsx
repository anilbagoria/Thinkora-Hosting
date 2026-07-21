import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highliteText: "Anyone, Anywhere",
    description:
      "Thinkora partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Thinkora partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Thinkora partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Thinkora partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Thinkora partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-full max-w-maxContent gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        const cardClasses = card.order < 0
          ? "xl:col-span-2 md:col-span-2 bg-richblack-900"
          : card.order % 2 === 1
          ? "bg-richblack-700"
          : "bg-richblack-800"

        return (
          <div
            key={i}
            className={`${cardClasses} min-h-[294px] rounded-3xl p-8`}
          >
            {card.order < 0 ? (
              <div className="flex h-full flex-col gap-6">
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighlightText text={card.highliteText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="mt-auto w-fit">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between gap-4">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
