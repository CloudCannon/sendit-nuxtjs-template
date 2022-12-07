<template>
  <section class="privacy">
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
                <div class="privacy-items" :id="'item' + index" v-for="(item, index) in block.privacy">
                  <div class="card">
                    <h3 class="sub-title">{{item.heading}}</h3>
                    <div class="card-body">
                      <!-- TODO: CHCECK THIS -->
                      <div class="card-text" v-html="item.description"></div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-lg-4">
            <nav id="scrol-nav" class="navbar navbar-light privacy-nav">
              <ul class="nav nav-pills">
                  <li class="nav-item" v-for="(item, index) in privacy" >
                    <a class="nav-link active" :href="'#item'+ index"
                      >{{item.heading}}</a
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
         'block'
      ]
   }
</script>

