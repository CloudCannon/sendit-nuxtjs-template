<template>
  <section class="feature pt-0 pb-0" :data-cms-bind="dataBinding">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="section-header @@disply"
            v-if="block.remove_top_padding"
              :style="{paddingTop: 0}">
            <h2>{{ block.title }}<span>{{ block.title_suffix }}</span></h2>
            <p v-html="block.description"></p>
          </div>
          <div class="section-header @@disply"
            v-else>
            <h2>{{ block.title }}<span>{{ block.title_suffix }}</span></h2>
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
