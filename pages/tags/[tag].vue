<template>
    <BlogLayout
        :posts="pagedPosts"
        :pageNumber="pageNumber"
        :numberOfPages="numberOfPages"
        :urlPrefix="urlPrefix"
    />
</template>

<script setup>
    definePageMeta({ layout: 'blog' });
    const route = useRoute();
    const tag = route.params.tag;
    const urlPrefix = `tags/${tag}`;

    const pageData = await queryContent('blog').where({ _path: '/blog' }).findOne();
    const pageSize = pageData.pagination.size || 9;
    const pageNumber = 1;

    const allPosts = await queryContent('blog')
        .where({
            _path: { $ne: '/blog' },
            tags: { $in: [tag] }
        })
        .only(['title'])
        .find();
    const numberOfPosts = allPosts.length;

    const numberOfPages = Math.ceil(numberOfPosts / pageSize);

    const pagedPosts = await queryContent('blog')
        .where({
            _path: { $ne: '/blog' },
            tags: { $in: [tag] }
        })
        .only(['title', 'thumbImg', 'tags', '_path'])
        .sort({ createdAt: 'asc' })
        .limit(pageData.pagination.size)
        .find();
</script>