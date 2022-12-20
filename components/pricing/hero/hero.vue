<template>
   <section class="pricing-inner @@bg-color" :data-cms-bind="dataBinding">
      <div class="container">
         <div class="row">
            <div class="col-lg-8 mx-auto">
               <div class="section-header position-relative text-center">
                  <h2>{{ block.title}}</h2>
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
