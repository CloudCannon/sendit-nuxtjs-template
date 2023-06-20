import siteData from '../data/site.json';

export default function (pageData, route) {
    const seo = pageData.seo || {};
    const pageDescription = seo.page_description || siteData.description;

    const cannonical_url = siteData.BaseURL
        + (`/${(seo.cannonical_url || route.href)}`.replace(/\/+/g, '/'));

    const metaData = [
        {
            name: 'description',
            content: pageDescription
        },
        {
            name: 'og:description',
            content: pageDescription
        },
        {
            name: "og:title",
            content: pageData.title
        },
        {
            name: "og:type",
            content: seo.open_graph_type || 'website'
        },
        {
            name: "og:image",
            content: seo.featured_image || siteData.image
        },
        {
            name: "twitter:title",
            content: pageData.title
        },
        {
            name: "twitter:image",
            content: seo.featured_image || siteData.twitter_image || siteData.image
        },
        {
            name: "twitter:creator",
            content: seo.author_twitter_handle || siteData.twitter_site
        },
        {
            name: "twitter:card",
            content: "summary_large_image"
        },
        {
            name: "twitter:site",
            content: siteData.twitter_site
        }
    ]

    // Add robots no index
    if (seo.no_index) {
        metaData.push({
            name: "robots",
            content: "noindex"
        },
        {
            name: "googlebot",
            content: "noindex"
        });
    }

    return {
        title: `${pageData.title} | ${siteData.site_title}`,
        meta: metaData,
        link: [{
            hid: 'canonical',
            rel: 'canonical',
            href: cannonical_url
        }]
    }
}