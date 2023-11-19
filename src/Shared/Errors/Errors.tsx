import React from "react";

type errorProps = {
  children: React.ReactNode;
};

const Errors = (props: errorProps) => {
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-red-500 bg-red-50 p-4"
    >
      <strong className="block font-medium text-red-800">
        {props.children}
      </strong>

      {/* <p className="mt-2 text-sm text-red-700">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quasi
        assumenda numquam deserunt consectetur autem nihil quos debitis dolor
        culpa.
      </p> */}
    </div>
  );
};

export default Errors;
