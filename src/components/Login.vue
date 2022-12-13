<template>
    <main>
        <v-app-bar color="#f0f2f5">
            <!-- Icon & Social Media Name -->
            <v-icon color="#1977f2" class="ml-10">mdi-alpha-s-circle</v-icon>
            <v-toolbar-title class="font-weight-black ml-0" color="#1977f2">SosmedKu</v-toolbar-title>

            <!-- Spacing -->
            <v-spacer></v-spacer>

            <!-- Login Input-->
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
                                <v-text-field v-model="passwordLog" :rules="passwordRules" required solo
                                    label="Password" type="password">
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

        <!-- Register Container-->
        <v-container fluid fill-height class="containerPosition">
            <v-layout flex align-center justify-center>
                <v-flex x512 sm6 elevation-6>
                    <!-- Register title -->
                    <v-toolbar rounded class="blue">
                        <v-toolbar-title class="white--text mt-2">
                            <h1>Register</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <!-- Register Input -->
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
                                    <v-text-field v-model="email" :rules="emailRules" outlined required
                                        label="Email address" type="email"></v-text-field>
                                    <v-text-field v-model="username" :rules="usernameRules" outlined required
                                        label="Username" type="text"></v-text-field>
                                    <v-text-field v-model="password" :rules="passwordRules" outlined required
                                        label="Password" type="password"></v-text-field>

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
    </main>
</template>

<style>
.containerPosition {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
}
</style>

<script>


export default {
    name: "Login",
    data() {
        return {
            emailLog: '',
            passwordLog: '',
            genderList: ['Pria', 'Wanita'],
            valid: false,
            name: '',
            gender: '',
            dateborn: '',
            username: '',
            password: '',
            color: '',
            snackbar: false,
            error_message: '',
            //Input Rules
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
                (v) => !!v || 'Email address must be filled',
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
            if (this.$refs.formLogin.validate()) { //Validation Check
                this.load = true;
                this.$http.post(this.$api + '/login', {
                    email: this.emailLog,
                    password: this.passwordLog
                }).then(response => {
                    //Saving data
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

        register() {
            if (this.$refs.form.validate()) { //Validation Check
                this.load = true;
                this.$http.post(this.$api + '/register', {
                    name: this.name,
                    gender: this.gender,
                    dateborn: this.dateborn,
                    email: this.email,
                    username: this.username,
                    password: this.password
                }).then(response => {
                    //Saving data
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


};
</script>