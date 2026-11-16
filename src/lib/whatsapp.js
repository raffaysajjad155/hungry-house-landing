import { site } from "@/data/siteConfig";

export const waLink = (lines) => {
  const text = Array.isArray(lines) ? lines.join("\n") : lines;
  return `https://wa.me/${site.waNumber}?text=${encodeURIComponent(text)}`;
};

export const msgGeneric = () => "Hi Hungry House! I'd like to place an order.";

export const msgItem = (name, price, label) =>
  waLink([
    `Hi Hungry House! I'd like to order: 1 × ${name}${label ? ` (${label})` : ""} — Rs ${price}.`,
    "Name: ",
    "Address: ",
  ]);

export const msgDeal = (deal) =>
  waLink([
    `Hi Hungry House! I'd like ${deal.name} (${deal.includes.join(" + ")}) — Rs ${deal.price}.`,
    "Name: ",
    "Address: ",
  ]);

export const msgMidnight = (deal) =>
  waLink([
    `Hi Hungry House! Midnight Deal ${deal.name} (${deal.includes.join(" + ")}) — Rs ${deal.price}.`,
    "Name: ",
    "Address: ",
  ]);

export const msgPizza = (name, label, price) =>
  waLink([
    `Hi Hungry House! I'd like to order: 1 × ${name} Pizza (${label}) — Rs ${price}.`,
    "Name: ",
    "Address: ",
  ]);