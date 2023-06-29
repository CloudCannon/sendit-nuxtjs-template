<template>
  <section class="error py-xxl-12 py-lg-9 py-10 py-sm-6" :data-cms-bind="dataBinding">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="error-content text-center">
            <img format="webp" :src="block.image" alt="error-image" v-if="block.image"/>
            <h3 class="my-5">{{ block.description }}</h3>
            <a href="/" class="btn btn-lg btn-primary"> Try Again </a>
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
