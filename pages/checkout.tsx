import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { checkoutFormSchema } from "@/utils/checkoutValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CheckoutFormSchemaType } from "@/utils/checkoutValidationForm";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";

const CheckoutPage = () => {
  const { register, setValue, handleSubmit, formState } =
    useForm<CheckoutFormSchemaType>({
      resolver: yupResolver(checkoutFormSchema),
    });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section>
      <h1 className='sr-only'>Checkout</h1>
      <div className='mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2'>
        <CheckoutSummary />
        <CheckoutForm
          submit={onSubmit}
          register={register}
          formState={formState}
        />
      </div>
    </section>
  );
};

export default CheckoutPage;
