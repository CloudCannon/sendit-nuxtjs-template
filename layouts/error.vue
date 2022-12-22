<template>
    <div >
      <GeneralError
       :block="{ description: 'Something is wrong here!', image: '/images/404/error.png', image_alt: 'Error illustration' }">
      </GeneralError>
    </div>
  </template>
  <script>
  export default {
    props: ['error'],

    data() {
      return {
        block: { "description": "Something is wrong here!", "image": "~/assets/images/404/error.png", "image_alt": "Error illustration" },
      };
    }
  }
  </script>



