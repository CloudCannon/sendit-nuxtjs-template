<template>
    <div>
      <section class="blog-hero pt-xl-22 pt-sm-20 pt-18 pb-xxl-25 pb-xl-23 pb-22 position-relative">
      <div class="container">
         <div class="row">
            <div class="col-xl-8 col-lg-10 mx-auto">
               <div class="blog-hero-content">
                  <h1 class="blog-hero-title">{{ page.title}}</h1>
                  <p>{{ page.description}}</p>
               </div>
            </div>
         </div>
      </div>
   </section>
   <section class="blog @@padding @@blog-two">
      <div class="container">
         <div class="row">
         <div class="col-lg-4 col-md-6" v-for="blog in posts">
               <article class="blog-post">
                  <div class="blog-post-thumb">
                     <a :href="blog.slug">
                        <img v-if="blog.thumbImg"
                        :src="blog.thumbImg.image" :alt="blog.thumbImg.image_alt" loading="lazy" />
                     </a>
                  </div>
                  <div class="blog-post-content">

                     <div class="blog-post-tag @@category">
                        <!-- TODO: remove in line style -->
                        <div style="display: inline-block"
                        v-for="(tag, index) in blog.tags">
                           <a :href="'/tags/'+ tag +'/'" v-if="index < 2">
                                 {{ tag }}
                           </a>
                        </div>
                     </div>
                     <div class="blog-post-title">
                        <a :href="blog.slug" class="">{{blog.title}}</a>
                     </div>
                  </div>
               </article>
            </div>
         </div>
      </div>
      <section id="next" v-if="nextPage">
      <nuxt-link to="/blog/page/2">
         Next page
      </nuxt-link>
      </section>
   </section>      
   
   <nuxt-content :document="page"/>

    </div>
  </template>
<script>

    export default {
        async asyncData({ $content, params, error }) {
            const slug = params.slug || "index";
            const blogPosts = await $content('blog') 
            .only(['title', 'slug', 'thumbImg', 'tags'])
            .sortBy('createdAt', 'asc')
            .limit(3)
            .fetch()
            const page = await $content('blog', slug)
            .fetch()
            .catch(err => {
            error({ statusCode: 404, message: "Page not found" });
            });
            const blog = blogPosts.filter(function(e) { return e.slug !== 'index'  })


            const nextPage = blog.length === 2
            const posts = nextPage ? blog.slice(0, -1) : blog
          return {
              page, blog, nextPage, posts
          };
      
        },        


    };


</script>