<template>
  <v-card class="mx-auto" color="#1977f2" max-width="700">
    <v-card-title>
      <v-list-item-avatar color="black">
        <v-img class="" alt=""
          src='https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat4&accessoriesType=Kurt&hatColor=PastelBlue&hairColor=Blonde&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=Hoodie&clotheColor=PastelRed&eyeType=Surprised&eyebrowType=Angry&mouthType=Tongue&skinColor=Brown'></v-img>
      </v-list-item-avatar>
      <span class="text-h6 font-weight-light">{{ username }}</span>
      <v-spacer></v-spacer>
      <div>
        <v-icon @click="updatePost" class="mb-0" v-if="status === 'edit'">mdi-pencil</v-icon>
        <v-icon @click="deletePost" v-if="status === 'edit'">mdi-delete</v-icon>
      </div>
    </v-card-title>

    <v-card-text v-if="status === 'show'" class="text-h5 font-weight-bold"> {{ postContent }}</v-card-text>

    <div v-else style="display:flex; flex-direction: column; align-items: center" justify="center"
      class="text-xs-center">
      <v-text-field v-model="postContent" :disabled="disable"
        class="mx-5 text-h5 font-weight-bold shrink w-75"></v-text-field>
      <v-btn style="align-item:center; width: 100px" @click="updateApi" :hidden="hiden" class="mb-5">POST</v-btn>
    </div>

    <v-expansion-panels>
      <v-expansion-panel style="max-height: 50vh; overflow: scroll; scroll-behavior: smooth;" class="scrollbar-hide">
        <v-expansion-panel-header style="position: sticky; top: 0; z-index: 2" color="#f0f2f5" disable-icon-rotate>
          <v-row class="mx-4 my-n4" justify="end">
            <v-col>
              <v-icon class="ml-5" color="#787878" style="display: flex; justify-content: center">
                mdi-comment
              </v-icon>
            </v-col>
          </v-row>
          <template v-slot:actions>
            <v-icon>
            </v-icon>
          </template>
        </v-expansion-panel-header>

        <v-expansion-panel-content color="blue darken-2">
          <v-form>
            <v-text-field v-model="newComment" type="text" placeholder="Write a comment..."
              hint="Press Enter to post."></v-text-field>
            <v-btn @click="createComment" align="center" color="#ffffff" type="submit" class="mt-2">
              POST
            </v-btn>
          </v-form>
          <div v-for="(comment, i) in this.comments" :key="i">
            <Comment v-bind:username="comment.name" v-bind:comment="comment.content" v-bind:idComment="comment.id"
              v-bind:idUser="comment.user_id"></Comment>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
  </v-card>
</template>

<script>
import Comment from "./Comment";

export default {
  components: { Comment },
  props: ['id', 'username', 'postContent', 'comments', 'status'],
  name: "PostCard",
  data() {
    return {
      newComment: '',
      disable: true,
      hiden: true,
      snackbar: false,
    };
  },
  methods: {
    createComment() {
      let idusercok = localStorage.getItem('id');
      let newData = {
        content: this.newComment,
      };
      var url = this.$api + '/comment/' + this.id + '/' + idusercok;

      this.$http.post(url, newData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data.message);

      }).catch(error => {
        alert(error.response.data.message);
      });
      alert("Comment Added");
    },

    deletePostApi() {
      var url = this.$api + '/post/' + this.id;

      this.$http.delete(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data.message);
      }).catch(error => {
        alert(error.response.data.message);
      });
    },

    deleteCommentPost() {
      var url = this.$api + '/comment/post/' + this.id;

      this.$http.delete(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data.message);
      });
    },

    deletePost() {
      this.deleteCommentPost();
      this.deletePostApi();
      alert("Post berhasil dihapus");
      location.reload()
    },

    updatePost() {
      this.hiden = false;
      this.disable = false;
    },

    updateApi() {
      let newData = {
        post_content: this.postContent,
      };
      var url = this.$api + '/post/' + this.id;

      this.$http.put(url, newData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data.message);
        this.hiden = true;
        this.disable = true;
        alert("Post Edited");
        this.$router.push({
          name: "Profile",
        });
      }).catch(error => {
        alert(error.response.data.message);
      });
    },
  },
};

</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>