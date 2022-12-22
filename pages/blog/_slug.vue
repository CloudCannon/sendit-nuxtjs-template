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
                              <!-- 
                              <p>{{  Intl.DateTimeFormat("en-GB", { dateStyle: 'full',}).format(new Date(this.page.date)) }}</p>
                              -->
                            </li>
                            <li class="list-inline-item">
                                <p><span> Written by: </span> {{ page.author }}</p>
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
                    <!-- TODO: check if this is needed-->
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
                            <a :href="'/tag/'+ tag" v-if="index < 2">{{ tag }}</a>
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

          return {
              page, blog, slug, allBlogPosts
          };
      
        },
        
        computed: {
          filteredBlogPosts() {
            const blogPosts = this.allBlogPosts.filter(function(e) { return e.slug !== 'index'  })
            return blogPosts.slice(0,3);

          }
        }
        

    };


</script>