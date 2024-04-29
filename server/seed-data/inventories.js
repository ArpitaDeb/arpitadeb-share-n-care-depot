/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

module.exports = [
  {
    id: 1,
    category_id: 1,
    item_name: 'Television',
    description:
      'This 50", 4K LED TV provides a crystal-clear picture and vivid colors.',
    is_permanent: true,
    quantity: 2,
    image_url: 'https://images.pexels.com/photos/2251206/pexels-photo-2251206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    category_id: 1,
    item_name: 'Projector',
    description: 'High-definition projector for home theater experience.',
    is_permanent: true,
    quantity: 1,
    image_url: 'https://images.pexels.com/photos/2507025/pexels-photo-2507025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    category_id: 2,
    item_name: 'Tent',
    description: 'Spacious 4-person camping tent with waterproof material.',
    is_permanent: true,
    quantity: 3,
    image_url: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    category_id: 3,
    item_name: 'Telescope',
    description: 'Powerful telescope for stargazing and celestial observation.',
    is_permanent: true,
    quantity: 1,
    image_url: 'https://images.pexels.com/photos/1484791/pexels-photo-1484791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 5,
    category_id: 4,
    item_name: 'Ice Cream Maker',
    description: 'Make delicious homemade ice cream with this easy-to-use ice cream maker.',
    is_permanent: true,
    quantity: 2,
    image_url: 'https://images.pexels.com/photos/5061192/pexels-photo-5061192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 6,
    category_id: 2,
    item_name: 'Sleeping bag',
    description: 'This ultra-light sleeping bag is packed with an eco-friendly fill. Best used in spring or summer temperatures.',
    is_permanent: true,
    quantity: 5,
    image_url: 'https://images.pexels.com/photos/10772129/pexels-photo-10772129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 7,
    category_id: 1,
    item_name: 'Mouse',
    description: 'With a 1-month battery life this mouse is perfect for travel and productivity.',
    is_permanent: true,
    quantity: 2,
    image_url: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 8,
    category_id: 4,
    item_name: 'Windbreaker',
    description: 'Made from waterproof material, this windbreaker is best layered on top of a sweater to keep warm in inclement conditions.',
    is_permanent: true,
    quantity: 2,
    image_url: 'https://images.pexels.com/photos/18372685/pexels-photo-18372685/free-photo-of-person-wearing-a-yellow-windbreaker-texting-during-a-storm-standing-on-rocky-seashore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 9,
    category_id: 5,
    item_name: 'Water Bottle',
    description: 'With a 10-litre capacity and BPA-free, this water-bottle is perfect for long days out.',
    is_permanent: true,
    quantity: 5,
    image_url: 'https://images.pexels.com/photos/8074426/pexels-photo-8074426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 10,
    category_id: 2,
    item_name: 'Tent',
    description: 'Perfect for spring or summer camping, this 1-person tent is easy to pack and has the option to become modular when used with other products.',
    is_permanent: true,
    quantity: 5,
    image_url: 'https://images.pexels.com/photos/2819554/pexels-photo-2819554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 11,
    category_id: 4,
    item_name: 'Winter Jacket',
    description: 'Made with a durable 100% waterproof shell, and breathable layers without a ton of vents and perforations. ',
    is_permanent: true,
    quantity: 4,
    image_url: 'https://images.pexels.com/photos/311070/pexels-photo-311070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 12,
    category_id: 1,
    item_name: 'Monitor',
    description: 'A 32" IPS LED ultrawide monitor, perfect for work or gaming.',
    is_permanent: true,
    quantity: 1,
    image_url: 'https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 13,
    category_id: 6,
    item_name: 'Stainless Steel BBQ Spatula',
    description: 'Durable spatula with a comfortable handle, perfect for flipping burgers and steaks on the grill.',
    is_permanent: true,
    quantity: 10,
    image_url: 'https://images.pexels.com/photos/15245008/pexels-photo-15245008/free-photo-of-close-up-of-black-cooking-utensils-lying-on-a-wooden-table-with-pink-pots-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 14,
    category_id: 6,
    item_name: 'Long-Handled BBQ Tongs',
    description: 'Heavy-duty tongs made from stainless steel, ideal for gripping and turning meats while grilling.',
    is_permanent: true,
    quantity: 10,
    image_url: 'https://images.pexels.com/photos/5908046/pexels-photo-5908046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 15,
    category_id: 7,
    item_name: 'Brass Bristle BBQ Brush',
    description: 'Essential cleaning tool with sturdy brass bristles for scrubbing grates and removing stubborn residue.',
    is_permanent: true,
    quantity: 10,
    image_url: 'https://images.pexels.com/photos/8523526/pexels-photo-8523526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 16,
    category_id: 8,
    item_name: 'Non-Stick Grilling Basket',
    description: 'Convenient grilling basket with a non-stick surface, perfect for cooking delicate foods like vegetables and seafood.',
    is_permanent: true,
    quantity: 20,
    image_url: 'https://images.pexels.com/photos/4916562/pexels-photo-4916562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 17,
    category_id: 7,
    item_name: 'Heavy-Duty Grill Cleaner',
    description: 'Powerful cleaner formulated to remove grease, grime, and carbon buildup from grill surfaces, extending their lifespan.',
    is_permanent: true,
    quantity: 25,
    image_url: 'https://media.istockphoto.com/id/1368782164/photo/stove-being-cleaned-in-the-kitchen.jpg?s=2048x2048&w=is&k=20&c=VEp9G8zsTphk8y9wl4i2iq6f13W_Do9GBEwTdEZRIvw='
  },
  {
    id: 18,
    category_id: 9,
    item_name: 'Youth Helmet with Protective Padding',
    description: 'Safety helmet specially designed for young skaters, featuring impact-absorbing padding and adjustable straps.',
    is_permanent: true,
    quantity: 10,
    image_url: 'https://images.pexels.com/photos/3932846/pexels-photo-3932846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 19,
    category_id: 10,
    item_name: 'Adjustable Kids Inline Skates',
    description: 'High-quality inline skates designed specifically for children, featuring adjustable sizing for growing feet',
    is_permanent: true,
    quantity: 6,
    image_url: 'https://images.pexels.com/photos/7519638/pexels-photo-7519638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 20,
    category_id: 10,
    item_name: 'Women Roller Skates',
    description: 'Classic-style roller skates designed for women, featuring durable wheels and a stylish, retro design.',
    is_permanent: true,
    quantity: 5,
    image_url: 'https://images.pexels.com/photos/7335042/pexels-photo-7335042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 21,
    category_id: 11,
    item_name: 'Portable Propane Camp Stove',
    description: 'Compact and lightweight camp stove fueled by propane, ideal for outdoor cooking while camping or hiking',
    is_permanent: true,
    quantity: 4,
    image_url: 'https://images.pexels.com/photos/6324178/pexels-photo-6324178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 22,
    category_id: 12,
    item_name: 'Foldable Charcoal Portable Grill',
    description: 'Foldable grill with a charcoal cooking surface, perfect for picnics, tailgating, and camping trips.',
    is_permanent: true,
    quantity: 10,
    image_url: 'https://images.pexels.com/photos/1857732/pexels-photo-1857732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 23,
    category_id: 2,
    item_name: 'Backpack',
    description: 'This sleek, 40L backpack is completely waterproof making it perfect for adventures or the daily commute.',
    is_permanent: true,
    quantity: 3,
    image_url: 'https://images.pexels.com/photos/19762536/pexels-photo-19762536/free-photo-of-hiker-looking-at-mountain-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
];
