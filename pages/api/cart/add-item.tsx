import { AddCartItemType } from "@/utils/types/Cart";
import { NextApiHandler } from "next";
import { updateExistingProductQuantity } from "./updateExistingProductQuantity";
import { addNewProductToCart } from "./addNewProductToCart";
import { isProductExist } from "./isProductExist";
import { isSessionExist } from "../auth/isSessionExist";

const AddItem: NextApiHandler = async (req, res) => {
  const { email, slug, quantity } = req.body as AddCartItemType;
  const isUserSessionExist = await isSessionExist(req, res);
  // if (!isUserSessionExist) {
  //   return res.status(401).json({ message: "User session not found" });
  // } else {
  const isProductExistInDatabase = await isProductExist(slug);
  if (isProductExistInDatabase) {
    const updateExistingProduct = await updateExistingProductQuantity(
      email,
      slug,
      "+"
    );
    if (updateExistingProduct) {
      return res.status(200).json({ message: "Product quantity updated" });
    } else if (!updateExistingProduct) {
      const addNewProduct = await addNewProductToCart(email, slug, quantity);
      if (addNewProduct) {
        return res.status(200).json({ message: "Product added to cart" });
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    }
  } else {
    return res.status(400).json({ message: "Product not found" });
  }
};
// };
export default AddItem;
