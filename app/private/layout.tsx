import React from "react";
import Logout from "../../components/site/logout";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Logout />
    </>
  );
}

export default PrivateLayout;
