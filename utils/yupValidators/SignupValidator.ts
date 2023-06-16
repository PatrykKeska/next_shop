import * as yup from "yup";

export const SignupSchema = yup
  .object()
  .shape({
    firstName: yup.string().min(2).required("First name is required"),
    lastName: yup.string().min(2).required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6).required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
  })
  .required();

export type SignupFormData = yup.InferType<typeof SignupSchema>;
