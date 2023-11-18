import React from "react";

const OurServices = () => {
  const serviceInfo = [
    {
      image:
        "https://new-basel2.myshopify.com/cdn/shop/files/organic-icon-1_157x.png?v=1613716705",
      serviceName: " Select your box",
      serviceInfo:
        "Primis aptent vel turpis a a class suspendisse et augue orci a diam tristique consequat hendrerit ullamcorper torquent a integer a arcu neque vestibulum hac.",
    },
    {
      image:
        "https://new-basel2.myshopify.com/cdn/shop/files/organic-icon-2_157x.png?v=1613716705",
      serviceName: "Choose box contents",
      serviceInfo:
        "Purus velit class id conse ctetur ante elit vestibulum dignissim magna adipiscing quisque ante volutpat vestibulum vulputate. Suspendisse eu.",
    },
    {
      image:
        "https://new-basel2.myshopify.com/cdn/shop/files/organic-icon-3_157x.png?v=1613716705",
      serviceName: "Recieve your box",
      serviceInfo:
        "Hendrerit cursus duis nostra adipiscing vestibulum nulla a nam eu commodo primis scelerisque lacus litora a tristique adipiscing nam.",
    },
  ];

  return (
    <section className="font-serif bg-slate-100 py-6">
      <div className="my-14">
        <div className="lg:text-5xl text-4xl flex items-center justify-center  font-serif">
          How it works
        </div>
        <p className="border-b-2 border-[#98CB4C] mx-auto w-14 lg:mt-4 mt-2"></p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 md:gap-10 lg:mx-48 md:mx-10">
        {serviceInfo.map((data, index) => (
          <div key={index} className=" flex justify-center">
            <div className="">
              <div className="flex justify-center">
                <img className="w-24 h-24" src={data.image} alt="" />
              </div>
              <div className="mt-2 flex justify-center w-full mx-auto">
                <h1 className="lg:text-3xl md:text-2xl  text-xl mr-2 -mt-2 font-bold text-[#98CB4C]">
                  {index + 1}.
                </h1>
                <h1 className="lg:text-xl md:text-lg text-sm font-semibold">{data.serviceName}</h1>
              </div>
              <p className="mt-2 text-sm text-center lg:px-0 px-2">{data.serviceInfo}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
