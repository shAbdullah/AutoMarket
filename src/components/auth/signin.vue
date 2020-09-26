<template>
  <div class="container  d-flex justify-content-center">
        <div class="col-md-7 text-center  mt-3">
            <form @submit.prevent="onSubmit" class="border border-secondary rounded ">
                <div class="m-3">
                    <h3 class="my-5">Sgin in</h3>

                    



                    <div class="form-group">


                        <input class=" bwj-w form-control" v-model="email" placeholder="Enter email" />
                      
                    </div>


                    <div class="form-group">

                        <input class=" bwj-w form-control" v-model="password" placeholder="Password" type="password" />
                      
                    </div>

                   
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
       computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSubmit () {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      },
        
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style scoped>
  .signin-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>