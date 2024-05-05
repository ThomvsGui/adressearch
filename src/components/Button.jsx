import clsx from "clsx";

const variants = {
  primary: "bg-orange-400 active:bg-orange-500 text-black font-mono",
  danger: "bg-red-500 active:bg-red-600 text-white font-mono",
};

const sizes = {
  md: "text-sm px-2 py-1",
  lg: "text-lg font-semibold px-4 py-3",
};

export const Button = ({
  className,
  variant = "primary",
  size = "lg",
  ...otherProps
}) => (
  <button
    className={clsx(variants[variant], sizes[size], "rounded-xl", className)}
    {...otherProps}
  />
);
