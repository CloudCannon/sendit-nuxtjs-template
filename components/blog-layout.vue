<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-6" v-for="post in posts">
                <article class="blog-post">
                    <div class="blog-post-thumb">
                        <a :href="post._path">
                            <img format="webp" v-if="post.thumbImg?.image" :src="post.thumbImg?.image"
                                :alt="post.thumbImg?.image_alt" loading="lazy" />
                        </a>
                    </div>
                    <div class="blog-post-content">
                        <div class="blog-post-tag @@category">
                            <div v-for="(tag, index) in post.tags">
                                <a :href="'/tags/'+ tag +'/'" v-if="index < 2">
                                    {{ tag }}
                                </a>
                            </div>
                        </div>
                        <div class="blog-post-title">
                            <a :href="post._path" class="">{{post.title}}</a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
    <section id="next" v-if="hasPaginatinon">
        <PaginationControls
            :pageNumber="pageNumber"
            :numberOfPages="numberOfPages"
            :urlPrefix="urlPrefix"
            />
    </section>
</template>

<script setup>
    const { posts, pageNumber, numberOfPages, urlPrefix } = defineProps({
        posts: Array,
        pageNumber: {
            type: Number,
            default() { return 1 }
        },
        numberOfPages: {
            type: Number,
            default() { return 1 }
        },
        urlPrefix: {
            type: String,
            default() { return 'blog' }
        },
    });


    const hasPaginatinon = numberOfPages > 1;
</script>