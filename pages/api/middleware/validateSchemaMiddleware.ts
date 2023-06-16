import { SignupFormData } from "@/utils/yupValidators/SignupValidator";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { AnyObjectSchema } from "yup";

export function validateSchemaMiddleware(
  schema: AnyObjectSchema,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      req.body = await schema.validate(req.body);
    } catch (error) {
      return res.status(422).json({ error: "validation goes wrong!" });
    }

    return await handler(req, res);
  };
}
