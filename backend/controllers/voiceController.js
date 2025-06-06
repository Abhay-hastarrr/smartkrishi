import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import translate from "@vitalets/google-translate-api"; // For language translation

export const processVoiceCommand = async (req, res) => {
  let { command, lang } = req.body;

  // If Hindi, translate it to English for processing
  if (lang === "hi-IN") {
    try {
      const translated = await translate(command, { from: "hi", to: "en" });
      command = translated.text;
    } catch (error) {
      console.error("Translation Error:", error);
      return res.json({ reply: "अनुवाद में समस्या हुई।" });
    }
  }

  let reply = "I didn't understand that command.";

  if (command.toLowerCase().includes("find product")) {
    const productName = command.replace("find product", "").trim();
    const product = await Product.findOne({ name: { $regex: productName, $options: "i" } });

    if (product) {
      reply = `I found ${product.name}, priced at ${product.price}.`;
    } else {
      reply = "Sorry, I couldn't find that product.";
    }
  }

  if (command.toLowerCase().includes("order status")) {
    const orderId = command.replace("order status", "").trim();
    const order = await Order.findById(orderId);

    if (order) {
      reply = `Your order is currently ${order.status}.`;
    } else {
      reply = "I couldn't find your order.";
    }
  }

  // If response is in Hindi, translate back
  if (lang === "hi-IN") {
    try {
      const translatedReply = await translate(reply, { from: "en", to: "hi" });
      reply = translatedReply.text;
    } catch (error) {
      console.error("Translation Error:", error);
      reply = "उत्तर देने में समस्या हो रही है।";
    }
  }

  return res.json({ reply });
};
