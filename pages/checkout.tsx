import { useForm } from "react-hook-form";
import * as React from "react";
import { creditCardValidate } from "@/utils/creditCardValidate";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "@/components/checkout/FormInput";
import { useCartState } from "@/components/Cart/CartContext";

const checkoutFormSchema = yup
  .object({
    firstName: yup.string().required(),
    // lastName: yup.string().required(),
    // address: yup.string().required(),
    // apartment: yup.string().required(),
    // cardNumber: yup.string().required(),
    // city: yup.string().required(),
    // company: yup.string().required(),
    // cvc: yup.string().required(),
    // emailAddress: yup.string().email().required(),
    // expirationDate: yup.string().required(),
    // nameOnCard: yup.string().required(),
    // postalCode: yup.string().required(),
    // region: yup.string().required(),
    // sameAsShipping: yup.boolean().required(),
  })
  .required();
export type FormData = yup.InferType<typeof checkoutFormSchema>;

const CheckoutPage = () => {
  const { totalPrice } = useCartState();
  const { register, setValue, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(checkoutFormSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section>
      <h1 className='sr-only'>Checkout</h1>

      <div className='mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2'>
        <div className='bg-gray-50 py-12 md:py-24'>
          <div className='mx-auto max-w-lg space-y-8 px-4 lg:px-8'>
            <div className='flex items-center gap-4'>
              <span className='h-10 w-10 rounded-full bg-blue-700'></span>

              <h2 className='font-medium text-gray-900'>BambooYou</h2>
            </div>

            <div>
              <p className='text-2xl font-medium tracking-tight text-gray-900'>
                ${totalPrice}
              </p>

              <p className='mt-1 text-sm text-gray-600'>For the purchase of</p>
            </div>

            <div>
              <div className='flow-root'>
                <ul className='-my-4 divide-y divide-gray-100'>
                  <li className='flex items-center gap-4 py-4'>
                    <img
                      src='https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80'
                      alt=''
                      className='h-16 w-16 rounded object-cover'
                    />

                    <div>
                      <h3 className='text-sm text-gray-900'>
                        Basic Tee 6-Pack
                      </h3>

                      <dl className='mt-0.5 space-y-px text-[10px] text-gray-600'>
                        <div>
                          <dt className='inline'>Price:</dt>
                          <dd className='inline'>${"each item price"}</dd>
                        </div>
                        <div>
                          <dt className='inline'>Size:</dt>
                          <dd className='inline'>XXS</dd>
                        </div>

                        <div>
                          <dt className='inline'>Color:</dt>
                          <dd className='inline'>White</dd>
                        </div>
                      </dl>
                    </div>
                  </li>

                  <li className='flex items-center gap-4 py-4'>
                    <img
                      src='https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80'
                      alt=''
                      className='h-16 w-16 rounded object-cover'
                    />

                    <div>
                      <h3 className='text-sm text-gray-900'>
                        Basic Tee 6-Pack
                      </h3>

                      <dl className='mt-0.5 space-y-px text-[10px] text-gray-600'>
                        <div>
                          <dt className='inline'>Size:</dt>
                          <dd className='inline'>XXS</dd>
                        </div>

                        <div>
                          <dt className='inline'>Color:</dt>
                          <dd className='inline'>White</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white py-12 md:py-24'>
          <div className='mx-auto max-w-lg px-4 lg:px-8'>
            <form onSubmit={onSubmit} className='grid grid-cols-6 gap-4'>
              <div className='col-span-3'>
                <label
                  htmlFor='firstName'
                  className='block text-xs font-medium text-gray-700'
                >
                  First Name
                  <input
                    type='text'
                    {...register("firstName")}
                    className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                  />
                  <span className='text-red-500 text-sm font-bold'>
                    {formState.errors.firstName?.message}
                  </span>
                </label>
              </div>

              <div className='col-span-3'>
                <label
                  htmlFor='LastName'
                  className='block text-xs font-medium text-gray-700'
                >
                  Last Name
                </label>

                <input
                  type='text'
                  id='LastName'
                  className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                />
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='Email'
                  className='block text-xs font-medium text-gray-700'
                >
                  Email
                </label>

                <input
                  type='email'
                  id='Email'
                  className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                />
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='Phone'
                  className='block text-xs font-medium text-gray-700'
                >
                  Phone
                </label>

                <input
                  type='tel'
                  id='Phone'
                  className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm'
                />
              </div>

              <fieldset className='col-span-6'>
                <legend className='block text-sm font-medium text-gray-700'>
                  Card Details
                </legend>

                <div className='mt-1 -space-y-px rounded-md bg-white shadow-sm'>
                  <div>
                    <label htmlFor='CardNumber' className='sr-only'>
                      {" "}
                      Card Number{" "}
                    </label>

                    <input
                      type='text'
                      id='CardNumber'
                      placeholder='Card Number'
                      className='relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm'
                    />
                  </div>

                  <div className='flex'>
                    <div className='flex-1'>
                      <label htmlFor='CardExpiry' className='sr-only'>
                        {" "}
                        Card Expiry{" "}
                      </label>

                      <input
                        type='text'
                        id='CardExpiry'
                        placeholder='Expiry Date'
                        className='relative w-full rounded-es-md border-gray-200 focus:z-10 sm:text-sm'
                      />
                    </div>

                    <div className='-ms-px flex-1'>
                      <label htmlFor='CardCVC' className='sr-only'>
                        {" "}
                        Card CVC{" "}
                      </label>

                      <input
                        type='text'
                        id='CardCVC'
                        placeholder='CVC'
                        className='relative w-full rounded-ee-md border-gray-200 focus:z-10 sm:text-sm'
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className='col-span-6'>
                <legend className='block text-sm font-medium text-gray-700'>
                  Billing Address
                </legend>

                <div className='mt-1 -space-y-px rounded-md bg-white shadow-sm'>
                  <div>
                    <label htmlFor='Country' className='sr-only'>
                      Country
                    </label>

                    <select
                      id='Country'
                      className='relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm'
                    >
                      <option>England</option>
                      <option>Wales</option>
                      <option>Scotland</option>
                      <option>France</option>
                      <option>Belgium</option>
                      <option>Japan</option>
                    </select>
                  </div>

                  <div>
                    <label className='sr-only' htmlFor='PostalCode'>
                      {" "}
                      ZIP/Post Code{" "}
                    </label>

                    <input
                      type='text'
                      id='PostalCode'
                      placeholder='ZIP/Post Code'
                      className='relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm'
                    />
                  </div>
                </div>
              </fieldset>

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
      </div>
    </section>

    // <form className='flex flex-col gap-10' onSubmit={onSubmit}>
    //   <section className='flex flex-col gap-5'>
    //     <h2>Contact information</h2>
    //     <label className='flex flex-col h-10'>
    //       First Name
    //       <input {...register("firstName", { required: true })} />
    //       {
    //         <span className='text-red-500 text-sm font-bold'>
    //           {formState.errors.firstName?.message}
    //         </span>
    //       }
    //     </label>

    //     <label className='flex flex-col'>
    //       Last Name
    //       <input {...register("lastName")} />
    //     </label>

    //     <label className='flex flex-col'>
    //       Email
    //       <input {...register("emailAddress")} />
    //     </label>
    //   </section>

    //   <section className='flex flex-col gap-5'>
    //     <h2>Shipping address</h2>
    //     <label className='flex flex-col'>
    //       Region
    //       <input {...register("region")} />
    //     </label>

    //     <label className='flex flex-col'>
    //       City
    //       <input {...register("city")} />
    //     </label>

    //     <label className='flex flex-col'>
    //       Postal Code
    //       <input {...register("postalCode")} />
    //     </label>

    //     <label className='flex flex-col'>
    //       Address
    //       <input {...register("address")} />
    //     </label>

    //     <label className='flex flex-col'>
    //       Apartment
    //       <input {...register("apartment")} />
    //     </label>
    //   </section>

    //   <section className='flex flex-col gap-5'>
    //     <h2>Payment details</h2>
    //     <label className='flex flex-col'>
    //       <input {...register("apartment")} />
    //     </label>

    //     <label className='flex flex-col'>
    //       Card Number
    //       <input {...register("cardNumber")} />
    //     </label>

    //     <label className='flex flex-col'>
    //       Name On Card
    //       <input {...register("nameOnCard")} />
    //     </label>

    //     <section className='flex gap-5'>
    //       <label className='flex flex-col'>
    //         Expiration Date
    //         <input
    //           {...register("expirationDate", {
    //             required: true,
    //             validate: creditCardValidate,
    //             // pattern: /^(0[1-9]|1[0-2])\/[0-9]{2}$/
    //           })}
    //         />
    //         <span>{formState.errors.expirationDate?.message}</span>
    //         <FormInput useForm={{ register, formState }} />
    //       </label>

    //       <label className='flex flex-col'>
    //         CVC
    //         <input {...register("cvc")} />
    //       </label>
    //     </section>

    //     <label className='flex flex-col'>
    //       Same As Shipping
    //       <input type='checkbox' {...register("sameAsShipping")} />
    //     </label>
    //   </section>

    //   <button type='submit'>Submit</button>
    // </form>
  );
};

export default CheckoutPage;
