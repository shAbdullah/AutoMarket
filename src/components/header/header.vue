<template>
<div>
  
 
      <div v-if="userIsAuthenticated">
          <nav class="navbar navbar-expand-lg  px-4 shadow-sm header" >
            <router-link tag="a" to="/" class="navbar-brand" href="#" style="color:#e0e0e0;">auto market</router-link >
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse navbarSupportedContent ">
                <ul class="navbar-nav " style="margin-right:4rem; ">
                   
                    <router-link to="myreq" tag='li'  class='nav-item'>     <a class="nav-link">Requsts</a> </router-link>
   
                     <router-link  tag='li' to="about" class='nav-item'>     <a class="nav-link">About us</a> </router-link>
   
   
                </ul>




            </div>
          <div class="row">
                <div class="  navbarSupportedContent  mr-4" style=" " > <router-link  to="newRequst" tag="button"   class="btn btn-outline-info my-2 my-sm-0" >Add Requst</router-link > </div>
            <div class="  navbarSupportedContent " style=" " > <button @click="onLogout" class="btn btn-danger my-2 my-sm-0" >Log out</button>
            </div>
          </div>
            
            
             
        </nav>
      </div>  
       <div v-else>
  <nav class="navbar navbar-expand-lg  px-4 shadow-sm header">
  <div class="row">
       <router-link tag="a" to="/" class="navbar-brand col" href="#" style="color:#e0e0e0;">auto market</router-link >            
                     <router-link  tag='a' class='nav-link col'  to="about" style="color:#ffffff;">    About us </router-link>
   
  </div>


                <div class="row">
                  <div class="col-  navbarSupportedContent mx-3    " style=" padding-left: 2rem; " > <router-link to="signup"   tag='button' class="btn btn-outline-success "    >Sgin Up</router-link>
            </div>
            
            <div class="col  navbarSupportedContent " style=" " > <router-link to="login"   tag='button' class="btn btn-light my-2 my-sm-0" >Sgin In</router-link>
            </div>
              
                </div>
            
             
        </nav>

    </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
            {icon: 'room', title: 'Organize Meetup', link: '/meetup/new'},
            {icon: 'person', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        let auth= this.$store.getters.user !== null && this.$store.getters.user !== undefined;
          console.log("auth "+auth);
          return auth;
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style scoped>
  .header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #521751;
    padding: 0 20px;
  }

  .logo {
    font-weight: bold;
    color: white;
  }

  .logo a {
    text-decoration: none;
    color: white;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }
</style>