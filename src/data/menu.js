// Hungry House menu — transcribed from the printed menu dated 13 Oct 2026.
// Prices are PKR. Do not edit item names or prices without the client's confirmation.

export const currencySymbol = "Rs";
export const menuVersion = "2026-10-13";
export const priceRange = "Rs 60 – Rs 3000";

export const uiTabs = [
  { id: "all", label: "All", categories: null },
  { id: "deals", label: "Deals", categories: ["deals", "midnight-deals"] },
  { id: "burgers", label: "Burgers", categories: ["burgers", "house-of-smash"] },
  { id: "pizza", label: "Pizza", categories: ["pizza-regular", "pizza-premium", "pizza-specialty"] },
  { id: "wings", label: "Wings", categories: ["wings"] },
  { id: "wraps-rolls", label: "Wraps & Rolls", categories: ["wraps", "shawarma", "paratha-roll"] },
  { id: "pasta", label: "Pasta", categories: ["pasta"] },
  { id: "fish-fries", label: "Fish & Fries", categories: ["fish", "fries"] },
  { id: "specials", label: "Specials", categories: ["specials"] },
  { id: "drinks", label: "Drinks", categories: ["beverages"] },
];

const burgerAddOns = [
  { name: "Dip Sauce", price: 100 },
  { name: "Cheese Slice", price: 100 },
  { name: "Buddy (Coke)", price: 90 },
];

const pizzaAddOns = [
  { name: "Sauce", price: 100 },
  { name: "Cheese", price: 200 },
  { name: "Chicken", price: 200 },
];

