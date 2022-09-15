<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link :to="{ name: 'Home' }">
        <v-btn text> Home </v-btn>
      </router-link>
      <router-link :to="{ name: 'AddBookPage' }"
        ><v-btn text class="mr-2">Add Book</v-btn></router-link
      >
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
