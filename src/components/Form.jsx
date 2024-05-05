import clsx from "clsx"
import { Form as FormikForm } from "formik"
import { twMerge } from "tailwind-merge"

export const Form = ({ className, ...otherProps }) => (
  <FormikForm
    className={twMerge(clsx("flex flex-col gap-4", className))}
    noValidate
    {...otherProps}
  />
)
