<template>

  <section class="about-hero-two" :data-cms-bind="dataBinding">
    <div class="container">
      <div class="row">
        <div class="col-xl-5 col-lg-10 mx-auto">
          <div class="about-hero-two-content position-relative">
            <h2>{{ block.title }}</h2>
            <p v-html="block.description"></p>
            <div
              class="scroll-down d-flex justify-content-center justify-content-xl-start"
            >
              <a :href="block.button.link" class="btn btn-primary btn-lg">
                {{block.button.text}}
              </a>

            </div>
          </div>
        </div>
        <div class="col-xl-7 col-lg-12">
          <div class="about-hero-two-banner">
            <div
              v-for="item in block.hero_images"
              :class="classObject(item.placement)"
              >
              <img format="webp" :src="item.image" alt="aboutfeature" loading="lazy" v-if="item.image"/>
            </div>
            <div class="pattern">
              <img src="~/assets/images/about/patterns-two.png" alt="patterns" loading="lazy"/>
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
      'block', 'dataBinding'
          ],
    methods: {
      classObject(itemPlace) {
       if (itemPlace == "front_bottom"){
        return "image-one"
       }
       else if(itemPlace == "back_top_right"){
        return "image-two"
       }
       else if(itemPlace == "back_top_left"){
        return "image-three"
       }
      }
    },

  }

</script>


