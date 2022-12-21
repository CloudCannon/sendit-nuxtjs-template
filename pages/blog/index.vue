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
         <div class="col-lg-4 col-md-6" v-for="blog in blog">
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
                  <!-- TODO: -->
         <nav class="blog-pagination">
               <ul class="pagination">
               <li class="page-item" v-for="index in params.pagination.size">
                  <a
                     class="page-link btn btn-secondary"
                     :class="{active: index === 1}"
                     :href="'/blog/page/' + index"
                     >{{ index}}
                  </a>
               </li>
                  <li class="page-item">
                     <a class="page-link btn btn-secondary" :href="'blog/page/2'">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="20.657"
                           height="11.314"
                           viewBox="0 0 20.657 11.314"
                        >
                           <g fill="#fff" data-name="Group 12">
                              <path d="M0 4.657h18v2H0z" data-name="Rectangle 2400"></path>
                              <path
                                 d="M13.586 9.9l5.6568542-5.6568542 1.4142136 1.4142135-5.6568542 5.6568543z"
                                 data-name="Rectangle 2401"
                              ></path>
                              <path
                                 d="M15 0l5.6568542 5.6568542-1.4142135 1.4142136-5.6568543-5.6568542z"
                                 data-name="Rectangle 2402"
                              ></path>
                           </g>
                        </svg>
                     </a>
                  </li>
               </ul>
            </nav>
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
            .limit(params.pagination.size)
            .fetch()
            const page = await $content('blog', slug)
            .fetch()
            .catch(err => {
            error({ statusCode: 404, message: "Page not found" });
            });
            const blog = blogPosts.filter(function(e) { return e.slug !== 'index'  });

            const allPosts = await $content('blog').only(['title']).fetch();

            const nextPage = allPosts.length > params.pagination.size;
            console.log(nextPage);

          return {
              page, blog, nextPage
          };
      
        },        


    };


</script>