import * as React from "react";
import { FormState, UseFormRegister } from "react-hook-form";
import { CheckoutFormSchemaType } from "@/utils/checkoutValidationForm";

interface FormInputProps {
  useForm: {
    register: UseFormRegister<CheckoutFormSchemaType>;
    formState: FormState<CheckoutFormSchemaType>;
    palceholder?: string;
    name: keyof CheckoutFormSchemaType;
    type:
      | "text"
      | "number | password"
      | "email"
      | "tel"
      | "cardNumber"
      | "cvc"
      | "expirationYear"
      | "expirationMonth"
      | "nameOnCard"
      | "city"
      | "street"
      | "apartmentNumber"
      | "postalCode";
    labelName: string;
    size: string;
  };
}

export const FormInput = ({ useForm }: FormInputProps) => {
  const { register, formState, name, type, labelName, size, palceholder } =
    useForm;
  return (
    <>
      <div className={`col-span-${size}`}>
        <label
          htmlFor={name}
          className='block text-xs font-medium text-gray-700'
        >
          {labelName}
          <input
            placeholder={palceholder}
            type={type}
            {...register(name, { required: true })}
            className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
          />
          {type === "tel" && formState.errors.phone ? (
            <span className='text-red-500 text-sm font-bold'>
              {formState.errors.phone?.message}
            </span>
          ) : (
            <span className='text-red-500 text-sm font-bold'>
              {formState.errors[name]?.message}
            </span>
          )}
        </label>
      </div>
    </>
  );
};
