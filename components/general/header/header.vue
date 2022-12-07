<template>
  <section class="feature pt-0 pb-0" :data-cms-bind="dataBinding">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <!-- TODO: re add the if statement 
          <div class="section-header @@disply"{% if no_top_pad %}style="padding-top:0;"{% endif %}>

          -->
          <div class="section-header @@disply">
            <h2>{{ block.title }}<span>{{ block.title_suffix }}</span></h2>
            <p>{{ block.description }}</p>
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
