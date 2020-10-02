<template>
    <div class="container text-center">
        <form @submit.prevent="submit" class="text-center">
            <h3 class="my-5">Enter car details</h3>

            <div class="row ">
                <div class="col">
                    <input class=" form-group bwj-w form-control"  v-model.trim="$v.manufacturer.$model" placeholder="Car company" type="text" :class="{ 'is-invalid': submitted && $v.manufacturer.$error }" />
                    <div v-if="submitted && $v.manufacturer.$error" class="invalid-feedback">

                        <span v-if="!$v.manufacturer.required">Manufacturer is required</span>

                    </div>
                </div>
                <div class="col">
                    <input class="form-group bwj-w form-control"  v-model.trim="$v.model.$model" placeholder="Car model" type="text" :class="{ 'is-invalid': submitted && $v.model.$error }" />
                    <div v-if="submitted && $v.model.$error" class="invalid-feedback">

                        <span v-if="!$v.model.required">Model is required</span>

                    </div>
                </div>



            </div>



            <div class=" row">
                <div class="col">
                    <input class="form-group bwj-w form-control" v-model.trim="$v.year.$model" placeholder="Year" type="number" :class="{ 'is-invalid': submitted && $v.year.$error }" />
                    <div v-if="submitted && $v.year.$error" class="invalid-feedback">

                        <span v-if="!$v.year.required">Year is required</span>

                    </div>
                </div>
                <div class="col">
                    <input type="text" class="form-control bwj-w" placeholder="Part category Ex.(Gearbox)"  v-model.trim="$v.category.$model" :class="{ 'is-invalid': submitted && $v.category.$error }">
                     <div v-if="submitted && $v.category.$error" class="invalid-feedback">

                        <span v-if="!$v.category.required">Part category is required</span>

                    </div>
                </div>


            </div>



            <div class="row">
                <div class="col">
                    <input type="text" class="form-control bwj-w" placeholder="Part name"   v-model.trim="$v.partName.$model" :class="{ 'is-invalid': submitted && $v.partName.$error }">
                    <div v-if="submitted && $v.partName.$error" class="invalid-feedback">

                        <span v-if="!$v.partName.required">Part name is required</span>

                    </div>
                </div>
                <div class="col">
                    <label for="file-upload" class="form-control border border-success">
                        <i class="fas fa-upload"></i>


                        Upload your image
                    </label>
                    <input id="file-upload" type="file" accept="image/*" @change="previewYourImage" />
                   
                </div>

            </div>
          


 <div class=" mt-4 d-flex justify-content-center" >

                         <div class="col-md-4 col-sm-4">
                           <button type="submit" class="form-control btn btn-primary"  name="submit" style="height: 2.5rem;font-size: 1rem;font-weight: 500;">Submit</button>  
                         </div>
                                
                            
                        </div>

        </form>
    </div>
</template>

<script>
    import {
        required,
        minLength,
        email,
        sameAs
    } from 'vuelidate/lib/validators'
import * as firebase from 'firebase'
    export default {
        data() {
            return {
                submitted: false,
                manufacturer: null,
                model: null,
                year: null,
                category: null,
                partName: null,
           image: null,
                imageUrl: null,

                
            }
        },
        validations: {
            manufacturer: {
                required
            },
            model: {
                required
            },
            year: {
                required
            },
            category: {
                required
            },
            partName: {
                required
            },
           
            image: {
                required
            }
        },
        created() {

        },
        computed: {
            requsts() {
                return this.$store.getters.loadedRequsts
            }
        },
        methods: {
             previewYourImage(event) {
                this.imageUrl = null;
                this.image = event.target.files[0];




            },
            submit() { 
                console.log("submitted");
                  this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                
             

              
                  const storageRef = firebase.storage().ref(`${this.image.name}`).put(this.image);
                storageRef.on(`state_changed`, snapshot => {
                    }, error => {
                        console.log(error.message)
                    },
                    () => {
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {

                            this.imageUrl = url;

const RequstData = {
          manufacturer: this.manufacturer,
          model: this.model,
          year: this.year,
          category: this.category,
          partName: this.partName,
        imageUrl:this.imageUrl}

                            this.$store.dispatch('createRequst', RequstData)
        this.$router.push('/myreq')
                        });
                    }
                );  
            },
           
        }
    }

</script>

<style scoped>
    h1,
    p {
        text-align: center;
    }

    p {
        color: red;
    }

    img.preview {
        width: 200px;
    }

    .custom-file-input::-webkit-file-upload-button {
        visibility: hidden;

    }

    input[type="file"] {
        display: none;

    }

    .custom-file-input::-webkit-file-upload-text {
        visibility: hidden;


    }

    .custom-file-input::before {
        visibility: visible;
        content: 'Upload Your Image';
        -webkit-user-select: none;
        cursor: pointer;

    }

</style>
