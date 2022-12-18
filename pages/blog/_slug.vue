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
            <!--
              TODO: configure recent blog posts
              {% for blog in collections.blog reversed limit: 3%}
              <div class="col-lg-4 col-md-6">
                <article class="blog-post">
                    <div class="blog-post-thumb">
                      <a href="{{ blog.url }}">
                          <img src="{{ blog.data.thumbImg.image }}" alt="{{ blog.data.thumbImg.image_alt }}" />
                      </a>
                    </div>
                    <div class="blog-post-content">
                      <div class="blog-post-tag">
                          {% for tag in blog.data.tags limit: 2 %}
                          <a href="/tag/{{ tag }}">{{ tag }}</a>
                          {% endfor %}
                      </div>
                      <div class="blog-post-title">
                          <a href="{{ blog.url }}">{{ blog.data.title }}</a>
                      </div>
                    </div>
                </article>
              </div>
              {% endfor %}
            -->
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
            let page;
            page = await $content('blog', slug, {text: true})
            .fetch()
            .catch(err => {
            error({ statusCode: 404, message: "Page not found" });
            });
          return {
              page, blog, slug
          };
      
        },      
        

    };


</script>