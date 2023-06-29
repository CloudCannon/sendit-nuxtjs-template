<template>
    <nav class="blog-pagination">
        <ul class="pagination">
            <li class="page-item" v-if="hasPreviousPage">
                <a class="page-link btn btn-secondary"
                :href="previousButtonLink(pageNumber)"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20.657"
                    height="11.314"
                    viewBox="0 0 20.657 11.314"
                    style="transform: scale(-1, 1)"
                    >
                    <g fill="#fff" data-name="Group 12">
                        <path d="M0 4.657h18v2H0z" data-name="Rectangle 2400"></path>
                        <path
                            d="M13.586 9.9l5.6568542-5.6568542 1.4142136 1.4142135-5.6568542 5.6568543z"
                            data-name="Rectangle 2401"
                        ></path>
                        <path
                            d="M15 0l5.6568542 5.6568542-1.4142135 1.4142136-5.6568543-5.6568542z"
                            data-name="Rectangle 2402"
                        ></path>
                    </g>
                    </svg>
                </a>
            </li>
            <li class="page-item" v-for="index in (numberOfPages)">
                <a class="page-link btn btn-secondary" :class="{active: index == pageNumber}"
                    :href="`/${urlPrefix}/page/${index}` ">{{ index}}
                </a>
            </li>
            <li class="page-item" v-if="hasNextPage">
                <a class="page-link btn btn-secondary" :href="`/${urlPrefix}/page/${pageNumber + 1}`">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20.657" height="11.314"
                        viewBox="0 0 20.657 11.314">
                        <g fill="#fff" data-name="Group 12">
                            <path d="M0 4.657h18v2H0z" data-name="Rectangle 2400"></path>
                            <path
                                d="M13.586 9.9l5.6568542-5.6568542 1.4142136 1.4142135-5.6568542 5.6568543z"
                                data-name="Rectangle 2401"></path>
                            <path d="M15 0l5.6568542 5.6568542-1.4142135 1.4142136-5.6568543-5.6568542z"
                                data-name="Rectangle 2402"></path>
                        </g>
                    </svg>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>

    const { pageNumber, numberOfPages, urlPrefix } = defineProps({
        pageNumber: Number,
        numberOfPages: Number,
        urlPrefix: String
    });

    const hasNextPage = (pageNumber + 1 <= numberOfPages);
    const hasPreviousPage = (pageNumber - 1 >= 1);
    const previousButtonLink = (index) => {
        let previousURL = '';
        if(index == 2){
            previousURL = `/${urlPrefix}/`
        }
        else{
            previousURL = `/${urlPrefix}/page/${(index-1)}`;
        }
        return previousURL;
    }

</script>