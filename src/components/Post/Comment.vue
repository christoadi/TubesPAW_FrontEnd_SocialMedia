<template>
  <v-card-actions>
    <v-list-item class="grow">
      <v-col>
        <v-row>
          <v-list-item-avatar color="black">
            <v-img
              src='https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat4&accessoriesType=Kurt&hatColor=PastelBlue&hairColor=Blonde&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=Hoodie&clotheColor=PastelRed&eyeType=Surprised&eyebrowType=Angry&mouthType=Tongue&skinColor=Brown'></v-img>
          </v-list-item-avatar>
          <v-list-item-content color="black">
            <v-list-item-title class="fw-bold" color="#ffffff">{{ username }}</v-list-item-title>
          </v-list-item-content>
        </v-row>
        <v-row class="">
          <div class="d-flex">
            <v-card-text class="pt-5 mr-2">{{ comment }}</v-card-text>
            <v-btn class="mr-2" @click="turnOnEdit" v-if="idUser == idPengguna">Edit</v-btn>
            <v-btn @click="turnOnDelete" v-if="idUser == idPengguna">Delete</v-btn>
          </div>
        </v-row>
      </v-col>
    </v-list-item>
  </v-card-actions>
</template>

<script>
export default {
  props: ['username', 'comment', 'idComment', 'idUser'],
  name: "Comment",
  data() {
    return {
      idPengguna: localStorage.getItem('id'),
      disable: true,
      hiden: true,
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
        location.reload()
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
        location.reload()
      }).catch(error => {
        alert(error.response.data.message);
      });
    },
  },
}
</script>

<style scoped>

</style>