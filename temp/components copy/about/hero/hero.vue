<template>

  <section class="about-hero-two">
    <div class="container">
      <div class="row">
        <div class="col-xl-5 col-lg-10 mx-auto">
          <div class="about-hero-two-content position-relative">
            <h2>{{ title }}</h2>
            {{ description }}
            <div
              class="scroll-down d-flex justify-content-center justify-content-xl-start"
            >
            <!-- TODO: 
              <a href="{{link.text}}" class="btn btn-primary btn-lg">
                {{link.url}}
              </a>

            -->
            </div>
          </div>
        </div>
        <!--
        <div class="col-xl-7 col-lg-12">
          <div class="about-hero-two-banner">
          {% for item in hero_images %}
            <div class="{% if item.placer == "front_buttom" %}
            image-one
          {% elsif item.placer == "back_top_right" %}
            image-two
          {% elsif item.placer == "back_top_left" %}
            image-three
          {% endif %}">
              <img src="{{item.image_path}}" alt="aboutfeature" loading="lazy"/>
            </div>
          {% endfor %}
            <div class="pattern">
              <img src="/images/about/patterns-two.png" alt="patterns" loading="lazy"/>
            </div>
          </div>
        </div>
      -->
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['title', 
            'description', 
            'hero_images', 
            'link'
          ]
  }

</script>


