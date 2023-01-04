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
                     <a :href="blog.slug">
                        <nuxt-img format="webp" v-if="blog.thumbImg"
                        :src="blog.thumbImg.image" :alt="blog.thumbImg.image_alt" loading="lazy" />
                     </a>
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
                        <a :href="blog.slug" class="">{{blog.title}}</a>
                     </div>
                  </div>
               </article>
            </div>
         </div>
      </div>
      <section id="next">
         <nav class="blog-pagination">
               <ul class="pagination">
                  <li class="page-item" v-if="(params.number - 1) >= 1 ">
                     <a class="page-link btn btn-secondary" 
                     :href="previousButtonLink(params.number)"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="20.657"
                           height="11.314"
                           viewBox="0 0 20.657 11.314"
                           style="transform: scale(-1, 1)"
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
               <li class="page-item" v-for="index in (Math.round(numberOfPosts/blogLanding.pagination.size ))">
                  <a
                     class="page-link btn btn-secondary"
                     :class="{active: index == params.number}"
                     :href="'/blog/page/' + index"
                     >{{ index}}
                  </a>
               </li>
                  <li class="page-item" v-if="nextPage">
                    <a class="page-link btn btn-secondary" :href="'/blog/page/' + (parseInt(params.number) + 1)">
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
   

    </div>
</template>
<script>
export default {
  async asyncData({ $content, params, error }) {
   let skipNumber = 0;
    const blogLanding = await $content('blog', 'index')
    .fetch()
    .catch(err => {
    error({ statusCode: 404, message: "Page not found" });
    });

    if(!(params.number - 1 == 0)){
      skipNumber = (params.number - 1 ) * blogLanding.pagination.size;
   }

    const blogPosts = await $content('blog') 
    .only(['title', 'slug', 'thumbImg', 'tags', 'title', 'description'])
    .sortBy('createdAt', 'asc')
    .limit(blogLanding.pagination.size + 1)
    .skip(skipNumber)
    .fetch() 

    const blog = blogPosts.filter(function(e) { return e.slug !== 'index'  })
    const allPosts = await $content('blog').only(['title']).fetch();
   const nextPage = skipNumber + blogLanding.pagination.size < allPosts.length;
    const numberOfPosts = allPosts.length;
    const posts = blog;

    if(posts.length < 1){
      error({ statusCode: 404, message: "Page not found" });
    }
    return {
      blogLanding, blog, nextPage, posts, numberOfPosts, params
    };
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