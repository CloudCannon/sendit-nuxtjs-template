<template>  
  <section class="privacy" :data-cms-bind="dataBinding">
    <div class="container">
      <div class="row">
        <div class="privacy-wrapper">
          <div class="col-lg-7 mx-auto">
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-offset="0"
              class="scrollspy-example"
              tabindex="0"
            >
                <div class="privacy-items" :id="'item'+index" v-for="(item, index) in block.terms_and_conditions">
                  <div class="card">
                    <h3 class="sub-title">{{item.heading}}</h3>
                    <div class="card-body">
                      <div class="card-text" v-html="item.description"></div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-lg-4">
            <nav id="scrol-nav" class="navbar navbar-light privacy-nav">
              <ul class="nav nav-pills">
                  <li class="nav-item" v-for="(item, index) in block.terms_and_conditions">
                    <a class="nav-link active" :href="'#item'+index"
                        v-if="index == 1">
                      {{item.heading}}
                    </a>
                    <a class="nav-link" :href="'#item'+index" v-else>
                      {{item.heading}}</a
                    >                    
                  </li>
              </ul>
            </nav>
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
