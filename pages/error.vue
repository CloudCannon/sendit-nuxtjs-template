<template>
    <!-- TODO: -->
    <div>
      <template v-if="formattedPage">
        <component 
        v-for="(block, index) in formattedPage.content_blocks"
        :is="block._bookshop_name.toString()"
        :block="block"
        :dataBinding="`#content_blocks.${index}`"
        :key="index"
          ></component>
      </template>      
      <nuxt-content :document="page"/>

    </div>
  </template>


<script>
    export default {
        async asyncData({ $content, params, error }) {
          const page = await $content('404')
              .fetch()
              .catch(err => {
              error({ statusCode: 404, message: "Page not found" });
              });
          let formattedPage = null;
          if(page.content_blocks){    
            formattedPage = page;
            formattedPage.content_blocks.forEach(function (item) {
              item._bookshop_name = item._bookshop_name.replace(/[^a-zA-Z0-9 ]/g, ' ');
              item._bookshop_name = item._bookshop_name.replace(/(^\w{1})|(\s+\w{1})/g, c => c.toUpperCase());
              item._bookshop_name = item._bookshop_name.replace(' ', '');
            });
          }

          return {
              page, formattedPage
          };
      
        }
    }

</script>