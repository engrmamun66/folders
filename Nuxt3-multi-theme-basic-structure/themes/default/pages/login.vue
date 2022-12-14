<template>
 
  <section class="login-register" v-if="!$route.query.token">
    <div class="login-register-overley">
      <div class="container fullheight-100">
        <Teleport to="body">
            <Toaster></Toaster>
        </Teleport>
        <div
          class="row align-items-center justity-content-center fullheight-100"
        >
          <div class="login-container">
            <div class="login-container-body">
              <div class="text-center">
                <img src="img/inspect-logo.png" class="img-fluid login-logo" />
              </div>
              <div class="login-heading">Log In</div>
              <!-- <div class="login-subheading">Login to your account</div> -->

              <div class="login-from">
                <form class="login">
                  <div class="form-group">
                    <label>User Name</label>
                    <input
                      v-model="userData.email"
                      type="text"
                      class="form-control"
                      placeholder="User Name"
                    />
                    <span
                      v-if="
                        authState.error.type == 422 &&
                        Object.keys(authState.error).length
                      "
                      class="text-danger p-1 font-weight-normal"
                    >
                      {{
                        authState.error.message.hasOwnProperty("email")
                          ? authState.error.message.email.join(", ")
                          : ""
                      }}
                    </span>
                  </div>
                  <div class="form-group">
                    <label>Password</label>
                    <input
                      v-model="userData.password"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                    />
                    <span
                      v-if="
                        authState.error.type == 422 &&
                        Object.keys(authState.error).length
                      "
                      class="text-danger p-1 font-weight-normal"
                    >
                      {{
                        authState.error.message.hasOwnProperty("password")
                          ? authState.error.message.password.join(", ")
                          : ""
                      }}
                    </span>
                  </div>
                  <p
                    v-if="
                      authState.error.type == 401 && authState.error.message
                    "
                    class="text-danger pb-2"
                  >
                    <span class="alert alert-danger" role="alert"
                      >Unauthorized user</span
                    >
                  </p>
                  <div class="form-group">
                    <button
                      type="submit"
                      class="btn sub-btn"
                      @click.prevent="
                        authState.loading = true;
                        authMethods('login', userData);
                      "
                    >
                      Sign In
                      <BtnLoader :show="authState.loading" :color="'white'" />
                    </button>
                    <!-- <div class="forgot-password">Forgot password?</div> -->
                  </div>
                </form>
                <!-- <div class="signup-container">
                                    <div class="signUp-text">If you don't have an accout</div>
                                    <a href="signup.html" class="signup-btn">Sign Up</a>
                                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Loader v-else />
</template>

<script setup>
const userData = { email: null, password: null };
definePageMeta({ layout: "auth" });
let authState = useAuthState();
</script>