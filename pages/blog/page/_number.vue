<template>
  <div class="">
    <div class="col-lg-4 col-md-6" v-for="blog in posts">
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
      <section id="next" v-if="nextPage">
                  <!-- TODO: -->
         <nav class="blog-pagination">
               <ul class="pagination">
               <li class="page-item" v-for="index in 5">
                  <a
                     class="page-link btn btn-secondary"
                     :class="{active: index === params.number}"
                     :href="'/blog/page' + index"
                     >{{ index}}
                  </a>
               </li>
                  <li class="page-item">
                     <a class="page-link btn btn-secondary" :href="'blog/page/' + index">
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

  </div>
</template>
<script>
export default {
  async asyncData({ $content, params, error }) {
    console.log(params.number);
    const slug = params.slug || "index";
    const blogPosts = await $content('blog') 
    .only(['title', 'slug', 'thumbImg', 'tags'])
    .sortBy('createdAt', 'asc')
    .limit(3)
    .skip((params.number / 2) * 2)
    .fetch()
    const page = await $content('blog', slug)
    .fetch()
    .catch(err => {
    error({ statusCode: 404, message: "Page not found" });
    });
    const blog = blogPosts.filter(function(e) { return e.slug !== 'index'  })
    const nextPage = blog.length === (params.number / 2) * 2;
    const posts = nextPage ? blog.slice(0, -1) : blog


    // const allPosts = await $content('blog').only(['title']).fetch();
    // const numberOfPosts = allPosts.length - 1;
    // const testPosts = '';
    // console.log(numberOfPosts);

    return {
        page, blog, nextPage, posts
    };
  },

  }
</script>