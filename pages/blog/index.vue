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
                        <nuxt-img format="webp" v-if="blog.thumbImg.image"
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
      <section id="next" v-if="nextPage">
         <nav class="blog-pagination">
               <ul class="pagination">
               <li class="page-item" v-for="index in (Math.round(numberOfPosts/page.pagination.size ))">
                  <a
                     class="page-link btn btn-secondary"
                     :class="{active: index === 1}"
                     :href="'/blog/page/' + index"
                     >{{ index}}
                  </a>
               </li>
                  <li class="page-item">
                     <a class="page-link btn btn-secondary" :href="'/blog/page/2'">
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
  import siteData from '../../data/site.json';

    export default {
        async asyncData({ $content, params, error }) {
            const slug = params.slug || "index";
            const page = await $content('blog', slug)
            .fetch()
            .catch(err => {
            error({ statusCode: 404, message: "Page not found" });
            });
            const blogPosts = await $content('blog') 
            .only(['title', 'slug', 'thumbImg', 'tags'])
            .sortBy('createdAt', 'asc')
            .fetch()
            const blog = blogPosts.filter(function(e) { return e.slug !== 'index'  });
            const posts = blog;
            const allPosts = await $content('blog').only(['title']).fetch();
            const nextPage = allPosts.length > page.pagination.size;
            const numberOfPosts = allPosts.length;

          return {
              page, blog, nextPage, numberOfPosts, posts
          };
      
        }, 
        head() {
        let metaData = [];
        let pageDescription = siteData.description;
        let cannonical_url = '';

        if(this.page.seo.page_description){
          pageDescription = this.page.seo.page_description;
        }
        
        if(this.page.seo.canonical_url){
          cannonical_url = siteData.BaseURL + this.page.seo.canonical_url;
        }

        if(this.page.slug == '/'){
          metaData.push({name: "og:title", content: siteData.site_title});
          metaData.push({property: "og:type", content: "website"});
          metaData.push({name: "twitter:creator", content: siteData.twitter_site});
          metaData.push({name: "twitter:title", content: siteData.site_title});
          if(siteData.twitter_image){
            metaData.push({name: "twitter:image", content: siteData.twitter_image});
          }
          else{
            metaData.push({name: "twitter:image", content: siteData.image});
          }
        }
        else{
          metaData.push({name: "og:title", content: this.page.title});
          metaData.push({name: "twitter:title", content: this.page.title});
          if(this.page.seo.open_graph_type){
            metaData.push({name: "og:type", content: this.page.seo.open_graph_type});
          }
          else{
            metaData.push({name: "og:type", content: "website"});
          }

          if(this.page.seo.featured_image){
            metaData.push({name: "og:image", content: this.page.seo.featured_image});
            metaData.push({name: "twitter:image", content: this.page.seo.featured_image});
          }
          else{
            metaData.push({name: "og:image", content: siteData.image});
            if(siteData.twitter_image){
                metaData.push({name: "twitter:image", content: siteData.twitter_image});
            }
            else{
              metaData.push({name: "twitter:image", content: siteData.image});
            }
          }
      
          if(this.page.seo.author_twitter_handle){
            metaData.push({name: "twitter:creator", content: this.page.seo.author_twitter_handle});
          }
          else{
            metaData.push({name: "twitter:creator", content: siteData.twitter_site});

          }
        }

        // Add robots no index
        if(this.page.seo.no_index){
          metaData.push({name: "robots", content: "noindex"});
          metaData.push({name: "googlebot", content: "noindex"});
        }
        // Page description for SEO
        metaData.push({description: pageDescription});
        metaData.push({"og:description": pageDescription});

        // Meta tags for open graph and twitter
        // TODO: check if this content is correct
        metaData.push({name: "twitter:card", content: "summary_large_image" });
        metaData.push({name: "twitter:site", content: siteData.twitter_site });

        return {
          title: `${this.page.title} | ${siteData.site_title}`,
          meta: metaData,
          link: [
          {
            hid: 'canonical',
            rel: 'canonical',
            href: cannonical_url.length > 0 ? cannonical_url : `${siteData.BaseURL}/${this.$route.params.slug}`,
          }
        ]

        }
      },               


    };


</script>