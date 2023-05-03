
import {useForm} from "react-hook-form";
import * as React from "react";
import {creditCardValidate} from "@/utils/creditCardValidate";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {FormInput} from "@/components/checkout/FormInput";


// export type FormDataType = {
//     firstName: string;
//     lastName: string;
//     address: string;
//     apartment: string;
//     cardNumber: string;
//     city: string;
//     company: string;
//     cvc: string;
//     emailAddress: string;
//     expirationDate: string;
//     nameOnCard: string;
//     postalCode: string;
//     region: string;
//     sameAsShipping: boolean;
//
// };


const checkoutFormSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
    apartment: yup.string().required(),
    cardNumber: yup.string().required(),
    city: yup.string().required(),
    company: yup.string().required(),
    cvc: yup.string().required(),
    emailAddress: yup.string().email().required(),
    expirationDate: yup.string().required(),
    nameOnCard: yup.string().required(),
    postalCode: yup.string().required(),
    region: yup.string().required(),
    sameAsShipping: yup.boolean().required(),
}).required();
export type FormData = yup.InferType<typeof checkoutFormSchema>;

const CheckoutPage = () => {

    const {
        register,
        setValue,
        handleSubmit,
        formState
    } = useForm<FormData>({
        resolver: yupResolver(checkoutFormSchema)
    });


    const onSubmit = handleSubmit(data => console.log(data));


    return (
        <form className='flex flex-col gap-10' onSubmit={onSubmit}>
            <section className='flex flex-col gap-5'>
                <h2>Contact information</h2>
            <label className='flex flex-col h-10' >First Name
                <input {...register("firstName", {required: true})} />
                {<span className='text-red-500 text-sm font-bold'>{formState.errors.firstName?.message}</span>}
            </label>

            <label className='flex flex-col'>Last Name
                <input {...register("lastName")} />
            </label>

            <label className='flex flex-col'>Email
                <input {...register("emailAddress")} />
            </label>
            </section>

            <section className='flex flex-col gap-5'>
                <h2>Shipping address</h2>
            <label className='flex flex-col'>Region
                <input {...register("region")} />
            </label>

            <label className='flex flex-col'>City
                <input {...register("city")} />
            </label>

            <label className='flex flex-col'>Postal Code
                <input {...register("postalCode")} />
            </label>

            <label className='flex flex-col'>Address
                <input {...register("address")} />
            </label>

            <label className='flex flex-col'>Apartment
                <input {...register("apartment")} />
            </label>
            </section>

            <section className='flex flex-col gap-5'>
                <h2>Payment details</h2>
            <label className='flex flex-col'>
                <input {...register("apartment")} />
            </label>

            <label className='flex flex-col'>Card Number
                <input {...register("cardNumber")} />
            </label>

            <label className='flex flex-col'>Name On Card
                <input {...register("nameOnCard")} />
            </label>

                <section className='flex gap-5'><label className='flex flex-col'>Expiration Date
                    <input {...register("expirationDate",
                        {required: true,
                            validate: creditCardValidate,
                            // pattern: /^(0[1-9]|1[0-2])\/[0-9]{2}$/
                        })}
                    />
                    <span>{formState.errors.expirationDate?.message}</span>
                    <FormInput  useForm={{register, formState}}/>
                </label>

                    <label className='flex flex-col'>CVC
                        <input {...register("cvc")} />
                    </label></section>


            <label className='flex flex-col'>Same As Shipping
                <input type='checkbox' {...register("sameAsShipping")} />
            </label>
            </section>

            <button
                type="submit"

            >
                Submit
            </button>
        </form>
    );
}

export default CheckoutPage