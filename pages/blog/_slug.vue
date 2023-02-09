<template>
  <div>
    <section class="blog-details">
        <div class="container">
          <div class="row">
              <div class="col-lg-12">
                <article class="blog-single">
                    <div class="inner-blog-details">
                      <h2 class="w-xxl-70 w-xl-80 w-100">{{ page.title }}</h2>
                      <div class="inner-blog-details-meta">
                          <ul class="list-unstyled">
                            <li class="list-inline-item">
                              <p>{{ blogDate }}</p> 
                            </li>
                            <li class="list-inline-item">
                                <p><span> Written by: &nbsp;</span>{{ page.author }}</p>
                            </li>
                            <li class="list-inline-item">
                                <p>{{ Math.floor((page.text.split(" ").length) / 183) }} minute read</p>
                            </li>
                                <li class="list-inline-item" v-if="page.content != ''">
                                  <p>{{ page.text.split(" ").length }}<span> words</span></p>
                                </li>
                          </ul>
                      </div>
                    </div>
                    <img
                      v-if="page.featuredImg"
                      :src="page.featuredImg.image"
                      class="w-100 mb-xxl-11 mb-8"
                      :alt="page.featuredImg.image_alt"
                    />
                    <div style="max-width: 900px; margin: 0 auto">
                      <nuxt-content :document="page"/></div>
                </article>
              </div>
          </div>
        </div>
    </section>
    <section class="blog-related position-relative">
        <div class="container">
          <div class="row">
              <div class="col-md-12">
                <div class="blog-section">
                    <h2 class="blog-section-title">Recent Blog</h2>
                </div>
              </div>
          </div>
          <div class="row">
              <div class="col-lg-4 col-md-6" v-for="blog in filteredBlogPosts">
                <article class="blog-post">
                    <div class="blog-post-thumb">
                      <a :href="blog.slug">
                          <img :src="blog.thumbImg.image" :alt="blog.thumbImg.image_alt" />
                      </a>
                    </div>
                    <div class="blog-post-content">
                      <div class="blog-post-tag">
                          <div v-for="(tag, index) in blog.tags">
                            <a :href="'/tags/'+ tag" v-if="index < 2">{{ tag }}</a>
                          </div>
                      </div>
                      <div class="blog-post-title">
                          <a :href="blog.slug">{{ blog.title }}</a>
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
  import siteData from '../../data/site.json';
  import { DateTime } from 'luxon';

    export default {
        async asyncData({ $content, params, error }) {
            const blog = params.blog
            const slug = params.slug;
            const page = await $content('blog', slug, {text: true})
            .fetch()
            .catch(err => {
            error({ statusCode: 404, message: "Page not found" });
            });
            const allBlogPosts = await $content('blog') 
            .only(['title', 'slug', 'thumbImg', 'tags'])
            .sortBy('createdAt', 'asc')
            .fetch()
            let blogDate = DateTime.fromISO(page.date, 'string').toLocaleString(DateTime.DATE_FULL);
          return {
              page, blog, slug, allBlogPosts, blogDate
          };
      
        },
        
        computed: {
          filteredBlogPosts() {
            const blogPosts = this.allBlogPosts.filter(function(e) { return e.slug !== 'index'  })
            return blogPosts.slice(0,3);

          }
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