import * as yup from "yup";

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const cvcRegExp = /^[0-9]{3,4}$/;
export const cardNumberRegExp = /^[0-9]{16}$/;

export const checkoutFormSchema = yup
  .object({
    firstName: yup.string().required("Please enter your first name"),
    lastName: yup.string().required("Please enter your last name"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required(),
    cardNumber: yup
      .string()
      .matches(cardNumberRegExp, { message: "Please enter your card number" })
      .required(),
    city: yup.string().required("Please enter your city"),
    street: yup.string().required("Please enter your street"),
    apartmentNumber: yup
      .string()
      .required("Please enter your apartment number"),
    postalCode: yup.string().required("Please enter your postal code"),
    cvc: yup
      .string()
      .matches(cvcRegExp, { message: "Invalid CVC number format" })
      .required(),
    emailAddress: yup
      .string()
      .email()
      .required("Please enter your email address"),
    expirationMonth: yup
      .number()
      .min(0)
      .max(12)
      .transform((value, orginalValue) => {
        if (typeof orginalValue === "string") {
          const parsedValue = parseInt(orginalValue, 10);
          return isNaN(parsedValue) ? undefined : parsedValue;
        }
        return value;
      })
      .required("Please enter your card's expiration month"),
    expirationYear: yup
      .number()
      .min(23)
      .max(40)
      .transform((value, orginalValue) => {
        if (typeof orginalValue === "string") {
          const parsedValue = parseInt(orginalValue, 10);
          return isNaN(parsedValue) ? undefined : parsedValue;
        }
        return value;
      })
      .required("Please enter your card's expiration year"),
    nameOnCard: yup.string().required("Please enter the name on your card"),
  })
  .required();
export type FormData = yup.InferType<typeof checkoutFormSchema>;
