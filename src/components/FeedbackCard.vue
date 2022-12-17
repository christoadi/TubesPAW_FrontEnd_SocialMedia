<template>
  <v-card class="mx-auto" color="#1977f2" dark max-width="700">
    <v-card-title>
      <v-icon large left>
        mdi-account-circle
      </v-icon>
      <span class="text-h6 font-weight-light">{{ username }}</span>
      <v-spacer></v-spacer>
      <span> <v-icon>mdi-star</v-icon>{{ feedback_star }} </span>
    </v-card-title>

    <v-card-text class="text-h5 font-weight-bold">{{ feedback_content }}</v-card-text>
  </v-card>

</template>
<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

<script>
export default {
  props: ['id', 'username', 'feedback_star', 'feedback_content'],
  name: "FeedbackCard",
  data() {
    return {
      idPengguna: localStorage.getItem('id'),
    };
  },
  methods: {
    turnOnEdit() {
      let text = prompt("New Comment: ");
      let newData = {
        content: text,
      };
      var url = this.$api + '/comment/' + this.idComment;

      this.$http.put(url, newData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data.message);
        window.location.reload();
      }).catch(error => {
        alert(error.response.data.message);
      });
    },
    turnOnDelete() {
      var url = this.$api + '/comment/' + this.idComment;
      this.$http.delete(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data.message);
        window.location.reload();
      }).catch(error => {
        alert(error.response.data.message);
      });
    },
  },
}
</script>