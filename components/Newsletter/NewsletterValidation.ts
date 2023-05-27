import * as yup from "yup";

export const NewsletterValidationSchema = yup
  .object({
    email: yup.string().email().required("Email is required"),
  })
  .required();

export type NewsletterFormData = yup.InferType<
  typeof NewsletterValidationSchema
>;
