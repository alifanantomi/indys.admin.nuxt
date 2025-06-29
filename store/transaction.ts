import { defineStore } from "pinia";
import type { Transaction } from "@/lib/types/transaction";
import { useAuthStore } from "./auth";

export const useTransactionStore = defineStore("transaction", () => {
  const transactions = ref<Transaction[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchTransactions = async () => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<Transaction[]>(
        "/v1/transactions",
        {
          baseURL: config.public.apiBase,
          headers: { Authorization: `Bearer ${authStore.token}` },
        }
      );

      if (fetchError.value) {
        throw new Error(
          fetchError.value.message || "Failed to fetch transactions"
        );
      }

      if (data.value) {
        transactions.value = data.value;
        return data.value;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch transactions";
    } finally {
      isLoading.value = false;
    }
  };

  const createTransaction = async (
    newTransaction: Omit<Transaction, "id" | "createdAt">
  ) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      throw new Error("Not authenticated");
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<Transaction>(
        "/v1/transactions",
        {
          baseURL: config.public.apiBase,
          method: "POST",
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: newTransaction,
        }
      );

      if (fetchError.value) {
        throw new Error(
          fetchError.value.message || "Failed to create transaction"
        );
      }

      if (data.value) {
        transactions.value.push(data.value);
        return data.value;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to create transaction";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateTransaction = async (
    id: number,
    updatedTransaction: Partial<Transaction>
  ) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      throw new Error("Not authenticated");
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<Transaction>(
        `/v1/transactions/${id}`,
        {
          baseURL: config.public.apiBase,
          method: "PUT",
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: updatedTransaction,
        }
      );

      if (fetchError.value) {
        throw new Error(
          fetchError.value.message || "Failed to update transaction"
        );
      }

      if (data.value) {
        const index = transactions.value.findIndex((t) => t.id === id);
        if (index !== -1) {
          transactions.value[index] = data.value;
        }
        return data.value;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to update transaction";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTransaction = async (id: number) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      throw new Error("Not authenticated");
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { error: fetchError } = await useFetch(`/v1/transactions/${id}`, {
        baseURL: config.public.apiBase,
        method: "DELETE",
        headers: { Authorization: `Bearer ${authStore.token}` },
      });

      if (fetchError.value) {
        throw new Error(
          fetchError.value.message || "Failed to delete transaction"
        );
      }

      transactions.value = transactions.value.filter((t) => t.id !== id);
    } catch (err: any) {
      error.value = err.message || "Failed to delete transaction";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    transactions,
    isLoading,
    error,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
});
