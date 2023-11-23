import React from "react";

type ButtonType = {
  children: React.ReactNode;
};

const SecondaryButton = (props: ButtonType) => {
  return <div className="text-white  relative mx-4   my-1   bg-no-repeat bg-gradient-to-r  hover:from-[#b4ca93] hover:to-[#919e7e]  hover:text-black border py-2 font-medium rounded-sm lg:px-16 md:px-4 px-2 uppercase">{props.children}</div>;
};

export default SecondaryButton;
