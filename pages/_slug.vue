<template>
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
  import siteData from '../data/site.json';

    export default {
        async asyncData({ $content, params, error }) {
          let formattedPage = null;
          const slug = params.slug || "index";
          const page = await $content(slug)
              .fetch()
              .catch(err => {
              error({ statusCode: 404, message: "Page not found" });
              });
          if (!(page)) {
            error({ statusCode: 404, message: "Page not found" });
          }              
          else if(page.content_blocks && page){    
              formattedPage = page;
              formattedPage.content_blocks.forEach(function (item) {
                item._bookshop_name = item._bookshop_name.replaceAll(/[^a-zA-Z0-9 ]/g, ' ');
                item._bookshop_name = item._bookshop_name.replaceAll(/(^\w{1})|(\s+\w{1})/g, c => c.toUpperCase());
                item._bookshop_name = item._bookshop_name.replaceAll(' ', '');
              });
        }

          return {
              page, formattedPage, error
          };
      
        },

      data: function() {
        return {
          listeners: [],
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
        mounted(){
          if (process.browser){
            this.listeners = [];

            async function onLiveEditorLoad(CloudCannon, callback) {
              CloudCannon.enableEvents();
              const latestValue = await CloudCannon.value();
              callback(latestValue);
            }

            async function onCloudCannonChanges(callback) {
              if (!window.CloudCannon) {
                document.addEventListener('cloudcannon:load', function (e) {
                  onLiveEditorLoad(e.detail.CloudCannon, callback);
                });
              } else {
                onLiveEditorLoad(window.CloudCannon, callback);
              }

              const listener = async (e) => {
                const { CloudCannon } = e.detail;
                const latestValue = await CloudCannon.value();
                callback(latestValue);
              };
              document.addEventListener('cloudcannon:update', listener);
              this.listeners.push(listener);
            }

            onCloudCannonChanges((newProps) => (
              this.updateContentBlocks(newProps)
            ));
          }

        },

        methods: {
        async stopCloudCannonChanges() {
            for (let i = 0; i < this.listeners.length; i++) {
              const listener = this.listeners[i];
              document.removeEventListener('cloudcannon:update', listener);
            }
            this.listeners = [];
          },           

          formatBookshopName(){
            this.formattedPage.content_blocks.forEach(function (item) {
            item._bookshop_name = item._bookshop_name.replace(/[^a-zA-Z0-9 ]/g, ' ');
            item._bookshop_name = item._bookshop_name.replace(/(^\w{1})|(\s+\w{1})/g, c => c.toUpperCase());
            item._bookshop_name = item._bookshop_name.replace(' ', '');
            });
          },
          updateContentBlocks(update) {
            this.formattedPage = update;
            this.formatBookshopName();
          }
        },
        
        beforeDestroy() {
          this.stopCloudCannonChanges();
        }


    };


</script>