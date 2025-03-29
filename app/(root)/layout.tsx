import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  console.log("this is root layout");
  return <div className="">{children}</div>;
};

export default RootLayout;
