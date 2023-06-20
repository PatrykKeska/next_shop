import { loadStripe } from "@stripe/stripe-js";
import { NextRouter } from "next/router";
import { CartItem } from "@/graphql/generated/graphql";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const payForItems = async (
  session: any,
  items: CartItem[],
  router: NextRouter
) => {
  console.log("this is arr", items);
  if (session.status === "authenticated") {
    const stripe = await stripePromise;
    if (!stripe) {
      return new Error("Stripe is not loaded");
    }
    const res = await fetch("/api/checkout", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(
        items.map(({ quantity, product }) => {
          return {
            slug: product?.slug,
            count: quantity,
          };
        })
      ),
    });
    if (res.status === 401) {
      router.push("/auth/signin");
    } else {
      const { sessionId } = await res.json();
      await stripe.redirectToCheckout({ sessionId });
    }
  }
};
