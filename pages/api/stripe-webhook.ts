import { StripeWebhookEvents } from "@/utils/types/stripeEvents";
import { NextApiHandler } from "next";

const StripeWebhook: NextApiHandler = async (req, res) => {
  console.log(req.body);

  const event = req.body as StripeWebhookEvents;

  switch (event.type) {
    case "checkout.session.completed":
      // @todo update the order in the graphCMS database
      event.data.object.id;
  }

  return res.status(204).end();
};

export default StripeWebhook;
