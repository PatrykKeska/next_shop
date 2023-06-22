import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export const isSessionExist = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return false;
  } else {
    return true;
  }
};
