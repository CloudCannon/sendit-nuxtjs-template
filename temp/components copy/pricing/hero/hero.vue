<template>
   <section class="pricing-inner @@bg-color">
      <div class="container">
         <div class="row">
            <div class="col-lg-8 mx-auto">
               <div class="section-header position-relative text-center">
                  <h2>{{ block.title}}</h2>
                  {{ block.description }}
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
