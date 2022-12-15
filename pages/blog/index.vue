<template>
    <div>
        <h1>{{ page.title }}</h1>
      <nuxt-content :document="page"/>

    </div>
  </template>
<script>

    export default {
        async asyncData({ $content, params, error }) {
            const slug = params.slug || "index";
            let page;
            page = await $content('blog', slug)
            .fetch()
            .catch(err => {
            error({ statusCode: 404, message: "Page not found" });
            });
          return {
              page, slug
          };
      
        },        


    };


</script>