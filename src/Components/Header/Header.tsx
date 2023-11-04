import React, { useState, useEffect } from "react";

const ImageBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://images.pexels.com/photos/7890065/pexels-photo-7890065.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3039069/pexels-photo-3039069.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  

  return (
    <div className="relative w-full h-[600px] ">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000  ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="flex items-center justify-center h-full"
      >
        <div className="relative">
          <p className="text-white lg:text-5xl md:text-3xl text-2xl font-semibold mt-4 mb-6 max-w-sm sm:text-xl/relaxed">
            Organic products
          </p>
          <p className="text-white font-sans text-xm max-w-screen-md ">
            Vegetables are nutritious, essential components of a healthy diet.
            They come in various colors, shapes, and flavors, providing a wide
            range of vitamins, minerals, and fiber. Popular vegetables include
            carrots, broccoli, spinach, and tomatoes. Incorporating a diverse
            selection of veggies into your meals promotes overall well-being and
            supports a balanced diet.
          </p>

          <div className="flex items-center justify-center gap-2 mt-8 ">
            <button className="text-white font-sans border py-2 rounded-sm lg:px-16 md:px-4 px-2 uppercase">
              shop
            </button>
            {/* <PrimaryButton>Make A Appointment</PrimaryButton>
            <PrimaryButton>View Department</PrimaryButton> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageBanner;
