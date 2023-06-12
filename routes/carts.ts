import { Response } from "express";
import { Cart, validateCartItem as validate } from "../models/Cart";
import { CustomRequest } from "../types/CustomRequest";
import { Food } from "../models/Food";
import express from "express";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", auth, async (req: CustomRequest, res: Response) => {
  if (!req.body.user) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const cart = await Cart.findOne({ user: req.body.user._id });
    if (!cart) {
      return res.status(404).send("Cart not found");
    }
    return res.send(cart);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

router.post("/", auth, async (req: CustomRequest, res: Response) => {
  const { user, foodId, quantity } = req.body;

  function sendError(status: number, message: string) {
    return res.status(status).send(message);
  }

  if (!user) {
    return sendError(401, "Unauthorized");
  }

  if (!foodId || typeof quantity === "undefined") {
    return sendError(400, "Please provide a foodId and quantity.");
  }

  const food = await Food.findById(foodId);

  if (!food) {
    return sendError(404, "The food with the given id was not found");
  }

  const { error } = validate({ ...food.toObject(), quantity });
  if (error) {
    return sendError(400, error.message);
  }

  try {
    let cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      cart = new Cart({ user: user._id, items: [] });
    }

    const cartItem = cart.items.find((item) => item._id.toString() === foodId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ ...food.toObject(), _id: food._id, quantity });
    }

    await cart.save();
    return res.send(cart);
  } catch (err) {
    console.error(err);
    return sendError(500, "Server error");
  }
});

router.delete("/:foodId", auth, async (req: CustomRequest, res: Response) => {
  if (!req.body.user) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const cart = await Cart.findOne({ user: req.body.user._id });
    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === req.params.foodId
    );

    if (itemIndex === -1) {
      return res.status(404).send("Item not found in the cart");
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    return res.send(cart);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});
// fixa skiten.
export default router;
