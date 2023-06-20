<template>
  <main>
    <template v-if="formattedPage">
      <component
        v-for="(block, index) in formattedPage.content_blocks"
        :is="block._bookshop_name"
        :block="block"
        :dataBinding="`#content_blocks.${index}`"
        :key="index"
          ></component>
    </template>
    <slot/>
  </main>
</template>

<script setup>
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  const route = useRoute();

  const { page } = useContent();
  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
  const pageData = page.value;

  const head = generateHead(pageData, route);
  useHead(head);

  const formatBookshopName = (pageObject) => {
    pageObject.content_blocks.forEach(function (item) {
      item._bookshop_name = item._bookshop_name.replace(/[^a-zA-Z0-9 ]/g, ' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, c => c.toUpperCase())
        .replace(' ', '');
    });
    return pageObject;
  };

  const formattedPage = ref(pageData.content_blocks ? formatBookshopName(pageData) : {});

	const loadNewPropsFromCloudCannon = async (CloudCannon) => {
		try {
			const latestValue = await CloudCannon.value();
      formattedPage.value = formatBookshopName(latestValue);
		} catch(fetchError) {
			console.warn('Failed to fetch latest page props', fetchError);
		}
	};

  const onCloudCannonLoad = (CloudCannon) => {
		CloudCannon.enableEvents();
		loadNewPropsFromCloudCannon(CloudCannon);
	};

  const onLoadEventListener = (e) => {
		onCloudCannonLoad(e.detail.CloudCannon);
	};

  const onUpdateEventListener = (e) => {
		loadNewPropsFromCloudCannon(e.detail.CloudCannon);
	};

  onMounted(() => {
    document.addEventListener('cloudcannon:load', onLoadEventListener);
		document.addEventListener('cloudcannon:update', onUpdateEventListener);
		if (window.CloudCannon) {
			onCloudCannonLoad(window.CloudCannon);
		}
  });

  onBeforeUnmount(() => {
    document.removeEventListener('cloudcannon:load', onLoadEventListener);
		document.removeEventListener('cloudcannon:update', onUpdateEventListener);
  });
</script>