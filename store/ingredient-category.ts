import { defineStore } from "pinia";
import type { IngredientCategory } from "@/lib/types/transaction";
import { useAuthStore } from "./auth";

export const useIngredientCategoryStore = defineStore(
  "ingredient-category",
  () => {
    const categories = ref<IngredientCategory[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchCategories = async () => {
      const config = useRuntimeConfig();
      const authStore = useAuthStore();

      if (!authStore.token) {
        return;
      }

      isLoading.value = true;
      error.value = null;

      try {
        const { data, error: fetchError } = await useFetch<
          IngredientCategory[]
        >("/v1/ingredient-categories", {
          baseURL: config.public.apiBase,
          headers: { Authorization: `Bearer ${authStore.token}` },
        });

        if (fetchError.value) {
          throw new Error(
            fetchError.value.message || "Failed to fetch ingredient categories"
          );
        }

        if (data.value) {
          categories.value = data.value;
          return data.value;
        }
      } catch (err: any) {
        error.value = err.message || "Failed to fetch ingredient categories";
      } finally {
        isLoading.value = false;
      }
    };

    const createCategory = async (newCategory: Omit<IngredientCategory, 'id'>) => {
      const config = useRuntimeConfig();
      const authStore = useAuthStore();

      if (!authStore.token) {
        throw new Error("Not authenticated");
      }

      isLoading.value = true;
      error.value = null;

      try {
        const { data, error: fetchError } = await useFetch<IngredientCategory>(
          "/v1/ingredient-categories",
          {
            baseURL: config.public.apiBase,
            method: "POST",
            headers: { Authorization: `Bearer ${authStore.token}` },
            body: newCategory,
          }
        );

        if (fetchError.value) {
          throw new Error(
            fetchError.value.message || "Failed to create ingredient category"
          );
        }

        if (data.value) {
          categories.value.push(data.value);
          return data.value;
        }
      } catch (err: any) {
        error.value = err.message || "Failed to create ingredient category";
        throw err;
      } finally {
        isLoading.value = false;
      }
    };

    const updateCategory = async (id: number, updatedCategory: Partial<IngredientCategory>) => {
      const config = useRuntimeConfig();
      const authStore = useAuthStore();

      if (!authStore.token) {
        throw new Error("Not authenticated");
      }

      isLoading.value = true;
      error.value = null;

      try {
        const { data, error: fetchError } = await useFetch<IngredientCategory>(
          `/v1/ingredient-categories/${id}`,
          {
            baseURL: config.public.apiBase,
            method: "PUT",
            headers: { Authorization: `Bearer ${authStore.token}` },
            body: updatedCategory,
          }
        );

        if (fetchError.value) {
          throw new Error(
            fetchError.value.message || "Failed to update ingredient category"
          );
        }

        if (data.value) {
          const index = categories.value.findIndex((c) => c.id === id);
          if (index !== -1) {
            categories.value[index] = data.value;
          }
          return data.value;
        }
      } catch (err: any) {
        error.value = err.message || "Failed to update ingredient category";
        throw err;
      } finally {
        isLoading.value = false;
      }
    };

    const deleteCategory = async (id: number) => {
      const config = useRuntimeConfig();
      const authStore = useAuthStore();

      if (!authStore.token) {
        throw new Error("Not authenticated");
      }

      isLoading.value = true;
      error.value = null;

      try {
        const { error: fetchError } = await useFetch(
          `/v1/ingredient-categories/${id}`,
          {
            baseURL: config.public.apiBase,
            method: "DELETE",
            headers: { Authorization: `Bearer ${authStore.token}` },
          }
        );

        if (fetchError.value) {
          throw new Error(
            fetchError.value.message || "Failed to delete ingredient category"
          );
        }

        categories.value = categories.value.filter((c) => c.id !== id);
      } catch (err: any) {
        error.value = err.message || "Failed to delete ingredient category";
        throw err;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      categories,
      isLoading,
      error,
      fetchCategories,
      createCategory,
      updateCategory,
      deleteCategory,
    };
  }
);
