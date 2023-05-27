import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const email = req.body.email;
  if (typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (!process.env.MAILERLITE_API_KEY || !process.env.MAILERLITE_GROUP_ID) {
    return res.status(500).json({ error: "Unauthenticated request !" });
  }

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "X-MailerLite-ApiDocs": "true",
      "content-type": "application/json",
      "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY,
    },
    body: JSON.stringify({
      email,
    }),
  };

  const mailerliteResponse = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID}/subscribers`,
    options
  );

  if (!mailerliteResponse.ok) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  return res.status(201).json({ message: "Success" });
};

export default handler;
