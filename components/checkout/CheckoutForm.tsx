import { FormState, UseFormRegister } from "react-hook-form";
import { CheckoutFormSchemaType } from "@/utils/checkoutValidationForm";
import { FormInput } from "./FormInput";

interface CheckoutFormProps {
  submit: () => void;
  register: UseFormRegister<CheckoutFormSchemaType>;
  formState: FormState<CheckoutFormSchemaType>;
}

export const CheckoutForm = ({
  formState,
  submit,
  register,
}: CheckoutFormProps) => {
  return (
    <div className='bg-white py-12 md:py-24'>
      <div className='mx-auto max-w-lg px-4 lg:px-8'>
        <form onSubmit={submit} className='grid grid-cols-6 gap-4'>
          <div className='grid grid-cols-2 col-span-6 gap-2'>
            <FormInput
              useForm={{
                formState: formState,
                register,
                name: "firstName",
                type: "text",
                labelName: "First Name",
                size: "1",
              }}
            />
            <FormInput
              useForm={{
                formState: formState,
                register,
                name: "lastName",
                type: "text",
                labelName: "Last Name",
                size: "1",
              }}
            />
          </div>
          <FormInput
            useForm={{
              formState: formState,
              register,
              name: "emailAddress",
              type: "email",
              labelName: "Email",
              size: "6",
            }}
          />
          <FormInput
            useForm={{
              formState: formState,
              register,
              name: "phone",
              type: "tel",
              labelName: "Phone",
              size: "6",
            }}
          />
          <div className='grid col-span-6 grid-cols-2 gap-2'>
            <FormInput
              useForm={{
                formState: formState,
                register,
                name: "nameOnCard",
                type: "text",
                labelName: "Name on Card",
                size: "1",
              }}
            />

            <FormInput
              useForm={{
                formState: formState,
                register,
                name: "cardNumber",
                type: "text",
                labelName: "Card Number",
                size: "3",
              }}
            />
          </div>
          <div className='grid col-span-6 grid-cols-3 gap-1'>
            <FormInput
              useForm={{
                formState: formState,
                palceholder: "05",
                register,
                name: "expirationMonth",
                type: "text",
                labelName: "Month",
                size: "2",
              }}
            />

            <FormInput
              useForm={{
                formState: formState,
                palceholder: "24",
                register,
                name: "expirationYear",
                type: "text",
                labelName: "Year",
                size: "2",
              }}
            />

            <FormInput
              useForm={{
                formState: formState,
                palceholder: "444",
                register,
                name: "cvc",
                type: "text",
                labelName: "CVC",
                size: "2",
              }}
            />
          </div>
          <FormInput
            useForm={{
              formState: formState,
              register,
              name: "city",
              type: "text",
              labelName: "City",
              size: "6",
            }}
          />
          <FormInput
            useForm={{
              formState: formState,
              register,
              name: "street",
              type: "text",
              labelName: "Street",
              size: "6",
            }}
          />
          <FormInput
            useForm={{
              formState: formState,
              register,
              name: "apartmentNumber",
              type: "text",
              labelName: "Apartment Number",
              size: "6",
            }}
          />
          <FormInput
            useForm={{
              formState: formState,
              register,
              name: "postalCode",
              type: "text",
              labelName: "Postal Code",
              size: "6",
            }}
          />

          <div className='col-span-6'>
            <button
              type='submit'
              className='block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg'
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
