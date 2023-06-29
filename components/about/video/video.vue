<template>
   <section class="works" :data-cms-bind="dataBinding">
      <div class="container">
         <div class="row align-items-center">
            <div class="col-lg-6">
               <div class="works-content">
                  <h2>{{ block.title }}</h2>
                  <p v-html="block.description"></p>
                  <a :href="block.button.link" class="btn btn-lg btn-white" target="_blank"> {{block.button.text}} </a>
               </div>
            </div>
            <div class="col-lg-6">
               <div class="works-banner">
                  <img format="webp" :src="block.video.image" class="w-100" alt="banner-image" loading="lazy" style="border-radius:20px" v-if="block.video.image"/>
                  <div class="effect">
                     <img src="~/assets/images/works/effect.png" alt="effect" loading="lazy" />
                  </div>
                  <div class="video-iframe d-flex align-items-center justify-content-center">
                     <div class="video-icon me-sm-9 me-8">
                        <a class="popup-vimeo" :href="block.video.link">
                           <svg
                              width="28"
                              height="32"
                              viewBox="0 0 28 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M26 12.5359C28.6667 14.0755 28.6667 17.9245 26 19.4641L6.5 30.7224C3.83333 32.262 0.499998 30.3375 0.499999 27.2583L0.5 4.74167C0.5 1.66247 3.83333 -0.262033 6.5 1.27757L26 12.5359Z"
                                 fill="white"
                              />
                           </svg>
                        </a>
                     </div>
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



