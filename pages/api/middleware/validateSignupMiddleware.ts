import { SignupFormData } from "@/utils/yupValidators/SignupValidator";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { AnyObjectSchema } from "yup";

export function validateSignupMiddleware(
  schema: AnyObjectSchema,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      req.body = (await schema.validate(req.body)) as SignupFormData;
    } catch (error) {
      return res.status(422).json({ error: "validation goes wrong!" });
    }

    return await handler(req, res);
  };
}
