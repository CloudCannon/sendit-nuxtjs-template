<template>    
   <section
      :class="classObject(block.alternate_style)"
      id="counter-up"
      :data-cms-bind="dataBinding"      
   >
      <div class="container">
         <div class="row">
            <div class="col-lg-12">
               <div class="section-header">
                  <h2>
                     {{ block.title }} <span>{{ block.title_suffix }}</span>
                  </h2>
                  <p v-html="block.description"></p>
               </div>
            </div>
            <div class="col-12">
               <div class="counter-up-wrapper d-grid">
                  <div class="counter-up-content" v-for="item in block.numbers">
                     <div class="counter-up-content-item">
                        <div class="counter-percent">
                           <span class="percent" v-if="item.prefix">{{ item.prefix }}</span>
                           <span class="counter">{{ item.number }}</span>
                           <span class="percent" v-if="item.suffix">{{ item.suffix }}</span>
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
         'block','dataBinding'
      ],
      methods: {
      classObject(altStyle) {
       if (altStyle){
        return "counter-up counter-up-two pb-xxl-14 pb-lg-13"
       }
       else{
         return "counter-up"
       }
      }
    },
   }
</script>

