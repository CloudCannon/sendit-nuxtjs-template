<template>
   <section class="contact-hero" :data-cms-bind="dataBinding" >
      <div class="container">
         <div class="row">
            <div class="col-lg-6">
               <div class="contact-hero-content">
                  <h1>{{ block.title }}</h1>
                  <p v-html="block.description"></p>
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

