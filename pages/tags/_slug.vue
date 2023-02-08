<template>
    <div>
      <section class="blog-hero pt-xl-22 pt-sm-20 pt-18 pb-xxl-25 pb-xl-23 pb-22 position-relative">
      <div class="container">
         <div class="row">
            <div class="col-xl-8 col-lg-10 mx-auto">
               <div class="blog-hero-content">
                  <h1 class="blog-hero-title">{{ blogLanding.title}}</h1>
                  <p>{{ blogLanding.description}}</p>
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
                     <NuxtLink :to="'/blog/' + blog.slug">
                        <nuxt-img format="webp" v-if="blog.thumbImg.image"
                        :src="blog.thumbImg.image" :alt="blog.thumbImg.image_alt" loading="lazy" />
                     </NuxtLink>
                  </div>
                  <div class="blog-post-content">

                     <div class="blog-post-tag @@category">
                        <div 
                        v-for="(tag, index) in blog.tags">
                           <a :href="'/tags/'+ tag +'/'" v-if="index < 2">
                                 {{ tag }}
                           </a>
                        </div>
                     </div>
                     <div class="blog-post-title">
                        <NuxtLink :to="'/blog/' + blog.slug">{{blog.title}}</NuxtLink>
                     </div>
                  </div>
               </article>
            </div>
         </div>
      </div>
   </section>      
   

    </div>
</template>
<script>
export default {
  async asyncData({ $content, params, error }) {
    const blogLanding = await $content('blog', 'index')
    .fetch()
    .catch(err => {
    error({ statusCode: 404, message: "Page not found" });
    });
    const blogPosts = await $content('blog') 
    .only(['title', 'slug', 'thumbImg', 'tags', 'title', 'description'])
    .sortBy('createdAt', 'asc')
    .fetch()
 
    const blog = blogPosts.filter(function(e) { return e.slug !== 'index' && e.tags.includes(params.slug) })

    if (blog.length < 1) {
            error({ statusCode: 404, message: "Page not found" });
      }  
   else{
      const allPosts = await $content('blog').only(['title']).fetch();
      const posts = blog;
      const numberOfPosts = allPosts.length;
      return {
         blogLanding, blog, posts, numberOfPosts, params
      };
   }  
  },

  methods: {
    previousButtonLink(index){
      let previousURL = '';
      if(index == 2){
        previousURL = '/blog'
      }
      else{
        previousURL = '/blog/page/' + (index-1);
      }
      return previousURL;
    }
  }


  }
</script>