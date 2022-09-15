export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    getBooks(data) {
      return new Promise((resolve, reject) => {
        window.axios({
          data: data,
          url: "/books",
          method: "GET"
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getBookInfo(_, data) {
      return new Promise((resolve, reject) => {
        window.axios({
          url: "/books/" + data.id,
          method: "GET"
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    saveBook(_, data) {
      let method = 'POST', url = '/books';
      let postData = Object.assign({}, data);
      if (postData.id) {
        method = 'PUT';
        url += '/' + postData.id;
      }
      postData.price *= 100;
      postData.count *= 1;
      return new Promise((resolve, reject) => {
        window.axios({
          data: postData,
          url: url,
          method: method
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    deleteBook(_, data) {
      return new Promise((resolve, reject) => {
        window.axios({
          data: data,
          url: '/books/' + data.id,
          method: 'DELETE'
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
