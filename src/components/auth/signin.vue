<template>
  <div class="container  d-flex justify-content-center">
        <div class="col-md-7 text-center  mt-3">
            <form @submit.prevent="onSubmit" class="border border-secondary rounded ">
                <div class="m-3">
                    <h3 class="my-5">Sgin in</h3>

                    


       <div class="form-group">


                        <input class="form__input bwj-w form-control" v-model.trim="$v.email.$model" placeholder="Enter email" :class="{ 'is-invalid': submitted && $v.email.$error }" />
                        <div v-if="submitted && $v.email.$error" class="invalid-feedback">

                            <span class="error" v-if="!$v.email.required">Field is required</span>
                            <span class="error" v-if="!$v.email.email">email should be correct.</span>
                        </div>
                    </div>
      <div class="form-group">

                        <input class="form__input bwj-w form-control" v-model.trim="$v.password.$model" placeholder="Password" type="password" :class="{ 'is-invalid': submitted && $v.password.$error }" />
                        <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                            <span v-if="!$v.password.required">Password is required</span>
                            <span v-if="!$v.password.minLength">Password must be at least 6 characters</span>
                        </div>
                    </div>
                 

                   
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
        import {
        required,
        minLength,
        email,
        sameAs
    } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {  submitted: false,
        email: '',
        password: ''
      }
    },
        validations: {
            
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6)
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
    this.submitted = true;
this.$v.$touch();
                    if (this.$v.$invalid) {
                        return;
                    } 
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