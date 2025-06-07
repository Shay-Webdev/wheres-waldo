import { type ButtonHTMLAttributes } from "react";

type CustomBtnProps = {
  buttonExtraStyle?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const CustomButton = (props: CustomBtnProps) => {
  const { className, buttonExtraStyle, children, ...rest } = props;
  return (
    <button className={`${className} ${buttonExtraStyle}`} {...rest}>
      {children}
    </button>
  );
};
const MyButton = (props: CustomBtnProps) => {
  const { children, buttonExtraStyle, ...rest } = props;
  const customBtnStyle = `button`;
  return (
    <CustomButton
      children={children}
      className={customBtnStyle}
      buttonExtraStyle={buttonExtraStyle}
      {...rest}
    ></CustomButton>
  );
};
export { CustomButton, MyButton };
