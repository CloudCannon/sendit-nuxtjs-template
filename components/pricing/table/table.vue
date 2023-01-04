<template>
   <section class="pricing pb-xxl-20 pb-lg-15 pb-md-5" :data-cms-bind="dataBinding">
      <div class="container">
         <div class="row">
            <div class="col-lg-4" v-for="item in block.pricing_tier">                     
               <div class="card pricing-item"
                     :class="{ active: item.highlight_tier }">
                  <h5 class="card-title">{{item.tier}}</h5>
                  <p class="card-text" v-html="item.description"></p>
                  <div class="price" v-if="item.has_discount">
                     <p class="pricingtable">${{item.discount_price}}</p>
                     <div class="discount">
                        <p>${{item.price}}</p>
                        <div class="vector vector-one">
                           <img src="~/assets/images/pricing/cross-shape.png" alt="cross-shape" loading="lazy" />
                        </div>
                     </div>
                     <div class="shape top-0">
                        <img src="~/assets/images/pricing/shape-two.png" alt="shape" loading="lazy" />
                     </div>
                  </div>
                  <div class="price" v-else>
                     <p><span>${{item.price}}</span></p>
                     <div class="shape">
                        <img src="~/assets/images/pricing/shape-one.png" alt="shape" loading="lazy" />
                     </div>
                  </div>
                  <div class="card-body">
                     <ul class="list-unstyled">
                        <li v-for="feature in item.features"
                           :class="{ deactive: (feature.active_feature === false)}">
                           <i :class="{ deactive: (feature.is_active === false)}"
                              class="ph-check">
                           </i>
                           {{feature.item}}
                        </li>
                     </ul>
                     <div class="link">
                        <a :href="item.button.link" class="btn btn-lg btn-white">
                           {{item.button.text}}
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
