import { ref, watchEffect } from "vue";

export const useFetch = (endpoint, id = "") => {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  const fetchData = async () => {
    try {
      isLoading.value = true;
      const response = await fetch(endpoint + id);
      if (!response.ok) {
        throw Error("Could not fetch the data");
      }
      data.value = await response.json();
    } catch (err) {
      console.error(err);
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  watchEffect(() => {
    fetchData();
  });

  return { isLoading, data, error };
};
