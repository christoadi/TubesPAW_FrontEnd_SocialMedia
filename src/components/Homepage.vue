<template>
  <main>
    <v-app-bar color="#1977f2" darken-2>

      <v-spacer></v-spacer>

      <v-form class="mt-0 mb-5">
        <v-container>
          <v-row>
            <v-col cols="6" sm="1" class="mb-2">
            </v-col>
            <v-col cols="6" sm="6">
              <v-btn color="#f0f2f5" class="mt-2 d-flex align-center" rounded darken @click="logout">Logout</v-btn>
            </v-col>
            <v-col cols="6" sm="1">
              <v-btn color="#ffffff" class="mt-2 d-flex align-center" rounded darken @click="profile">
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" color="#f0f2f5" absolute>
      <v-list dense nav class="py-0">
        <v-list-item>
          <v-list-item-content>
            <div class="d-flex justify-center">
              <v-icon color="#1977f2" class="ml-0 mt-3">mdi-alpha-s-circle</v-icon>
              <h2 class="font-weight-black black--text mt-4" color="#1977f2">SosmedKu</h2>
            </div>
            <div class="d-felx justify-center">
              <v-text-field v-model="search" required solo rounded label="Search" type="text">
              </v-text-field>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-list-item v-for="(post, i) in this.posts" :key="i">
      <v-list-item-content>
        <PostCard v-bind:id="post.id" v-bind:username="post.name" v-bind:post-content="post.post_content"
          v-bind:comments="bindComment(post.id)" v-bind:status="status"></PostCard>
      </v-list-item-content>
    </v-list-item>

    <v-card elevation="2" color="#f0f2f5" max-width="700" class="font-weight-black mx-auto text-center mt-4">No More
      Content
      <v-card-subtitle class="font-weight-black">
        Go to Profile to Create a new Post
      </v-card-subtitle>
      <v-btn label="Create Post" color="#ffffff" @click="profile" class="mb-5">Create Post</v-btn>
    </v-card>

    <v-snackbar v-model="snackbar" color="blue" timeout="2000" bottom></v-snackbar>
  </main>
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
import PostCard from "./Post/PostCard";

export default {
  name: "Login",
  components: { PostCard },
  data() {
    return {
      load: false,
      snackbar: false,
      valid: false,
      name: '',
      namaFollowers: [],
      idUser: '',
      idPar: '',
      status: 'show',
      posts: new Array(),
      comments: [],
      post: [],
      comment: '',
    };
  },
  methods: {
    readFollower() {
      this.idUser = localStorage.getItem('id');

      var url = this.$api + '/followers/name/' + this.idUser;
      this.$http.get(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.namaFollowers = response.data.data;
      })

    },

    readComments() {
      var url = this.$api + '/comment/'

      this.$http.get(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.comments = response.data.data;

      })
    },

    readPosts() {
      var url = this.$api + '/post'

      this.$http.get(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.posts = response.data.data;
      })
    },

    bindComment(id) {
      let hasil = new Array();

      for (let i = 0; i < this.comments.length; i++) {
        if (id === this.comments[i].post_id) {
          hasil.push(this.comments[i]);
        }
      }
      return hasil;
    },

    profile() {
      this.$router.push({
        name: 'Profile',
      });
    },

    followerName(idPar) {
      var url = this.$api + '/users/' + idPar;

      this.$http.get(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        return response.data.data['name'];
      })
    },

    logout() {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      location.reload();
    },

  },

  created() {
    this.readFollower();
    this.readPosts();
    this.readComments();
  },
};
</script>

<style scoped>

</style>