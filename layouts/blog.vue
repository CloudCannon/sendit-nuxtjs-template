<template>
    <div>
        <section class="blog-hero pt-xl-22 pt-sm-20 pt-18 pb-xxl-25 pb-xl-23 pb-22 position-relative">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 col-lg-10 mx-auto">
                        <div class="blog-hero-content">
                            <h1 class="blog-hero-title">{{ pageData.title }}</h1>
                            <p>{{ pageData.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="blog @@padding @@blog-two">
            <slot />
        </section>
    </div>
</template>

<script setup>
    const route = useRoute();
    const pageData = await queryContent('blog').where({ _path: '/blog' }).findOne();

    const head = generateHead(pageData, route);

    useHead(head);
</script>