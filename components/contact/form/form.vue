<template>
   <section class="contact" :data-cms-bind="dataBinding" >
      <div class="container">
         <div class="row">
            <div class="col-lg-5 me-auto order-2 order-lg-1">
               <div class="contact-form-Information">
                  <div class="address">
                     <h3>{{ block.address.heading }}</h3>
                     <p>{{ block.address.address }}</p>
                     <div class="item mb-4">
                        <h3>{{ block.phone.heading }}</h3>
                        <a :href="'tel:' + block.phone.cell"
                           >{{ block.phone.cell }}
                           <span>
                              <img src="~/assets/images/contact/call-add.svg" alt="call-add" loading="lazy" />
                           </span>
                        </a>
                     </div>
                     <div class="item">
                        <h3>{{ block.email.heading }}</h3>
                        <a :href="'mailto:' + block.email.email"
                           >{{ block.email.email }}
                           <span>
                              <img
                                 src="~/assets/images/contact/directbox-send.svg"
                                 alt="send-box"
                                 loading="lazy"
                              />
                           </span>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-lg-6 order-1 order-lg-2">
               <div class="contact-form">
                  <form method="post">
                     <h3>{{ block.form.heading }}</h3>
                     <div class="col-md-12">
                        <label for="Name" class="label">{{ block.form.fullname.heading }}</label>
                        <input
                           type="text"
                           class="form-control"
                           id="Name"
                           name="name"
                           :placeholder="block.form.fullname.placeholder"
                           required=""
                        />
                     </div>
                     <div class="col-md-12">
                        <label for="Name" class="label">{{ block.form.phone_number.heading }}</label>
                        <input
                           type="tel"
                           class="form-control"
                           id="Name"
                           name="phone-number"
                           :placeholder="block.form.phone_number.placeholder"
                           required=""
                        />
                     </div>
                     <div class="col-md-12">
                        <label for="email" class="label">{{ block.form.email.heading }}</label>
                        <input
                           type="email"
                           class="form-control mb-6"
                           id="email"
                           name="_replyto"
                           :placeholder="block.form.email.placeholder"
                           required=""
                        />
                     </div>
                     <div class="col-12">
                        <label for="email" class="label">{{ block.form.message.heading }}</label>
                        <textarea
                           class="form-control mb-4"
                           id="floatingTextarea2"
                           name="message"
                           :placeholder="block.form.message.placeholder"
                           rows="8"
                           spellcheck="false"
                        ></textarea>
                     </div>
                     <input type="text" name="_gotcha" style="display: none" />
                     <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-lg mt-7">
                           <span class="position-relative">{{ block.form.submit_button.text }}</span>
                        </button>
                     </div>
                  </form>
                  <div class="effect">
                     <img src="~/assets/images/contact/effects.png" alt="effects" loading="lazy" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
   export default {
      props: [
         'block','dataBinding'
      ]
   }
</script>
