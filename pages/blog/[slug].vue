<template>
  <div>
    <section class="blog-details">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <article class="blog-single">
              <div class="inner-blog-details">
                <h2 class="w-xxl-70 w-xl-80 w-100">{{ pageData.title }}</h2>
                <div class="inner-blog-details-meta">
                  <ul class="list-unstyled">
                    <li class="list-inline-item">
                      <p>{{ blogDate }}</p>
                    </li>
                    <li class="list-inline-item">
                      <p><span> Written by: &nbsp;</span>{{ pageData.author }}</p>
                    </li>
                    <!--
                    <li class="list-inline-item">
                      <p>{{ Math.floor((pageData.text.split(" ").length) / 183) }} minute read</p>
                    </li>
                    <li class="list-inline-item" v-if="pageData.content != ''">
                      <p>{{ pageData.text.split(" ").length }}<span> words</span></p>
                    </li>
                    -->
                  </ul>
                </div>
              </div>
              <img v-if="pageData.featuredImg" :src="pageData.featuredImg.image" class="w-100 mb-xxl-11 mb-8"
                :alt="pageData.featuredImg.image_alt" />
              <div style="max-width: 900px; margin: 0 auto">
                <ContentDoc />
              </div>
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
          <div class="col-lg-4 col-md-6" v-for="post in recommendedBlogPosts">
            <article class="blog-post">
              <div class="blog-post-thumb">
                <a :href="post._path">
                  <img :src="post.thumbImg.image" :alt="post.thumbImg.image_alt" />
                </a>
              </div>
              <div class="blog-post-content">
                <div class="blog-post-tag">
                  <div v-for="(tag, index) in post.tags">
                    <a :href="'/tags/'+ tag" v-if="index < 2">{{ tag }}</a>
                  </div>
                </div>
                <div class="blog-post-title">
                  <a :href="post._path">{{ post.title }}</a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
  import { DateTime } from 'luxon';
  const route = useRoute();

  const { page } = useContent();

  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
  }

  const pageData = page.value;

  const numRecentPosts = 3;
  const recommendedBlogPosts = await queryContent('blog')
    .where({
        _path: { $ne: '/blog' }
    })
    .only(['title', 'thumbImg', 'tags', '_path'])
    .sort({ createdAt: 'asc' })
    .limit(numRecentPosts)
    .find();

  const blogDate = DateTime.fromISO(pageData.date, 'string').toLocaleString(DateTime.DATE_FULL);

  const head = generateHead(pageData, route);
  useHead(head);
</script>