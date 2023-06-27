<template>
   <section class="testimonial" :data-cms-bind="dataBinding">
      <div class="container">
         <div class="row align-items-center">
            <div class="col-lg-8 mx-auto text-center mb-5">
               <div class="testimonial-content">
                  <h2>{{ block.title}} <span> {{ block.title_suffix}}</span></h2>
                  <p v-html="block.description"></p>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-lg-4 col-md-6 mb-5" v-for="item in block.slider">
               <div class="testimonial-item">
                  <div class="testimonial-item-person">
                     <div class="thumb">
                        <img format="webp" :src="item.image" alt="logo" class="img-fluid" loading="lazy" v-if="item.image"/>
                     </div>
                     <div class="content">
                        <h3>{{item.author}}</h3>
                        <p>{{item.designation}}</p>
                     </div>
                  </div>
                  <p>{{item.message}}</p>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script>
   export default {
      props: [
         'block','dataBinding'
      ]
   }
</script>