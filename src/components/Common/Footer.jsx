import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { toast } from "react-hot-toast";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  const handleComingSoon = () =>
    toast.custom(
      (t) => (
        <div
          className="flex items-center gap-3 rounded-2xl border border-yellow-25/50 bg-richblack-900 px-5 py-4 text-sm text-richblack-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
          style={{
            minWidth: "260px",
          }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-25 text-richblack-900">
            🚀
          </div>
          <div>
            <div className="font-semibold text-richblack-5">Coming Soon</div>
            <div className="text-xs text-richblack-100">This feature is on the way.</div>
          </div>
        </div>
      ),
      { duration: 2800 }
    );

  return (
    <div className="bg-richblack-800">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between w-full max-w-maxContent px-4 py-14 text-richblack-400 leading-6 mx-auto relative sm:px-6">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <div className="inline-flex items-center gap-0 text-2xl font-semibold tracking-tight">
                <span className="text-richblack-5">Think</span>
                <span className="text-yellow-25">ora</span>
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <button type="button" onClick={handleComingSoon} className="text-left text-[14px] w-full cursor-pointer hover:text-richblack-50 transition-all duration-200 focus:outline-none">
                        {ele}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
              <div></div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <button
                        type="button"
                        onClick={handleComingSoon}
                        className="text-left text-[14px] w-full cursor-pointer hover:text-richblack-50 transition-all duration-200 focus:outline-none"
                      >
                        {ele}
                      </button>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <button type="button" onClick={handleComingSoon} className="text-left w-full focus:outline-none">
                  Help Center
                </button>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <button
                        type="button"
                        onClick={handleComingSoon}
                        className="text-left text-[14px] w-full cursor-pointer hover:text-richblack-50 transition-all duration-200 focus:outline-none"
                      >
                        {ele}
                      </button>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <button
                        type="button"
                        onClick={handleComingSoon}
                        className="text-left text-[14px] w-full cursor-pointer hover:text-richblack-50 transition-all duration-200 focus:outline-none"
                      >
                        {ele}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-richblack-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <button type="button" onClick={handleComingSoon} className="text-left text-[14px] w-full cursor-pointer hover:text-richblack-50 transition-all duration-200 focus:outline-none">
                            {link.title}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 w-full max-w-maxContent px-4 text-richblack-400 mx-auto pb-14 text-sm sm:flex-row sm:items-center sm:px-6">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <button type="button" onClick={handleComingSoon} className="text-left text-[14px] w-full cursor-pointer hover:text-richblack-50 transition-all duration-200 focus:outline-none">
                    {ele}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-center">Made with ❤️ CodeWithAnil © 2025 Thinkora</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
