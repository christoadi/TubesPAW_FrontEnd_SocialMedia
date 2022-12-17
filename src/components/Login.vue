<template>
    <main>
        <v-app-bar color="#f0f2f5">
            <v-icon color="#1977f2" class="ml-10">mdi-alpha-s-circle</v-icon>
            <v-toolbar-title class="font-weight-black ml-0" color="#1977f2">SosmedKu</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-form class="mt-8 mb-2">
                <v-container>
                    <v-form v-model="valid" ref="formLogin">
                        <v-row>
                            <v-col cols="6" sm="4">
                                <v-text-field v-model="emailLog" :rules="emailRules" required solo clearable
                                    class="mr-5" label="Email address" type="text">
                                </v-text-field>
                            </v-col>
                            <v-col cols="6" sm="4">
                                <v-text-field v-model="passwordLog" :append-icon="showLog ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="passwordRules" :type="showLog ? 'text' : 'password'"
                                    @click:append="showLog = !showLog" required solo label="Password">
                                </v-text-field>
                            </v-col>
                            <v-col cols="6" sm="4">
                                <v-btn color="blue" class="mt-2 d-flex font-weight-bold align-center white--text" darken
                                    @click="login">Log In</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-form>
        </v-app-bar>

        <v-container fluid fill-height rounded class="containerPosition">
            <v-layout flex align-center justify-center rounded>
                <v-flex x512 sm6 elevation-6 rounded>
                    <h3 class="mt-5" style="text-align:center; font-weight:bold">User's Feedback</h3>
                    <v-list-item v-for="(feedback, i) in this.feedbacks" :key="i">
                        <v-list-item-content>
                            <FeedbackCard v-bind:id="feedback.id" v-bind:username="feedback.name"
                                v-bind:feedback_star="feedback.feedback_star"
                                v-bind:feedback_content="feedback.feedback_content"></FeedbackCard>
                        </v-list-item-content>
                    </v-list-item>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container fluid fill-height class="layoutPosition">
            <v-layout flex align-center justify-center class="layoutPosition">
                <v-flex x512 sm6 elevation-6>
                    <v-toolbar rounded class="blue">
                        <v-toolbar-title class="white--text mt-2">
                            <h1>Register</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card rounded>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field v-model="name" :rules="nameRules" outlined required label="Name"
                                        type="text"></v-text-field>
                                    <v-select v-model="gender" :rules="genderRules" :items="genderList" label="Gender"
                                        outlined></v-select>
                                    <v-text-field v-model="dateborn" :rules="datebornRules" outlined required
                                        label="Date of birth" type="date"></v-text-field>
                                    <v-text-field v-model="email" :rules="emailRules" outlined required label="Email"
                                        type="email"></v-text-field>
                                    <v-text-field v-model="username" :rules="usernameRules" outlined required
                                        label="Username" type="text"></v-text-field>
                                    <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :rules="passwordRules" :type="show1 ? 'text' : 'password'"
                                        @click:append="show1 = !show1" outlined required
                                        label="Password"></v-text-field>
                                    <v-layout justify-center>
                                        <v-btn color="#43b72a" class="font-weight-bold white--text" @click="register"
                                            :class="{ '#43b72a white--text': valid, disable: !valid }">Create New
                                            Account</v-btn>
                                    </v-layout>
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
        <!-- <v-footer>
            anjay
        </v-footer> -->
    </main>
</template>

<style>
.containerPosition {
    position: absolute;
    top: -160px;
    left: -600px;
    right: 0;
    max-width: 600px;
}

.layoutPosition {
    position: absolute;
    top: 30px;
    left: -30px;
    right: -825px;
    max-width: 1055px;
}
</style>

<script>
import FeedbackCard from "./FeedbackCard";


export default {
    name: "Login",
    components: { FeedbackCard },
    data() {
        return {
            emailLog: '',
            passwordLog: '',
            feedbacks: new Array(),
            genderList: ['Laki-laki', 'Wanita'],
            valid: false,
            name: '',
            gender: '',
            dateborn: '',
            username: '',
            password: '',
            color: '',
            snackbar: false,
            error_message: '',
            show1: false,
            showLog: false,
            nameRules: [
                (v) => !!v || 'Name must be filled',
            ],
            genderRules: [
                (v) => !!v || 'Gender must be filled',
            ],
            datebornRules: [
                (v) => !!v || 'Date of birth must be filled',
            ],
            emailRules: [
                (v) => !!v || 'Email must be filled',
            ],
            usernameRules: [
                (v) => !!v || 'Username must be filled',
            ],
            passwordRules: [
                (v) => !!v || 'Password must be filled',
            ],
        };
    },
    methods: {
        login() {
            if (this.$refs.formLogin.validate()) {
                this.load = true;
                this.$http.post(this.$api + '/login', {
                    email: this.emailLog,
                    password: this.passwordLog
                }).then(response => {
                    localStorage.setItem('id', response.data.user.id);
                    localStorage.setItem('token', response.data.access_token);
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.clear();
                    this.$router.push({
                        name: 'Homepage',
                    });
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                })
            }
        },

        clear() {
            this.$refs.form.reset()
        },

        readFeedback() {
            var url = this.$api + '/feedback/index';
            this.$http.get(url).then(response => {
                this.feedbacks = response.data.data;
            })
        },

        register() {
            if (this.$refs.form.validate()) {
                this.load = true;
                this.$http.post(this.$api + '/register', {
                    name: this.name,
                    gender: this.gender,
                    dateborn: this.dateborn,
                    email: this.email,
                    username: this.username,
                    password: this.password
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.clear();
                    this.$router.push({
                        name: 'Login',
                    });
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    localStorage.removeItem('token');
                    this.load = false;
                })
            }
        }
    },

    mounted() {
        this.readFeedback();
    },
};
</script>