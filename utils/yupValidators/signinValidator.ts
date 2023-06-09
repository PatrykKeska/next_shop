import * as yup from "yup";

export const signupSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export type signupSchemaType = yup.InferType<typeof signupSchema>;
