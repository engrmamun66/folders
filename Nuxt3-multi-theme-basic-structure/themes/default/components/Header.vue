<template>
  <nav class="navbar navbar-expand-lg navbar-light" :class="{margin_left : menuMethods('isCollapse')}">
    <div class="container-fluid fullheight-100">
      <div class="navbar-middle fullheight-100">
        <div class="leap-admin-header-logo-responsive">
          <div class="logo-area-inner">
            <div class="logo-area-middle">
              <a>
                <img src="/img/logo.png" />
              </a>
            </div>
          </div>
        </div>
        <div class="leap-admin-headermenu-responsive">
          <ul>
            <li>
                <a class="selected" @click.prevent="authState.loading_insptd=true;goToInspectDeploy()"><i class="las la-sign-in-alt" title="Login To Inspect Deploy"></i> <BtnLoader :show="authState.loading_insptd" /></a>
            </li>
            <li>
              <a class="leap-admin-sidebarCollapse" @click="menuMethods('toggleSidebar')"
                ><i class="lni lni-text-align-right"></i
              ></a>
            </li>
            <li style="display:none">
              <a class="header-menu"><i class="lni lni-menu"></i></a>
            </li>
            <li>
              <a class="header-user" :class="{selected: useMenuState('menu').value.showRighttSideNavbar}" @click="menuMethods('toggleRighttSideNavbar')" ><i class="lni lni-user"></i></a>
            </li>
          </ul>
        </div>
        <div class="navbar-left-side">
          <nav class="leftside-top-nav">
            <ul class="leftside-navmenu">
              <!-- <li class="leap-admin-dropdown">
                <a class="selected">Pages <span>&diams;</span> </a>
                <ul class="leap-admin-dropdown-menu">
                  <li>
                    <a><i class="lni lni-user"></i>My Account</a
                    >
                  </li>
                  <li>
                    <a 
                      ><i class="lni lni-target-customer"></i>Task Manager</a
                    >
                  </li>
                  <li>
                    <a ><i class="lni lni-flower"></i>Team Manager</a>
                  </li>
                  <li>
                    <a ><i class="lni lni-cog"></i>Project Manager</a>
                  </li>
                  <li>
                    <a 
                      ><i class="lni lni-plus"></i>Create New Project</a
                    >
                  </li>
                </ul>
              </li> -->
              <li>
                <a class="selected" @click.prevent="authState.loading_insptd=true;goToInspectDeploy()">InspectDeploy <BtnLoader :show="authState.loading_insptd" /> </a>
                </li>
            </ul>
          </nav>
        </div>
        <div class="navbar-right-side" :style="useMenuState('menu').value.showRighttSideNavbar ? 'display:block' : '' ">
          <nav class="rightside-top-nav">
            <ul class="rightside-navmenu"> 
                <li class="leap-admin-right-dropdown visually-hidden"><a class="leap-admin-dropdown-link selected"><i class="lni lni-alarm"></i></a>
                  <ul class="leap-admin-rightside-dropdown">
                      <li>
                          <div class="leap-admin-rightside-topbar text-center">
                              <h4 class="flex-center w-100">
                                  <span class="text-white">User Notifications</span>
                                  <span class="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">23 new</span>
                              </h4>
                          </div>
                          <div class="leap-admin-rightside-body">
                              <ul class="leap-admin-notification">
                                  <li>
                                      <a href="#">
                                          <span class="notification-title">Cool App</span>
                                          <span class="notification-mutetitle">Marketing campaign planning</span>
                                      </a>
                                  </li>
                                  <li>
                                      <a href="#">
                                          <span class="notification-title">Cool App</span>
                                          <span class="notification-mutetitle">Marketing campaign planning</span>
                                      </a>
                                  </li>
                                  <li>
                                      <a href="#">
                                          <span class="notification-title">Cool App</span>
                                          <span class="notification-mutetitle">Marketing campaign planning</span>
                                      </a>
                                  </li>
                              </ul>
                          </div>
                      </li>
                  </ul>
              </li>

              <li class="leap-admin-right-dropdown visually-hidden"><a class="leap-admin-dropdown-link"><i class="lni lni-flower"></i></a>
                  <ul class="leap-admin-rightside-dropdown">
                      <li>
                          <div class="leap-admin-rightside-topbar text-center">
                              <h4 class="flex-center w-100">
                                  <span class="text-white">Quick Actions </span>
                                  <span class="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">23 Task</span>
                              </h4>
                          </div>
                          <div class="leap-admin-rightside-body p-0">
                              <ul class="leap-admin-notification">
                                  <li>
                                      <div class="row m-0">
                                          <div class="col-sm-6 col-6 p-0">
                                              <div class="leap-admin-action-box action-rightborder action-bottomborder">
                                                  <div class="leap-admin-action-box-inner">
                                                      <span class="leap-admin-action-icon"><i class="lni lni-euro"></i></span>
                                                      <h4 class="leap-admin-action-title">Accounting</h4>
                                                      <span class="leap-admin-action-subtitle">Eccomerce</span>
                                                  </div>
                                              </div>
                                          </div>
                                          <div class="col-sm-6 col-6 p-0">
                                              <div class="leap-admin-action-box action-bottomborder">
                                                  <div class="leap-admin-action-box-inner">
                                                      <span class="leap-admin-action-icon"><i class="lni lni-grid-alt"></i></span>
                                                      <h4 class="leap-admin-action-title">Administrations</h4>
                                                      <span class="leap-admin-action-subtitle">Consol</span>
                                                  </div>
                                              </div>
                                          </div>
                                          <div class="col-sm-6 col-6 p-0">
                                              <div class="leap-admin-action-box action-rightborder">
                                                  <div class="leap-admin-action-box-inner">
                                                      <span class="leap-admin-action-icon"><i class="lni lni-laptop"></i></span>
                                                      <h4 class="leap-admin-action-title">Projects</h4>
                                                      <span class="leap-admin-action-subtitle">Pending Task </span>
                                                  </div>
                                              </div>
                                          </div>
                                          <div class="col-sm-6 col-6 p-0">
                                              <div class="leap-admin-action-box">
                                                  <div class="leap-admin-action-box-inner">
                                                      <span class="leap-admin-action-icon"><i class="lni lni-users"></i></span>
                                                      <h4 class="leap-admin-action-title">Customers</h4>
                                                      <span class="leap-admin-action-subtitle">Latest Cases</span>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </li>
                  </ul>
              </li>             
              <li class="leap-admin-right-dropdown">
                <a class="leap-admin-dropdown-link" @click="menuMethods('toggleProfilePopup')"
                  ><i class="la la-user"></i
                ></a>
                <ul class="leap-admin-rightside-dropdown" :class="{selected: useMenuState('menu').value.showProfilePopup}"
                  :style="useMenuState('menu').value.showProfilePopup ? 'display:block' : '' ">
                  <li>
                    <div class="leap-admin-rightside-topbar text-left">
                      <h4 class="flex-center w-100 ps-4">
                        <span class="text-white">Mark Ande</span>
                        <span class="usermail">info@leapinglogic.com</span>
                      </h4>
                    </div>
                    <div class="leap-admin-rightside-body">
                      <ul class="leap-admin-userprofile-menu">
                        <li>
                          <a >
                            <i class="lni lni-user"></i> My Profile
                          </a>
                        </li>
                        <li>
                          <a >
                            <i class="lni lni-laptop"></i> My Task
                          </a>
                        </li>
                        <li class="mt-2">
                          <a class="logout-btn" @click="authState.loading=true;authMethods('logout')">
                            <i class="fa fa-sign-out"></i> Logout <BtnLoader :show="authState.loading" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup> 
  let authState = useAuthState('auth')
</script>
<style scoped>
.logout-btn:hover,
.logout-btn:hover i
{
  color: white !important;
  cursor: pointer;
}
</style>