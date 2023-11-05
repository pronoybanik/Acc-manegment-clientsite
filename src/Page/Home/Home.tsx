import React from "react";
import Header from "../../Components/Header/Header";
import OurServices from "../../Components/OurServices/OurServices";
import OurProducts from "../../Components/OurProducts/OurProducts";

const Home = () => {
  return (
    <div>
      <Header />
      <OurServices />
      <OurProducts />
      <p className="mt-20 text-center font-bold">client review</p>
    </div>
  );
};

export default Home;
