<template>
   <section class="hero-two" :data-cms-bind="dataBinding">
      <div class="hero-two-shape">
         <img src="~/assets/images/hero/hero-two-shape.png" alt="shape" />
      </div>
      <div class="container-fluid">
         <div class="row align-items-center">
            <div class="col-lg-6">
               <div class="hero-two-content">
                  <h1 class="mb-4">{{ block.title}}</h1>
                  <div class="mb-7 w-xxl-80">{{ block.description }}</div>
                  <div class="">
                     <a :href="block.button.link" class="btn btn-primary btn-lg"> {{ block.button.text }} </a> 
                  </div>
               </div>
            </div>
            <div class="col-lg-6">
               <div class="hero-two-banner">
                     <img :src="block.image" alt="hero-two-images" /> 
                  <div class="hero-two-banner-shape">
                     <img src="~/assets/images/hero/hero-three-shape.png" alt="shape" />
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
         'block','dataBinding'
      ]
   }
</script>
