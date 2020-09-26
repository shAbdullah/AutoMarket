<template>
   <div class="container-fliud mt-4 d-flex justify-content-around">
      
      <div v-for="requst in requsts" :key="requst.id" >
        

    <div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img :src="requst.imageUrl" class="card-img" alt="">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title"> {{ requst.partName}}</h5>
        <ul class="list-group ">
    <li >Car manufacturer: {{requst.manufacturer}}</li>
     <li >Car model: {{requst.model}}</li>
     <li >Car manufacture year: {{requst.year}}</li>
     <li >Part category: {{requst.category}}</li>
  </ul>
 
     <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" @click="showDiv(requst.id)">Add comment</button>
      </div>
    </div>
    <div class="col-12" style="  height: 2.7rem;
        background-color: darkgrey;">
          <div class="dropdown  d-flex justify-content-center align-self-center" style="height:100%;">
  <li style="    font-size: larger;" class=" " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
   <i class="fas fa-plus"></i>
    See the comments
  </li>
  <div class="dropdown-menu drop" aria-labelledby="dropdownMenuButton" style="">
    <a v-for="message in requst.messages" class="dropdown-item" :key="requst.messages.id">{{message.message}}</a>
  
  </div>
</div> 
        
    </div>
  </div>
</div>
   
<div class="modal fade text-left" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
         
          <div class="form-group">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text" v-model="message"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="addComment()">Send Comment</button>
      </div>
    </div>
  </div>
</div>
  

      </div>  
       
   </div>

</template>

<script>
  import 'regenerator-runtime';
  export default {
  data() {
  return {
    DashRequsts:null,
      message:'',
      requstID:null,
    showCommentModal: false,
    selectedPost: {}
  }
},
   computed: {
      requsts () {
        
           this.DashRequsts = this.$store.getters.loadedRequsts;
          for(let req in this.DashRequsts){
              console.log("reqq:"+this.DashRequsts[req].messages)
              
          }
          console.log("reusts"+this.DashRequsts);
          return this.DashRequsts;
      }
    },
      created(){
         
        this.$store.dispatch('loadRequsts')
       console.log('created');
      },
      methods:{
    addComment() {
        
 this.$store.dispatch('AddComment',{
     id:this.requstID,
     message:this.message
 });
   $('#exampleModal').modal({
  show: false
})
    }
        ,
       showDiv(req){
        
        console.log('ID: '+req);
           this.requstID=req;
        $('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
//  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})
    }      
      }
  }
</script>

<style scoped>
    .drop{
        width:100%;
        transform: translate3d(0px, 43px, 0px)!important;
    }
</style>