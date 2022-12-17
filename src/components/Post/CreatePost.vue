<template>
  <v-card class="mx-auto" color="#1977f2" max-width="700">
    <v-card-title>
      <v-list-item-avatar color="black">
        <v-img
        src='https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat4&accessoriesType=Kurt&hatColor=PastelBlue&hairColor=Blonde&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=Hoodie&clotheColor=PastelRed&eyeType=Surprised&eyebrowType=Angry&mouthType=Tongue&skinColor=Brown'></v-img>
      </v-list-item-avatar>
      <span class="text-h6">What's on your mind, {{ username }}? {{ content }}</span>
    </v-card-title>
    <v-card-text>
      <v-textarea rounded background-color="#ffffff" v-model="inputPost" />
      <div style="display: flex; justify-content: center">
        <v-btn @click="createPost" color="#ffffff" type="submit">
          POST
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<style>
.cardPosition {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
}
</style>

<script>
export default {
  name: "CreatePost",
  props: ['username', 'user_id', 'content'],
  data() {
    return {
      inputPost: '',
    }
  },
  methods: {
    createPost() {
      var url = this.$api + '/post';
      let newData = {
        post_content: this.inputPost,
        user_id: this.user_id
      }
      this.$http.post(url, newData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        alert(response.data.message);
        this.$router.push({
          name: 'Homepage',
        });
      })
    },
  }
}
</script>

<style scoped>

</style>