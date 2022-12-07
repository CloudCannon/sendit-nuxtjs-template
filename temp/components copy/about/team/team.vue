<template>
   <div class="team">
      <div class="container">
         <div class="row">
            <div class="col-lg-10 col-xl-7 mx-auto">
               <div class="section-header">
                  <h2>{{ block.title }}</h2>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-lg-3 col-md-6" v-for="item in block.team_members">
               <div class="team-member">
                  <div class="team-member-thumb">
                     <img :src="item.image_path" alt="team-member-1 png" loading="lazy" style="border-radius:20px"/>
                  </div>
                  <div class="team-member-details">
                     <h3>{{item.name}}</h3>
                     <p>{{item.designation}}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      props: [
         'block',
      ]
   }
</script>


