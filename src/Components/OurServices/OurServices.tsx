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
      serviceName: "Choose your box contents",
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
        <div className="text-5xl flex items-center justify-center  font-serif">
          How it works
        </div>
        <p className="border-b-2 border-[#98CB4C] mx-auto w-14 mt-4"></p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mx-48">
        {serviceInfo.map((data, index) => (
          <div key={index} className=" flex justify-center">
            <div className="">
              <div className="flex justify-center">
                <img className="w-24 h-24" src={data.image} alt="" />
              </div>
              <div className="mt-2 flex justify-center">
                <h1 className="text-3xl mr-2 -mt-2 font-bold text-[#98CB4C]">
                  {index + 1}.
                </h1>
                <h1 className="text-xl font-semibold">{data.serviceName}</h1>
              </div>
              <p className="mt-2 text-sm text-center">{data.serviceInfo}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
