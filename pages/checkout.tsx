import { useCartState } from "@/components/Cart/CartContext";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { checkoutFormSchema } from "@/utils/checkoutValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormData } from "@/utils/checkoutValidationForm";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";

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
