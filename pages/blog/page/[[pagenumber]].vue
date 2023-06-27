
<template>
    <BlogLayout
        :posts="pagedPosts"
        :pageNumber="pageNumber"
        :numberOfPages="numberOfPages"
    />
</template>


<script setup>
    definePageMeta({ layout: 'blog' });

    const route = useRoute();
    const pageNumber = parseInt(route.params.pagenumber);
    if (isNaN(pageNumber)) {
        navigateTo('/blog')
    }

    const pageData = await queryContent('blog').where({ _path: '/blog' }).findOne();
    const pageSize = pageData.pagination.size || 9;

    const allPosts = await queryContent('blog')
        .where({ _path: { $ne: '/blog' } })
        .only(['title'])
        .find();
    const numberOfPosts = allPosts.length;
    const numberOfPages = Math.ceil(numberOfPosts / pageSize);

    if (pageNumber && (pageNumber <= 1 || numberOfPages === 1)) {
        navigateTo('/blog')
    }

    if (pageNumber > numberOfPages) {
        navigateTo(`/blog/page/${numberOfPages}`)
    }

    const skipAmount = (pageNumber - 1) * pageSize;

    const pagedPosts = await queryContent('blog')
        .where({
            _path: { $ne: '/blog' }
        })
        .only(['title', 'thumbImg', 'tags', '_path'])
        .sort({ createdAt: 'asc' })
        .skip(skipAmount)
        .limit(pageData.pagination.size)
        .find();
</script>