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