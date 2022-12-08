<template>
    <div>
      <nuxt-content :document="page"/>

    </div>
  </template>
<script>

    export default {
        async asyncData({ $content, params, error }) {
            console.log(params.slug);
            let page;
            if(params.slug == "/blog"){
                page = await $content('blog')
              .fetch()
              .catch(err => {
              error({ statusCode: 404, message: "Page not found" });
              });   
            }
            else{
                page = await $content('blog', params.slug)
                .fetch()
                .catch(err => {
                error({ statusCode: 404, message: "Page not found" });
                });
                }
          return {
              page
          };
      
        },

    //   data: function() {
    //     return {
    //       listeners: [],
    //     }
    //   },

        // mounted(){
        //   if (process.browser){
        //     this.listeners = [];

        //     async function onLiveEditorLoad(CloudCannon, callback) {
        //       CloudCannon.enableEvents();
        //       const latestValue = await CloudCannon.value();
        //       callback(latestValue);
        //     }

        //     async function onCloudCannonChanges(callback) {
        //       if (!window.CloudCannon) {
        //         document.addEventListener('cloudcannon:load', function (e) {
        //           onLiveEditorLoad(e.detail.CloudCannon, callback);
        //         });
        //       } else {
        //         onLiveEditorLoad(window.CloudCannon, callback);
        //       }

        //       const listener = async (e) => {
        //         const { CloudCannon } = e.detail;
        //         const latestValue = await CloudCannon.value();
        //         callback(latestValue);
        //       };
        //       document.addEventListener('cloudcannon:update', listener);
        //       this.listeners.push(listener);
        //     }

        //     onCloudCannonChanges((newProps) => (
        //       this.updateContentBlocks(newProps)
        //     ));
        //   }

        // },

        // methods: {
        // async stopCloudCannonChanges() {
        //     for (let i = 0; i < this.listeners.length; i++) {
        //       const listener = this.listeners[i];
        //       document.removeEventListener('cloudcannon:update', listener);
        //     }
        //     this.listeners = [];
        //   },           

        //   updateContentBlocks(update) {
        //     this.formattedPage = update;
        //     this.formatBookshopName();
        //   }
        // },
        
        // beforeDestroy() {
        //   // this.stopCloudCannonChanges();
        // }
        


    };


</script>