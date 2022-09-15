<template>
  <div>
    <v-row justify="center" class="mt-2">
      <v-card width="70%">
        <v-card-title>List of books</v-card-title>
        <v-card-text>
          <v-data-table
            :loading="fetchingData"
            loading-text="Loading... Please wait"
            v-if="books"
            :headers="headers"
            :items="books"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:[`item.price`]="{ item }">
              {{ formatPriuce(item.price / 100) }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="showDeleteModal(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <v-dialog :persistent="true" width="500" v-model="showDeleteDialog">
        <v-card>
          <v-card-title> Delete Book </v-card-title>
          <v-card-text>
            <v-row> Are you Sure ?</v-row>
            <v-row
              ><v-btn color="error" text @click="doDelete"> Delete </v-btn>
              <v-btn color="success" text @click="cancelDelete">
                Cancel
              </v-btn></v-row
            >
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fetchingData: true,
      showDeleteDialog: false,
      headers: [
        {
          text: 'Title',
          value: 'title',
        },
        {
          text: 'Author',
          value: 'author',
        },
        {
          text: 'Price',
          value: 'price',
        },
        {
          text: 'Count(In Stock)',
          value: 'count',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      page: 1,
      books: null,
      totalItemsCount: null,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    cancelDelete() {
      this.showDeleteDialog = false;
      this.deleteItemId = undefined;
    },
    showDeleteModal(item) {
      this.deleteItemId = item.id;
      this.showDeleteDialog = true;
    },
    async doDelete() {
      try {
        this.fetchingData = true;
        if (this.deleteItemId) {
          await this.$store.dispatch('deleteBook', { id: this.deleteItemId });
          this.fetchBooks();
        }
      } catch (error) {
        console.log(error);
      }
      this.showDeleteDialog = false;
      this.fetchingData = false;
    },
    formatPriuce(val) {
      try {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(val);
      } catch (error) {
        console.log(error);
      }
      return val;
    },
    editItem(item) {
      this.$router.push({
        name: 'AddBookPage',
        params: {
          bookId: item.id,
        },
      });
    },
    async fetchBooks() {
      try {
        this.fetchingData = true;
        const data = (
          await this.$store.dispatch('getBooks', { page: this.page })
        ).data;
        this.books = data['hydra:member'];
        this.totalItemsCount = data['hydra:totalItems'];
      } catch (error) {
        console.log(error);
      }
      this.fetchingData = false;
    },
  },
};
</script>

<style></style>
