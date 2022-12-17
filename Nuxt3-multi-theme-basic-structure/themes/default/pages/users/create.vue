<template>
  <div :class="{template_in: useMenuState().value.menu=='users' && useMenuState().value.subMenu=='create'}">
    <div class="section-title leap-admin-subheader">
      <div class="d-flex align-items-center">
        <div class="mr-auto">
          <h3
            class="leap-admin-subheader__title leap-admin-subheader__title--separator">
            Create User
          </h3>
          <ul
            class="
              leap-admin-subheader__breadcrumbs
              leap-admin-nav leap-admin-nav--inline
            "
          >
            <li class="leap-admin-nav__item m-nav__item--home">
              <a class="leap-admin-nav__link m-nav__link--icon" href="#">User</a>
            </li>
            <li class="leap-admin-nav__separator">
              <i class="fa fa-angle-right"></i>
            </li>
            <li class="leap-admin-nav__item">
              <a class="leap-admin-nav__link"
                ><span class="m-nav__link-text"> create-user </span></a
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
                <h3 class="m-portlet__head-text">Add user</h3>
                <div class="leap-admin-title-rightcontent-side">
                  <div class="leap-admin-title-rightcontent-side-inner">
                    <nuxt-link to="/users">
                    <button @click="back()" class="btn btn-sm back-btn me-2" type="button">
                      Users
                    </button>
                    </nuxt-link>
                    <button @click="back()" class="btn btn-sm back-btn" type="button">
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="leap-admin-card-body">
            <form>
              <div class="card-body p-0">
                <div class="form-group">
                  <label>Name</label> 
                  <span v-html="getRedStar('name', validators.user)"></span>
                  <input class="form-control" type="text" v-model="user.name" />
                  <div v-html="getFiledError('name', errors)"></div>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <span v-html="getRedStar('email', validators.user)"></span>
                  <input class="form-control" type="email" autocomplete="off" v-model="user.email" />
                  <div v-html="getFiledError('email', errors)"></div>
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <span v-html="getRedStar('password', validators.user)"></span>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    autocomplete="off" 
                    v-model="user.password"
                  />
                  <div v-html="getFiledError('password', errors)"></div>
                </div>
                <div class="form-group">
                  <label>Phone</label>
                  <span v-html="getRedStar('phone', validators.user)"></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="phone"
                    v-model="user.phone"
                  />
                  <div v-html="getFiledError('phone', errors)"></div>
                </div>
                <div class="form-group">
                  <label>Select company</label>
                  <span v-html="getRedStar('company', validators.user)"></span>
                  <select class="form-control" v-model="user.company">
                    <option
                      v-for="(company, index) in companyState.companyList"
                      :key="index"
                      :value="company.id"
                    >
                      {{ company.name }}
                    </option>
                  </select>
                  <div v-html="getFiledError('company', errors)"></div>
                </div>

                <div class="form-group">
                  <label>User Role</label>
                  <span v-html="getRedStar('role', validators.user)"></span>
                  <select class="form-control" v-model="user.role" @change="user.sites=[];user.site=null">
                    <option
                      v-for="(role, index) in $Config('roles')"
                      :key="index"
                      :value="role.id"
                    >
                      {{ role.name }}
                    </option>
                  </select>
                  <div v-html="getFiledError('role', errors)"></div>
                </div>

                <!-- ===================Conditional Fields====================== -->
                <!-- ===================Conditional Fields====================== -->
                <div v-if="user.role && user.role==11" class="form-group">
                  <label>Select Site</label>
                  <span v-html="getRedStar('site', validators.user)"></span>
                  <select class="form-control" v-model="user.site">
                    <option
                      v-for="(site, index) in $Config('sites')" :key="index" :value="site.id">
                      {{ site.name }}
                    </option>
                  </select>
                  <div v-html="getFiledError('site', errors)"></div>
                </div>
                <div v-else-if="user.role" class="form-group">
                  <label>Select Sites</label>
                  <span v-html="getRedStar('sites', validators.user)"></span>
                  <select multiple="" class="form-control" v-model="user.sites">
                    <option
                      v-for="(site, index) in $Config('sites')" :key="index" :value="site.id">
                      {{ site.name }}
                    </option>
                  </select>
                  <div v-html="getFiledError('sites', errors)"></div>
                </div>

                <div v-if="user.role==11" class="form-group">
                  <label>Device ID</label>
                  <span v-html="getRedStar('deviceId', validators.user)"></span>
                  <input class="form-control" type="text" v-model="user.deviceId" />
                  <div v-html="getFiledError('deviceId', errors)"></div>
                </div>
                <div v-if="user.role==11" class="form-group">
                  <label>Post ID</label>
                  <span v-html="getRedStar('postId', validators.user)"></span>
                  <input class="form-control" type="text" v-model="user.postId" />
                  <div v-html="getFiledError('postId', errors)"></div>
                </div>
              </div>
            </form>
          </div>
          <div class="card-footer">
            <button type="reset" class="btn btn-primary me-2" @click="addUser()">Submit</button>
            <button type="reset" class="btn btn-secondary" @click="cancel()">Cancel</button>
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
useNuxtApp().vueApp.mixin(userMixin);
</script>
