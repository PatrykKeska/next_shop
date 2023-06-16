import { ReviewFormSchemaType } from "@/utils/yupValidators/reviewValidator";
import { FormState, UseFormRegister } from "react-hook-form";

interface ReviewInputProps {
  label: string;
  name: keyof ReviewFormSchemaType;
  register: UseFormRegister<ReviewFormSchemaType>;
  formState: FormState<ReviewFormSchemaType>;
  textArea?: boolean;
}

export const ReviewInput = ({
  label,
  name,
  register,
  formState,
  textArea,
}: ReviewInputProps) => {
  return !textArea ? (
    <div>
      <label className='sr-only' htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, { required: true })}
        className='w-full rounded-lg border-gray-200 p-3 text-sm'
        placeholder={label}
        type='text'
        id={name}
      />
      {formState.errors[name] && (
        <>
          <span className='text-red-500'>
            {formState.errors[name]?.message}
          </span>
        </>
      )}
    </div>
  ) : (
    <div>
      <label className='sr-only' htmlFor={label}>
        Review
      </label>

      <textarea
        {...register(name, { required: true })}
        className='w-full rounded-lg border-gray-200 p-3 text-sm'
        placeholder={label}
        rows={8}
        id={label}
      ></textarea>
      {formState.errors[name] && (
        <>
          <span className='text-red-500'>
            {formState.errors[name]?.message}
          </span>
        </>
      )}
    </div>
  );
};
