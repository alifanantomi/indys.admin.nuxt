export interface FoodCategory {
  id: number;
  name: string;
  image: string;
  foods: Food[];
}

export interface Food {
  id: number;
  name: string;
  price: number;
  cooking_time: number;
  portion: number;
  rating: number;
  review_count: number;
  description?: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  categories: FoodCategory[];
  ingredients: Ingredient[];
  toppings: Topping[];
}

export interface IngredientCategory {
  id: number;
  name: string;
  required: boolean;
  ingredients: Ingredient[];
}

export interface Ingredient {
  id: number;
  name: string;
  quantity?: string;
  price: number;
  optionPrice: number;
  percentage: number;
  maximum: number;
  minimum_price_requirenment: number;
  quota: number;
  visible: boolean;
  dateStart: string;
  dateEnd: string;
  createdAt: string;
  updatedAt: string;
}

// Assuming a Topping is similar to an Ingredient
export interface Topping extends Ingredient {}

export interface Transaction {
  id: number;
  food: Food;
  quantity: number;
  totalPrice: number;
  createdAt: string;
}
