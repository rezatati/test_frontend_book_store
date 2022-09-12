<template>
  <div class="home">
    <BookList></BookList>
  </div>
</template>

<script>
// @ is an alias to /src
import BookList from '@/components/Book/bookList.vue';

export default {
  name: 'Home',
  components: {
    BookList,
  },
};
</script>
