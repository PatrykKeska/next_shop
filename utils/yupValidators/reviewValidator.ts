import { type } from "os";
import * as yup from "yup";

export const reviewFormSchema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required").min(2).max(50).trim(),
    headline: yup.string().required("Title is required").min(2).max(100).trim(),
    email: yup.string().email("Email is invalid").required("Email is required"),
    rating: yup.number().required("Rating is required").min(1).max(5),
    content: yup.string().required("Review is required").min(2).max(500).trim(),
  })
  .required();

export type ReviewFormSchemaType = yup.InferType<typeof reviewFormSchema>;

export interface ReviewFormApiType extends ReviewFormSchemaType {
  slug: string;
}
