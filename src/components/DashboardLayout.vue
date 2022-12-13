<template>
    <div class="dashboard">
        <v-navigation-drawer
            absolute
            temporary
            right
            v-model="drawer">
        <!-- <v-navigation-drawer class="fullheight" width="256" v-model="drawer"
            absolute temporary > -->
            
            <template v-slot:prepend>
                <v-list-item two-line>
                <v-list-item-avatar>
                    <v-icon>
                        mdi-account
                    </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Nama Akun</v-list-item-title>
                    <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>

        <v-divider></v-divider>
        </v-navigation-drawer>
        <!-- <v-navigation-drawer class="fullheight" width="256" v-model="drawer"
        absolute temporary color="grey lighten-5">
        
          
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">Nanda Juan Triatma</v-list-item-title>
                    <v-list-item-subtitle>200710682</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            
            <v-list dense nav>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    color="lighten-blue darken-4"
                    tag="router-link"
                    :to="item.to"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
    </v-navigation-drawer> -->
    <v-app-bar
    >
        

        <v-icon color="#1977f2" class="ml-10">mdi-alpha-s-circle</v-icon>
        <v-toolbar-title class="font-weight-black ml-0" color="#1977f2">SosmedKu</v-toolbar-title>
    

        <div class="flex ml-2 items-center rounded-full bg-gray-100 p-2">
        
        <input
          class="
            hidden
            md:inline-flex
            ml-2
            items-center
            bg-transparent
            outline-none
            flex-shrink
          "
          type="text"
          placeholder="Search SosmedKu"
        />
        <v-icon class="h-6 text-gray-600" >
            mdi-search
        </v-icon>
      </div>

      <v-spacer></v-spacer>
      
      <v-app-bar-nav-icon
        @click="drawer = true"
        color="black">
            <v-icon>
                mdi-account
            </v-icon>
            <v-title>Nama Akun</v-title>

        </v-app-bar-nav-icon>

        
    </v-app-bar>
    <div class="fillheight pa-5">
        <router-view></router-view>
    </div>
    </div>
</template>
<script>
    export default{
        name: "DashboardIndex",
        data(){
            return{
                drawer: "false",
                group: null,
                items: [
                    {title: "Dashboard", to: "/"},
                    {title: "Guided", to: "/gd"},
                    {title: "Activity Unguided", to: "/ugd"},
                    {title: "Activity Tugas", to: "/tgs"},
                    {title: "PWA List Makanan", to: "/pwa"},
                    {title: "PWA List Buah", to: "/pwatgs"}
                ],
            };
        },
    };
</script>
<style scoped>
    fullheight{
        min-height: 100vh !important;
    }
</style>