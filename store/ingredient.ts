import { defineStore } from "pinia";
import type { Ingredient } from "@/lib/types/transaction";
import { useAuthStore } from "./auth";

export const useIngredientStore = defineStore("ingredient", () => {
  const ingredients = ref<Ingredient[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchIngredients = async () => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<Ingredient[]>(
        "/v1/ingredients",
        {
          baseURL: config.public.apiBase,
          headers: { Authorization: `Bearer ${authStore.token}` },
        }
      );

      if (fetchError.value) {
        throw new Error(
          fetchError.value.message || "Failed to fetch ingredients"
        );
      }

      if (data.value) {
        ingredients.value = data.value;
        return data.value;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch ingredients";
    } finally {
      isLoading.value = false;
    }
  };

  const createIngredient = async (newIngredient: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      throw new Error("Not authenticated");
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<Ingredient>(
        "/v1/ingredients",
        {
          baseURL: config.public.apiBase,
          method: "POST",
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: newIngredient,
        }
      );

      if (fetchError.value) {
        throw new Error(
          fetchError.value.message || "Failed to create ingredient"
        );
      }

      if (data.value) {
        ingredients.value.push(data.value);
        return data.value;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to create ingredient";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateIngredient = async (id: number, updatedIngredient: Partial<Ingredient>) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      throw new Error("Not authenticated");
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<Ingredient>(
        `/v1/ingredients/${id}`,
        {
          baseURL: config.public.apiBase,
          method: "PUT",
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: updatedIngredient,
        }
      );

      if (fetchError.value) {
        throw new Error(
          fetchError.value.message || "Failed to update ingredient"
        );
      }

      if (data.value) {
        const index = ingredients.value.findIndex((i) => i.id === id);
        if (index !== -1) {
          ingredients.value[index] = data.value;
        }
        return data.value;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to update ingredient";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteIngredient = async (id: number) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      throw new Error("Not authenticated");
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { error: fetchError } = await useFetch(`/v1/ingredients/${id}`, {
        baseURL: config.public.apiBase,
        method: "DELETE",
        headers: { Authorization: `Bearer ${authStore.token}` },
      });

      if (fetchError.value) {
        throw new Error(
          fetchError.value.message || "Failed to delete ingredient"
        );
      }

      ingredients.value = ingredients.value.filter((i) => i.id !== id);
    } catch (err: any) {
      error.value = err.message || "Failed to delete ingredient";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    ingredients,
    isLoading,
    error,
    fetchIngredients,
    createIngredient,
    updateIngredient,
    deleteIngredient,
  };
});
