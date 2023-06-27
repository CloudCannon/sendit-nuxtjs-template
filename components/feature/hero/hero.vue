<template>
   <section class="feature-hero" :data-cms-bind="dataBinding">
      <div class="container">
         <div class="row align-items-center">
            <div class="col-lg-6">
               <div class="feature-hero-content">
                  <h1 class="">{{ block.title}}</h1>
                  <p v-html="block.description"></p>
                  <div class="d-block mb-6">
                     <a :href="block.button.link" class="btn btn-primary btn-lg"> {{block.button.text}} </a>
                  </div>
               </div>
            </div>
            <div class="col-lg-6">
               <div class="feature-hero-banner">
                  <img format="webp" :src="block.image" alt="banner-image" v-if="block.image"/>
                  <div class="shape">
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script>
  export default {
    props: [
      'block', 'dataBinding'
          ]
  }
</script>
