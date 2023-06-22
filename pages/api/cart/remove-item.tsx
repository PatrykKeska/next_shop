import { AddCartItemType } from "@/utils/types/Cart";
import { NextApiHandler } from "next";
import { isProductExist } from "./isProductExist";
import { updateExistingProductQuantity } from "./updateExistingProductQuantity";
import { isSessionExist } from "../auth/isSessionExist";

const removeItem: NextApiHandler = async (req, res) => {
  const { email, quantity, slug } = req.body as AddCartItemType;

  const isUserSessionExist = await isSessionExist(req, res);
  // if (!isUserSessionExist) {
  // return res.status(401).json({ message: "User session not found" });
  // } else {
  const isProductExistDB = await isProductExist(slug);
  if (!isProductExistDB) {
    return res.status(400).json({ message: "Product not found" });
  } else {
    updateExistingProductQuantity(email, slug, "-");
    return res.status(200).json({ message: "Product quantity updated" });
  }
  // }
};

export default removeItem;
