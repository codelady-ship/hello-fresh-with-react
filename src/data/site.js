// Shared content for the practice clone. Prices are illustrative only.
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const PRICE_PER_SERVING = 7.49;

export const plans = [
  { id: 'meat-veggies', title: 'Meat & Veggies', tagline: 'Our most popular plan', image: 'images/page4-2.jpg', alt: 'Glazed steak with mashed potatoes and green beans', text: 'A mix of chicken, beef, fish and plenty of vegetables every week.' },
  { id: 'veggie', title: 'Veggie', tagline: '& plant-based meals', image: 'images/page4-1.jpg', alt: 'Chickpea and avocado salad bowl', text: 'Meat-free recipes built around grains, beans, cheese and seasonal produce.' },
  { id: 'family', title: 'Family Friendly', tagline: 'Kid-tested recipes', image: 'images/page4-3.jpg', alt: 'Lettuce wraps filled with carrots and herbs', text: 'Simple, mild recipes that are quick to cook and easy to share.' },
  { id: 'fit', title: 'Fit & Wholesome', tagline: 'For a balanced lifestyle', image: 'images/page4-4.jpg', alt: 'Burger with potato wedges', text: 'Lighter recipes with clear calorie and nutrition information.' },
];

export const recipes = [
  { id: 1, title: 'Chickpea, Avocado & Tomato Salad', plan: 'veggie', time: 20, tags: ['Vegetarian', 'Quick'], image: 'images/page4-1.jpg', alt: 'Salad bowl with chickpeas, avocado, tomato and a creamy dressing' },
  { id: 2, title: 'Glazed Steak with Mash & Green Beans', plan: 'meat-veggies', time: 35, tags: ['High protein'], image: 'images/page4-2.jpg', alt: 'Glazed steak slices next to mashed potatoes and green beans' },
  { id: 3, title: 'Crunchy Carrot Lettuce Wraps', plan: 'family', time: 25, tags: ['Kid-friendly', 'Quick'], image: 'images/page4-3.jpg', alt: 'Lettuce leaves filled with shredded carrot and herbs' },
  { id: 4, title: 'Classic Burger with Potato Wedges', plan: 'family', time: 40, tags: ['Kid-friendly'], image: 'images/page4-4.jpg', alt: 'Burger with lettuce and tomato beside roasted potato wedges' },
  { id: 5, title: 'Seared Steak & Herby Grain Bowl', plan: 'fit', time: 30, tags: ['High protein', 'Balanced'], image: 'images/page1.webp', alt: 'Sliced steak with a herb sauce on a bowl of grains', position: '85% 40%' },
  { id: 6, title: 'Loaded Tacos & Cheesy Bake', plan: 'meat-veggies', time: 45, tags: ['Sharing'], image: 'images/page6.webp', alt: 'Tacos, rice and a cheesy oven bake on a table', position: '30% 50%' },
];

export const topics = [
  { path: '/Sustainability/option1', title: 'Packaging & recycling' },
  { path: '/Sustainability/option2', title: 'Seasonal ingredients' },
  { path: '/Sustainability/option3', title: 'Less food waste' },
];