export const categories = [
  {
    id: "deals",
    name: "Special Deals",
    source: "p7",
    items: [
      { id: "deal-01", name: "Deal 01", price: 2000, includes: ["5 Zinger Burgers", "1.5 Ltr Drink"] },
      { id: "deal-02", name: "Deal 02", price: 1100, includes: ["2 Small Pizza", "2 Buddy Pack Drink"] },
      { id: "deal-03", name: "Deal 03", price: 2100, includes: ["2 Medium Pizza", "1 Ltr Drink"] },
      { id: "deal-04", name: "Deal 04", price: 3000, includes: ["2 Large Pizza", "1.5 Ltr Drink"] },
      { id: "deal-05", name: "Deal 05", price: 1100, includes: ["2 Zinger Burgers", "1 Regular Fries", "2 Buddy Pack"] },
      { id: "deal-06", name: "Deal 06", price: 600, includes: ["1 Zinger Burger", "1 Fries", "1 Buddy Pack"] },
      { id: "deal-07", name: "Deal 07", price: 500, includes: ["1 Chicken Burger", "1 Fries", "1 Buddy Pack"] },
    ],
  },
  {
    id: "midnight-deals",
    name: "Midnight Deals",
    note: "Available 11 PM till close",
    source: "p7",
    items: [
      { id: "m-deal-01", name: "M-Deal 01", price: 550, includes: ["1 Small Pizza", "1 Buddy Pack"] },
      { id: "m-deal-02", name: "M-Deal 02", price: 1100, includes: ["1 Medium Pizza", "1 Buddy Pack"] },
      { id: "m-deal-03", name: "M-Deal 03", price: 1500, includes: ["1 Large Pizza", "1 Ltr Drink"] },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    source: "p4",
    addOns: burgerAddOns,
    items: [
      { id: "zinger-burger", name: "Zinger Burger", price: 400 },
      { id: "mighty-burger", name: "Mighty Burger", price: 650 },
      { id: "chicken-burger", name: "Chicken Burger", price: 290 },
      { id: "jalapeno-grill-burger", name: "Jalapeno Grill Burger", price: 480 },
      { id: "hungry-special-grilled-burger", name: "Hungry Special Grilled Burger", price: 550 },
    ],
  },
  {
    id: "house-of-smash",
    name: "House of Smash",
    source: "p4",
    items: [
      {
        id: "classic-beef-burger",
        name: "Classic Beef Burger",
        variants: [
          { label: "Single Patty", price: 680 },
          { label: "Double Patty", price: 980 },
        ],
      },
      {
        id: "smoky-beef-burger",
        name: "Smoky Beef Burger",
        variants: [
          { label: "Single Patty", price: 700 },
          { label: "Double Patty", price: 1000 },
        ],
      },
    ],
  },
  {
    id: "pizza-regular",
    name: "Pizza — Regular Flavours",
    source: "p5",
    addOns: pizzaAddOns,
    items: [
      { id: "chicken-tikka", name: "Chicken Tikka", variants: [{ label: "Small", price: 500 }, { label: "Medium", price: 1000 }, { label: "Large", price: 1400 }] },
      { id: "chicken-fajita", name: "Chicken Fajita", variants: [{ label: "Small", price: 500 }, { label: "Medium", price: 1000 }, { label: "Large", price: 1400 }] },
      { id: "cheese-lover", name: "Cheese Lover", variants: [{ label: "Small", price: 500 }, { label: "Medium", price: 1000 }, { label: "Large", price: 1400 }] },
      { id: "veggie-lover", name: "Veggie Lover", variants: [{ label: "Small", price: 500 }, { label: "Medium", price: 1000 }, { label: "Large", price: 1400 }] },
      { id: "supreme-pizza", name: "Supreme Pizza", variants: [{ label: "Small", price: 500 }, { label: "Medium", price: 1000 }, { label: "Large", price: 1400 }] },
    ],
  },
  {
    id: "pizza-premium",
    name: "Pizza — Premium Flavours",
    source: "p5",
    addOns: pizzaAddOns,
    items: [
      { id: "hungry-special-pizza", name: "Hungry Special Pizza", variants: [{ label: "Small", price: 550 }, { label: "Medium", price: 1100 }, { label: "Large", price: 1500 }] },
      { id: "bonfire-pizza", name: "Bonfire Pizza", variants: [{ label: "Small", price: 550 }, { label: "Medium", price: 1100 }, { label: "Large", price: 1500 }] },
      { id: "behari-kabab", name: "Behari Kabab", variants: [{ label: "Small", price: 550 }, { label: "Medium", price: 1100 }, { label: "Large", price: 1500 }] },
      { id: "creamy-melt", name: "Creamy Melt", variants: [{ label: "Small", price: 550 }, { label: "Medium", price: 1100 }, { label: "Large", price: 1500 }] },
      { id: "malai-boti", name: "Malai Boti", variants: [{ label: "Small", price: 550 }, { label: "Medium", price: 1100 }, { label: "Large", price: 1500 }] },
      { id: "peri-peri", name: "Peri Peri", variants: [{ label: "Small", price: 550 }, { label: "Medium", price: 1100 }, { label: "Large", price: 1500 }] },
      { id: "cocktail-pizza", name: "Cocktail Pizza", variants: [{ label: "Small", price: 550 }, { label: "Medium", price: 1100 }, { label: "Large", price: 1500 }] },
    ],
  },
  {
    id: "pizza-specialty",
    name: "Pizza — Specialty & Crust",
    source: "p6",
    items: [
      { id: "hunger-extreme-special", name: "Hunger Extreme Special", variants: [{ label: "Medium", price: 1350 }, { label: "Large", price: 1750 }] },
      { id: "crown-crust-pizza", name: "Crown Crust Pizza", variants: [{ label: "Medium", price: 1250 }, { label: "Large", price: 1650 }] },
      { id: "square-pizza", name: "Square Pizza", variants: [{ label: "Medium", price: 1350 }, { label: "Large", price: 1850 }] },
      { id: "kabab-crust-pizza", name: "Kabab Crust Pizza", variants: [{ label: "Small", price: 700 }, { label: "Medium", price: 1250 }, { label: "Large", price: 1800 }] },
      { id: "cheese-crust-pizza", name: "Cheese Crust Pizza", variants: [{ label: "Small", price: 700 }, { label: "Medium", price: 1250 }, { label: "Large", price: 1800 }] },
    ],
  },
  {
    id: "wings",
    name: "Wings",
    source: "p2",
    items: [
      { id: "hot-wings", name: "Hot Wings", variants: [{ label: "6 Pcs", price: 380 }, { label: "12 Pcs", price: 680 }] },
      { id: "bbq-wings", name: "BBQ Wings", variants: [{ label: "6 Pcs", price: 400 }, { label: "12 Pcs", price: 750 }] },
      { id: "honey-wings", name: "Honey Wings", variants: [{ label: "6 Pcs", price: 480 }, { label: "12 Pcs", price: 800 }] },
      { id: "nuggets", name: "Nuggets", variants: [{ label: "6 Pcs", price: 300 }, { label: "12 Pcs", price: 550 }] },
    ],
  },
  {
    id: "wraps",
    name: "Wraps",
    source: "p2",
    items: [
      { id: "hungry-special-grilled-wrap", name: "Hungry Special Grilled Wrap", price: 700 },
      { id: "turkish-wrap", name: "Turkish Wrap", price: 620 },
      { id: "jalapeno-wrap", name: "Jalapeno Wrap", price: 550 },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    source: "p2",
    items: [
      { id: "hungry-special-pasta", name: "Hungry Special Pasta", price: 750 },
      { id: "alfredo-pasta", name: "Alfredo Pasta", price: 750 },
      { id: "crunchy-pasta", name: "Crunchy Pasta", price: 750 },
      { id: "flaming-pasta", name: "Flaming Pasta", price: 600 },
    ],
  },
  {
    id: "shawarma",
    name: "Shawarma",
    source: "p3",
    items: [
      { id: "fajita-shawarma", name: "Fajita Shawarma", price: 450 },
      { id: "zinger-shawarma", name: "Zinger Shawarma", price: 400 },
      { id: "chunks-shawarma", name: "Chunks Shawarma", price: 280 },
    ],
  },
  {
    id: "paratha-roll",
    name: "Paratha Roll",
    source: "p3",
    items: [
      { id: "hungry-grilled-paratha", name: "Hungry Grilled Paratha", price: 500 },
      { id: "zinger-twister", name: "Zinger Twister", price: 450 },
      { id: "paratha-roll", name: "Paratha Roll", price: 380 },
    ],
  },
  {
    id: "fish",
    name: "Fish",
    source: "p3",
    items: [
      { id: "fish-piece", name: "Fish Piece", price: 520 },
      { id: "fish-burger", name: "Fish Burger", price: 680 },
      { id: "finger-fish-6-pcs", name: "Finger Fish (6 Pcs)", price: 800 },
      { id: "fish-chips", name: "Fish & Chips", price: 750 },
      { id: "fish-hot-shots-12-pcs", name: "Fish Hot Shots (12 Pcs)", price: 680 },
    ],
  },
  {
    id: "fries",
    name: "Fries",
    source: "p3",
    items: [
      { id: "regular-fries", name: "Regular Fries", price: 190 },
      { id: "large-fries", name: "Large Fries", price: 380 },
      { id: "loaded-fries", name: "Loaded Fries", price: 650 },
    ],
  },
  {
    id: "specials",
    name: "Specials",
    source: "p4",
    items: [
      { id: "pizza-stacker", name: "Pizza Stacker", price: 700 },
      { id: "popper-s-15-pcs", name: "Popper's (15 Pcs)", price: 480 },
      { id: "kabab-bites", name: "Kabab Bites", price: 550 },
      { id: "behari-roll", name: "Behari Roll", price: 600 },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    source: "p7",
    items: [
      { id: "buddy-coke", name: "Buddy Coke", price: 90 },
      { id: "tin-pack", name: "Tin Pack", price: 150 },
      { id: "1-liter-coke", name: "1 Liter Coke", price: 180 },
      { id: "1-5-liter-coke", name: "1.5 Liter Coke", price: 220 },
      { id: "mineral-water-small", name: "Mineral Water Small", price: 60 },
      { id: "mineral-water-large", name: "Mineral Water Large", price: 120 },
    ],
  },
];

export const getCategory = (id) => categories.find((c) => c.id === id);

export const menuCount = categories.reduce((total, category) => total + category.items.length, 0);

export const deals = getCategory("deals").items;
export const midnightDeals = getCategory("midnight-deals").items;
export const pizzaRegular = getCategory("pizza-regular").items;
export const pizzaPremium = getCategory("pizza-premium").items;
export const pizzaSpecialty = getCategory("pizza-specialty").items;
export const burgerAddOnsExport = burgerAddOns;
export const pizzaAddOnsExport = pizzaAddOns;