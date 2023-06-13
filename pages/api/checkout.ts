import { apolloClient } from "@/graphql/apolloClient";
import {
  GetProductBySlugDocument,
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
} from "@/graphql/generated/graphql";
import { NextApiHandler } from "next";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const checkoutHandler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      res.status(500).json({ message: "missing stripe key!" });
      return;
    }
    const body = req.body as {
      slug: string;
      count: number;
    }[];

    const products = await Promise.all(
      body.map(async (cartItem) => {
        const product = await apolloClient.query<
          GetProductBySlugQuery,
          GetProductBySlugQueryVariables
        >({
          query: GetProductBySlugDocument,
          variables: {
            slug: cartItem.slug,
          },
        });
        return {
          product,
          count: cartItem.count,
        };
      })
    );

    const stripe = new Stripe(stripeKey, { apiVersion: "2022-11-15" });
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "pl",
      payment_method_types: ["card", "p24"],
      success_url:
        "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/checkout/cancel",
      line_items: products.map((product) => {
        return {
          price_data: {
            currency: "pln",
            product_data: {
              name: product.product.data.product!.name,
              images: [product.product.data.product!.images[0].url],
              metadata: {
                slug: product.product.data.product!.slug,
              },
            },
            unit_amount: product.product.data.product!.price,
          },
          quantity: product.count,
        };
      }),
    });
    res.status(201).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.status(401).json({ message: "unauthenticated" });
  }
};

export default checkoutHandler;
