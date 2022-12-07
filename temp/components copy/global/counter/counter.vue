<template>   
   <section
      class="counter-up {% if alternate_style %} counter-up-two pb-xxl-14 pb-lg-13 {% endif %}"
      id="counter-up"
   >
      <div class="container">
         <div class="row">
            <div class="col-lg-12">
               <div class="section-header">
                  <h2>
                     {{ block.title }} <span>{{ block.title_suffix }}</span>
                  </h2>
                  {{ block.description }}
               </div>
            </div>
            <div class="col-12">
               <div class="counter-up-wrapper d-grid">
                  <div class="counter-up-content" v-for="item in block.numbers">
                     <div class="counter-up-content-item">
                        <div class="counter-percent">
                           <span class="percent" v-if="block.item.prefix">{{ item.prefix }}</span>
                           <span class="counter">{{ item.number }}</span>
                           <span class="percent" v-if="block.item.suffix">{{ item.suffix }}</span>
                        </div>
                        <p>{{ item.text }}</p>
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
         'block',
      ]
   }
</script>
