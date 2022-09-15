<template>
  <v-card class="mx-auto my-12" outlined max-width="750">
    <v-card-title> Add/Edit Book</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="form.title"
          :counter="50"
          :rules="titleRules"
          label="Title"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.author"
          :counter="30"
          :rules="authorRules"
          label="Author"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.price"
          :rules="priceRules"
          label="Price"
          prefix="$"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.count"
          :rules="countRules"
          label="Count"
          required
        ></v-text-field>

        <v-btn color="success" class="mr-4" @click="save"> Save </v-btn>
        <v-btn color="error" class="mr-4" @click="backToHome"> Cancel </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => (v && v.length <= 50) || 'Title must be less than 50 characters',
      ],
      authorRules: [
        (v) => !!v || 'Author is required',
        (v) =>
          (v && v.length <= 30) || 'Author must be less than 30 characters',
      ],
      priceRules: [
        (v) => !!v || 'Price is required',
        (v) => (v && v > 0) || 'Price must be bigger than 0',
      ],
      countRules: [
        (v) => !!v || 'Count is required',
        (v) => (v && v > 0) || 'Count must be bigger than 0',
      ],
      form: {
        id: undefined,
        title: null,
        author: null,
        price: 0,
        count: 0,
      },
    };
  },
  beforeMount() {
    if (this.$route.params.bookId) {
      this.fetchBookInfo(this.$route.params.bookId);
    }
  },
  methods: {
    async fetchBookInfo(id) {
      const data = (await this.$store.dispatch('getBookInfo', { id })).data;
      this.form.id = data.id;
      this.form.title = data.title;
      this.form.author = data.author;
      this.form.price = data.price / 100;
      this.form.count = data.count;
    },
    async save() {
      if (!this.$refs.form.validate()) return;
      await this.$store.dispatch('saveBook', this.form);
      this.backToHome();
    },
    backToHome() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style></style>
