<script setup>
import { ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useFetch } from "../composables/useFetch";

const id = useRoute().params.id;

const {
  isLoading: isLoadingPost,
  data: post,
  error: postError,
} = useFetch("https://jsonplaceholder.typicode.com/posts/", id);

const isLoadingUser = ref(false);
const user = ref(null);
const userError = ref(null);

watch(post, async (newPost) => {
  if (newPost && newPost.userId) {
    console.log(newPost.userId);
    const { isLoading, data, error } = useFetch(
      "https://jsonplaceholder.typicode.com/users/",
      newPost.userId
    );
    isLoadingUser.value = isLoading;
    user.value = data;
    userError.value = error;
  }
});

console.log(user);
console.log(post);
</script>

<template>
  <div>
    <div v-if="isLoadingPost || isLoadingPost">Loading...</div>
    <div v-else>
      <h1 class="text-3xl">{{ post.title }}</h1>
      <div class="text-gray-500 mb-10">by {{ user?.value?.username }}</div>
      <div>{{ post.body }}</div>
    </div>
    <RouterLink :to="{ name: 'Home' }">Back to Home</RouterLink>
  </div>
</template>
