import React from "react";

type ButtonType = {
  children: React.ReactNode;
};

const PrimaryButton = (props: ButtonType) => {
  return <div className="relative text-black px-10 mx-4  py-2 my-1   bg-no-repeat bg-gradient-to-r hover:from-[#a1d84f] hover:to-[#98CB4C] text-xl bg-[#a1d84f]   font-serif rounded-lg ">{props.children}</div>;
};

export default PrimaryButton;
