<script setup>
import PostCard from "../components/PostCard.vue";
import { useFetch } from "../composables/useFetch";

const {
  isLoading,
  data: posts,
  error,
} = useFetch("https://jsonplaceholder.typicode.com/posts/");
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="!error" class="flex flex-wrap flex-grow">
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
  <div v-else>Error: {{ error }}</div>
</template>
