
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
    const pageNumber = parseInt(route.params.pagenumber);
    const tag = route.params.tagPaged;
    const urlPrefix = `tags/${tag}`;
    if (isNaN(pageNumber)) {
        navigateTo(`/${urlPrefix}`);
    }

    const pageData = await queryContent('blog').where({ _path: '/blog' }).findOne();
    const pageSize = pageData.pagination.size || 9;

    let allPosts;
    try {
        allPosts = await queryContent('blog')
            .where({
                _path: { $ne: '/blog' },
                tags: { $in: [tag] }
            })
            .only(['title'])
            .find();
    } catch (e) {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
    }

    const numberOfPosts = allPosts.length;
    const numberOfPages = Math.ceil(numberOfPosts / pageSize);

    if (pageNumber && (pageNumber <= 1 || numberOfPages === 1)) {
        navigateTo(`/${urlPrefix}`)
    }

    if (pageNumber > numberOfPages) {
        navigateTo(`/${urlPrefix}/page/${numberOfPages}`)
    }

    const skipAmount = (pageNumber - 1) * pageSize;

    const pagedPosts = await queryContent('blog')
        .where({
            _path: { $ne: '/blog' },
            tags: { $in: [tag] }
        })
        .only(['title', 'thumbImg', 'tags', '_path'])
        .sort({ createdAt: 'asc' })
        .skip(skipAmount)
        .limit(pageData.pagination.size)
        .find();
</script>