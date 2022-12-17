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

    <v-navigation-drawer v-model="drawer" color="#f0f2f5" style="overflow: scroll; scroll-behavior: smooth;"
      class="scrollbar-hide" absolute>
      <v-list dense nav class="">
        <v-list-item>
          <v-list-item-content>
            <div class="d-flex justify-center">
              <v-icon color="#1977f2" class="ml-0 mt-3">mdi-alpha-s-circle</v-icon>
              <h2 class="font-weight-black black--text mt-4" color="#1977f2" @click="homepage">SosmedKu</h2>
            </div>
            <div class="d-flex justify-center">
              <v-text-field v-model="search" required solo rounded label="Search" type="text">
              </v-text-field>
            </div>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="black"></v-divider>

        <v-list-item>
          <div class="d-flex justify-center">
            <h5 class="black--text">Data Profile</h5>
          </div>
        </v-list-item>

        <v-container class="white" fluid rounded>
          <v-form v-model="valid" ref="form" class="mt-2">
            <v-text-field v-model="name" :rules="nameRules" outlined required label="Name" type="text"></v-text-field>
            <v-select v-model="gender" color="black" item-color="black" :rules="genderRules" :items="genderList"
              label="Gender" outlined></v-select>
            <v-text-field v-model="dateborn" color="black" :rules="datebornRules" outlined required
              label="Date of birth" type="date"></v-text-field>
            <v-text-field v-model="username" color="black" :rules="usernameRules" outlined required label="Username"
              type="text"></v-text-field>
            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules"
              :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" outlined required
              label="Password"></v-text-field>
            <v-layout justify-center>
              <v-btn color="blue" @click="update" :class="{ 'blue white--text': valid, disable: !valid }">Update
              </v-btn>
            </v-layout>
          </v-form>
        </v-container>

        <v-divider class="black"></v-divider>

        <v-list-item>
          <div class="d-flex justify-center">
            <h5 class="black--text">Feedback</h5>
          </div>
        </v-list-item>


        <v-container class="white" fluid rounded>
          <v-form v-model="valid" ref="form" class="mt-2">
            <v-text-field v-model="review" :rules="reviewRules" outlined required label="Review"
              type="text"></v-text-field>
            <v-select v-model="star" color="black" item-color="black" :rules="starRules" :items="starList" label="Star"
              outlined></v-select>
            <v-layout justify-center>
              <div v-if="cekEdit === true">
                <v-btn color="blue" @click="updateFeedback"
                  :class="{ 'blue white--text': valid, disable: !valid }">Update</v-btn>
                <v-btn color="red" @click="deleteFeedback"
                  :class="{ 'red white--text': valid, disable: !valid }">Delete</v-btn>
              </div>
              <div v-else>
                <v-btn color="green" @click="createFeedback"
                  :class="{ 'green white--text': valid, disable: !valid }">Create</v-btn>
              </div>
            </v-layout>
          </v-form>
        </v-container>
      </v-list>
    </v-navigation-drawer>

    <CreatePost class="mt-15" v-bind:username="username" v-bind:user_id="user_id"></CreatePost>

    <v-list-item v-for="(post, i) in this.posts" :key="i">
      <v-list-item-content>
        <PostCard v-bind:id="post.id" v-bind:username="post.name" v-bind:post-content="post.post_content"
          v-bind:comments="bindComment(post.id)" v-bind:status="status"></PostCard>
      </v-list-item-content>
    </v-list-item>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
  </main>
</template>

<script>
import CreatePost from "./Post/CreatePost";
import PostCard from "./Post/PostCard";

export default {
  name: "Profile",
  components: { PostCard, CreatePost },
  data() {
    return {
      load: false,
      posts: new Array(),
      genderList: ['Laki-laki', 'Wanita'],
      starList: [1, 2, 3, 4, 5],
      valid: false,
      user_id: localStorage.getItem('id'),
      name: '',
      gender: '',
      dateborn: '',
      username: '',
      password: '',
      color: '',
      cekEdit: false,
      review: '',
      star: '',
      comments: [],
      status: 'edit',
      snackbar: false,
      error_message: '',
      show1: false,
      nameRules: [
        (v) => !!v || 'Name must be filled',
      ],
      genderRules: [
        (v) => !!v || 'Gender must be filled',
      ],
      datebornRules: [
        (v) => !!v || 'Dateborn must be filled',
      ],
      usernameRules: [
        (v) => !!v || 'Username must be filled',
      ],
      passwordRules: [
        (v) => !!v || 'Password must be filled',
      ],
      reviewRules: [
        (v) => !!v || 'Review must be filled',
      ],
      starRules: [
        (v) => !!v || 'Star must be filled',
      ],
    };
  },
  methods: {
    readProfile() {
      this.idUser = localStorage.getItem('id');

      var url = this.$api + '/user/' + this.idUser;
      this.$http.get(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.name = response.data.data['name'];
        this.gender = response.data.data['gender'];
        this.dateborn = response.data.data['dateborn'];
        this.username = response.data.data['username'];
        // this.password = response.data.data['password'];
      })
    },

    readPosts() {
      var url = this.$api + '/postfrom/' + this.idUser

      this.$http.get(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.posts = response.data.data;
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

    bindComment(id) {
      let hasil = new Array();
      for (let i = 0; i < this.comments.length; i++) {
        if (id === this.comments[i].post_id) {
          hasil.push(this.comments[i]);
        }
      }
      return hasil;
    },

    homepage() {
      this.$router.push({
        name: 'Homepage',
      });
    },

    readFeedback() {
      this.idUser = localStorage.getItem('id');

      var url = this.$api + '/feedback/' + this.idUser;
      this.$http.get(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        if (response.data.data == null) {
          this.cekEdit = false;
        } else {
          this.cekEdit = true;
          this.review = response.data.data['feedback_content'];
          this.star = response.data.data['feedback_star'];
        }
      })
    },

    updateFeedback() {
      let newData = {
        feedback_content: this.review,
        feedback_star: this.star
      }
      var url = this.$api + '/feedback/' + this.idUser;
      this.load = true;
      this.$http.put(url, newData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = "green";
        this.snackbar = true;
        this.readFeedback();
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = "red";
        this.snackbar = true;
      });
    },

    deleteFeedback() {
      this.idUser = localStorage.getItem('id');

      var url = this.$api + '/feedback/' + this.idUser;
      this.$http.delete(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = "green";
        this.snackbar = true;
        this.cekEdit = false;
        this.star = '';
        this.review = '';
        this.readFeedback();
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = "red";
        this.snackbar = true;
      });
    },

    createFeedback() {
      let newData = {
        feedback_content: this.review,
        feedback_star: this.star,
        user_id: localStorage.getItem('id'),
      }
      var url = this.$api + '/feedback';
      this.$http.post(url, newData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = "green";
        this.snackbar = true;
        this.readFeedback();
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = "red";
        this.snackbar = true;
      });
    },

    logout() {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      location.reload();
    },

    update() {
      let newData = {
        name: this.name,
        gender: this.gender,
        dateborn: this.dateborn,
        email: this.email,
        username: this.username,
        password: this.password
      }
      var url = this.$api + '/user/' + this.idUser;
      this.load = true;
      this.$http.put(url, newData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = "green";
        this.snackbar = true;
        this.load = false;
        this.readProfile();
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = "red";
        this.snackbar = true;
        this.load = false;
      });
    },
  },
  mounted() {
    this.readProfile();
    this.readFeedback();
    this.readPosts();
    this.readComments();
  },
};
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
