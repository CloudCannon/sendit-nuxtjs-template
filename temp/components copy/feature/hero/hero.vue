<template>
   <section class="feature-hero">
      <div class="container">
         <div class="row align-items-center">
            <div class="col-lg-6">
               <div class="feature-hero-content">
                  <h1 class="">{{ block.title}}</h1>
                  {{block.description | markdownify}}
                  <div class="d-block mb-6">
                     <a href="{{block.btn.link}}" class="btn btn-primary btn-lg"> {{block.btn.text}} </a>
                  </div>
               </div>
            </div>
            <div class="col-lg-6">
               <div class="feature-hero-banner">
                  <img src="{{block.image_path}}" alt="banner-image" loading="lazy" />
                  <div class="shape">
                     <img src="/images/feature/effect-4.png" alt="shape" loading="lazy" />
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
         'block',
      ]
   }
</script>
