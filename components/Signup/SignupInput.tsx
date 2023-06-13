import { SignupFormData } from "@/utils/yupValidators/SignupValidator";
import { FieldErrors } from "react-hook-form";

interface SignupInputProps {
  register: any;
  name: keyof SignupFormData;
  label: string;
  errors: FieldErrors<SignupFormData>;
  email?: boolean;
  password?: boolean;
}

export const SignupInput = ({
  register,
  name,
  errors,
  label,
  email,
  password,
}: SignupInputProps) => {
  const inputType = email ? "email" : password ? "password" : "text";
  return (
    <>
      <div className={`col-span-6 ${!email && "sm:col-span-3"}`}>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-700'
        >
          {label}
        </label>

        <input
          {...register(name)}
          type={inputType}
          id={name}
          name={name}
          className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
        />
        {errors[name] && (
          <p className='text-red-500'>{errors[name]?.message}</p>
        )}
      </div>
    </>
  );
};
