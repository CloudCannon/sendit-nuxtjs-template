<template>
  <section class="feature pt-sm-10 pt-5 pb-4" :data-cms-bind="dataBinding">
    <div class="container">
      <div class="row align-items-center" v-if="block.reversed">
        <div class="col-lg-6">
          <div class="feature-item-banner mb-sm-8 mb-lg-10 mb-xxl-15 mb-7">
            <div class="card-image">
              <img format="webp" :src="block.image" alt="card-images" loading="lazy" v-if="block.image"/>
            </div>
            <div class="effect-one">
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="feature-item-content mb-xl-15 mb-md-10 mb-7 ps-xxl-8 ps-0">
            <h2>{{block.title}}</h2>
            <p v-html="block.description"></p>
            <div class="Learn-more">
              <a :href="block.button.link" class="">
                {{block.button.text}}
                <i class="ph-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row align-items-center" v-else>
        <div class="col-lg-6 order-2 order-lg-1">
          <div class="feature-item-content mb-xl-15 mb-md-10 mb-7 ps-xxl-8 ps-0">
            <h2 class="pe-xl-0">{{block.title}}</h2>
            <p v-html="block.description"></p>
            <div class="Learn-more">
              <a :href="block.button.link" class="">
                {{block.button.text}}
                <i class="ph-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2">
          <div class="feature-item-banner mb-sm-8 mb-lg-10 mb-xxl-15 mb-7">
            <div class="card-image">
              <img format="webp" :src="block.image" alt="card-images" loading="lazy" v-if="block.image"/>
            </div>
            <div class="effect-two">
              <!--
              <img
                src="~/assets/images/feature/effect-2.png"
                alt="effect-image"
                loading="lazy"
              />
              -->
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
