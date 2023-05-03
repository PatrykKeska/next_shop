import {creditCardValidate} from "@/utils/creditCardValidate";
import * as React from "react";
import {FormData} from "@/pages/checkout";
import { FormState, UseFormRegister} from "react-hook-form";



interface FormInputProps {
useForm: {
    register: UseFormRegister<FormData>;
    formState: FormState<FormData>;
}
}



export const FormInput = ({useForm}: FormInputProps) => {
    const {register,formState} = useForm





    return (
        <>
            <input {...register("expirationDate",
                {
                    required: true,
                    validate: creditCardValidate,
                })}
            />
            <span>{formState.errors.expirationDate?.message}</span>

        </>
    )
}