import { useState, useEffect } from "react";
import SecondaryButton from "../../Shared/Buttons/SecondryButton";

const ImageBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://images.pexels.com/photos/7890065/pexels-photo-7890065.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/196643/pexels-photo-196643.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1367242/pexels-photo-1367242.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
    <div className="relative w-full h-[650px] ">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={`absolute rounded-lg top-0 left-0 object-cover w-full h-full transition-opacity duration-1000  ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="flex items-center justify-center h-full">
        <div className="relative px-2">
          <p className="text-white lg:text-5xl  text-4xl font-serif font-semibold my-6 max-w-md sm:text-xl/relaxed">
            Organic Products
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
            <SecondaryButton>shop</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageBanner;
