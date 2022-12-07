<template>
   <section class="contact-hero">
      <div class="container">
         <div class="row">
            <div class="col-lg-6">
               <div class="contact-hero-content">
                  <h1>{{ block.title }}</h1>
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

