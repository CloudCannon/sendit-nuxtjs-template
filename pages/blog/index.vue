<template>
    <BlogLayout
        :posts="pagedPosts"
        :pageNumber="pageNumber"
        :numberOfPages="numberOfPages"
    />
</template>

<script setup>
    definePageMeta({ layout: 'blog' });

    const pageNumber = 1;

    const pageData = await queryContent('blog').where({ _path: '/blog' }).findOne();
    const pageSize = pageData.pagination.size || 9;

    const allPosts = await queryContent('blog')
            .where({ _path: { $ne: '/blog' } })
            .only(['title'])
            .find();
    const numberOfPosts = allPosts.length;
    const numberOfPages = Math.ceil(numberOfPosts / pageSize);

    const pagedPosts = await queryContent('blog')
        .where({
            _path: { $ne: '/blog' }
        })
        .only(['title', 'thumbImg', 'tags', '_path'])
        .sort({ createdAt: 'asc' })
        .limit(pageData.pagination.size)
        .find();

</script>