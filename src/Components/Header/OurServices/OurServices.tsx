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
      <div className="text-5xl flex items-center justify-center my-14 font-serif">
        How it works
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mx-36">
        {serviceInfo.map((data, index) => (
          <div className=" flex justify-center">
            <div className="">
              <div className="">
                <img className="w-24 h-24" src={data.image} alt="" />
              </div>
              <h1 className="mt-2">
                {index + 1}. {data.serviceName}
              </h1>
              <p className="w-96 mt-2 text-sm">{data.serviceInfo}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
