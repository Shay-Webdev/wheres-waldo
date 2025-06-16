import React from "react";
import { NavLink, type NavLinkProps } from "react-router-dom";

type myLinkProps = {
  children: React.ReactNode;
  activeColor: string;
  inactiveColor: string;
  activeBGColor: string;
  inactiveBGColor: string;
} & NavLinkProps;
const CustomNavLink = (props: myLinkProps) => {
  const {
    activeColor,
    inactiveColor,
    children,
    to,
    activeBGColor,
    inactiveBGColor,
    className,
    ...rest
  } = props;
  return (
    <NavLink
      {...rest}
      to={to}
      className={({ isActive }) => {
        const stateClasses = isActive
          ? [activeColor, activeBGColor]
          : [inactiveColor, inactiveBGColor];

        // build a single array of all class segments, then filter out any empty string
        return [...stateClasses, className ?? ""]
          .filter((cls) => !!cls)
          .join(" ");
      }}
    >
      {children}
    </NavLink>
  );
};

const MyNavLink = (props: Pick<myLinkProps, "to" | "children">) => {
  const { children, to } = props;
  return (
    <CustomNavLink
      to={to}
      activeColor="text-fuchsia"
      inactiveColor="text-white"
      activeBGColor="bg-fuchsia-400"
      inactiveBGColor="bg-fuchsia-900"
      className={`p-1 rounded-md`}
    >
      {children}
    </CustomNavLink>
  );
};

export { MyNavLink, CustomNavLink };
