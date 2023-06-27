<template>
<section class="hero-two" :data-cms-bind="dataBinding">
   <div class="hero-two-shape"></div>
   <div class="container-fluid">
      <div class="row align-items-center">
         <div class="col-lg-6">
            <div class="hero-two-content">
                  <h1 class="mb-4">{{ block.title}}</h1>
                  <div class="mb-7 w-xxl-80">
                     <p v-html="block.description"></p>

                  </div>
               <div class="">
                  <a :href="block.button.link" class="btn btn-primary btn-lg"> {{ block.button.text }} </a>
               </div>
            </div>
         </div>
         <div class="col-lg-6">
            <div class="hero-two-banner">
               <img format="webp" :src="block.image" alt="hero-two-images" v-if="block.image"/>
               <div class="hero-two-banner-shape"></div>
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
