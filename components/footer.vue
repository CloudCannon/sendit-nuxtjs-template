<template>
          <footer class="footer pt-xxl-19 pt-8 pb-sm-7 pb-5" id="footer">
         <div class="container-fluid">
            <div class="footer-wrapper">
               <div class="row">
                  <div class="col-12 col-lg-4 me-auto order-2 order-lg-1">
                     <div class="footer-logo mt-7 mt-md-0">
                        <NuxtLink to="/" class="">
                           <nuxt-img format="webp" :src="footer.logo" alt="logo" />
                        </NuxtLink>
                        <p class="" v-text="`Copyright ${currentDate.getFullYear()} ${footer.copyright}`">
                           
                        </p>
                     </div>
                     <div class="social-icon">
                        <ul class="list-unstyled">
                           <li v-for="item in footer.social"> 
                              <a :href="item.link"> <i :class="item.icon" aria-hidden="true"></i><span class="visually-hidden">{{ item.icon_alt }}</span></a>

                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="col-6 col-md-3 col-lg-2 order-1" v-for="item in footer.sections">
                     <div class="footer-widget">
                        <h3>{{ item.title }}</h3>
                        <ul class="list-unstyled">
                           <li v-for="link in item.links">
                              <NuxtLink :to="link.link" v-if="link.link !== '/sitemap.xml'">{{ link.text }}</NuxtLink>
                              <a :href="link.link" v-else>{{ link.text }}</a>

                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
</template>
<script>
import footerData from "../data/footer.json";

export default {
  data() {
    return {
      footer: footerData,
      currentDate: new Date,
    };
  },
};
</script>
