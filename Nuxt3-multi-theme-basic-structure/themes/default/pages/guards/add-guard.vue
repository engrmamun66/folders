<template>
  <div :class="{template_in: useMenuState().value.menu=='guards' && useMenuState().value.subMenu=='add-guard'}">
    <div class="section-title leap-admin-subheader">
      <div class="d-flex align-items-center">
        <div class="mr-auto">
          <h3
            class="leap-admin-subheader__title leap-admin-subheader__title--separator">
            Create Site Guard
          </h3>
          <ul
            class="
              leap-admin-subheader__breadcrumbs
              leap-admin-nav leap-admin-nav--inline
            "
          >
            <li class="leap-admin-nav__item m-nav__item--home">
              <a class="leap-admin-nav__link m-nav__link--icon" href="#">Guard</a>
            </li>
            <li class="leap-admin-nav__separator">
              <i class="fa fa-angle-right"></i>
            </li>
            <li class="leap-admin-nav__item">
              <a class="leap-admin-nav__link"
                ><span class="m-nav__link-text"> create site's guard </span></a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-8 col-sm-12">
        <div class="leap-admin-content-wrapper">
        <div class="leap-admin-card">
          <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
              <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">Add Guard</h3>
                <div class="leap-admin-title-rightcontent-side">
                  <div class="leap-admin-title-rightcontent-side-inner">
                    <nuxt-link to="/users">
                    <button @click="back()" class="leap-btn leap-back-btn me-2" type="button">
                      Users
                    </button>
                    </nuxt-link>
                    <button @click="back()" class="leap-btn leap-back-btn" type="button">
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="leap-admin-card-body">
            
          </div>
          <div class="card-footer">
            <button type="reset" class="leap-btn leap-submit-btn me-2" @click="addUser()">Submit</button>
            <button type="reset" class="leap-btn leap-cancel-btn" @click="cancel()">Cancel</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

let companyState = useCompanyState();
import userMixin from "~/mixins/users";
Common().useMixin(userMixin);
</script>
