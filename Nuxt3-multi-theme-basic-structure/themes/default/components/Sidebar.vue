<template>
  <nav id="leap-admin-sidebar" class="leap-admin-sidebar" :class="{active : !menuMethods('isCollapse')}">
    <div class="sidebar-header">
      <div class="logo-area-inner">
        <div class="logo-area-middle">
          <nuxt-link to="/">
            <img src="/img/logo.png" />
          </nuxt-link>
        </div>
        <div class="leap-admin-collapes-area">
          <a class="leap-admin-sidebarCollapse">
            <span class="sidebar-leftmenu-icon" @click="menuMethods('toggleSidebar')">
              <i class="lni lni-chevron-left"></i>
              <i class="lni lni-chevron-left"></i>
            </span>
            <span class="sidebar-rightmenu-icon" @click="menuMethods('toggleSidebar')">
              <i class="lni lni-chevron-right"></i>
              <i class="lni lni-chevron-right"></i>
            </span>
          </a>
        </div>
      </div>
    </div>

    <ul id="leap-admin-accordion" class="leap-admin-accordion">
      <li>
        <nuxt-link @click="menuMethods('activeMenu', 'dashboard')" to="/" class="leftsidebar-link menu-tooltip">
          <i class="las la-home"></i>
          <span class="menu-text">Dashboard</span>
          <span class="tooltip__text tooltip__text--right"> Dashboard </span>
        </nuxt-link>
      </li>
      <li>
        <a @click="menuMethods('activeMenu', 'users')" 
          class="collaps-togglelink menu-tooltip sidemenu-active" :class="{active: menuMethods('isCurrent', 'users', 'create')}">
          <i class="las la-user-friends"></i><span class="menu-text">Users</span>
          <span class="menu-plusminus-icon"><i class="lni" :class="[menuState.isCollapseMenu ? 'lni-chevron-down' : 'lni-chevron-right']"></i></span>
          <span class="tooltip__text tooltip__text--right"> Users </span>
        </a>
        <ul class="accord-submenu" :style="menuMethods('isCurrent', 'users') ? 'display: block' : ''">
          <li @click="menuMethods('activeSubMenu', 'users', 'create')">
            <nuxt-link to="/users/create" class="leftsidebar-link" :class="{'active': menuMethods('isCurrent', 'users', 'create')}">
              <i class="las la-user-plus"></i>
              <span class="menu-text">Add</span>
            </nuxt-link>
          </li>
        </ul>
      </li>
        <li>
          <a @click="menuMethods('activeMenu', 'posts')" 
            class="collaps-togglelink menu-tooltip sidemenu-active" :class="{active: menuMethods('isCurrent', 'posts', 'create-post')}">
            <i class="las la-map-marked"></i><span class="menu-text">Posts</span>
            <span class="menu-plusminus-icon"><i class="lni" :class="[menuState.isCollapseMenu ? 'lni-chevron-down' : 'lni-chevron-right']"></i></span>
            <span class="tooltip__text tooltip__text--right"> Posts </span>
          </a>
          <ul class="accord-submenu" :style="menuMethods('isCurrent', 'posts') ? 'display: block' : ''">
            <li @click="menuMethods('activeSubMenu', 'posts', 'create-post')">
              <nuxt-link to="/posts/create-post" class="leftsidebar-link" :class="{'active': menuMethods('isCurrent', 'posts', 'create-post')}">
                <i class="las la-user-plus"></i>
                <span class="menu-text">Add Site Post</span>
              </nuxt-link>
            </li>
             <li @click="menuMethods('activeSubMenu', 'posts', 'create-checkpoint')">
              <nuxt-link to="/posts/create-checkpoint" class="leftsidebar-link" :class="{'active': menuMethods('isCurrent', 'posts', 'create-checkpoint')}">
                <i class="las la-map-pin"></i>
                <span class="menu-text">Add Check points </span>
              </nuxt-link>
            </li>
          </ul>
      </li>
      <li>
          <a @click="menuMethods('activeMenu', 'guards')" 
            class="collaps-togglelink menu-tooltip sidemenu-active" :class="{active: menuMethods('isCurrent', 'guards', 'add-guard')}">
            <i class="las la-male"></i><span class="menu-text">Guards</span>
            <span class="menu-plusminus-icon"><i class="lni" :class="[menuState.isCollapseMenu ? 'lni-chevron-down' : 'lni-chevron-right']"></i></span>
            <span class="tooltip__text tooltip__text--right"> Guards </span>
          </a>
          <ul class="accord-submenu" :style="menuMethods('isCurrent', 'guards') ? 'display: block' : ''">
            <li @click="menuMethods('activeSubMenu', 'guards', 'add-guard')">
              <nuxt-link to="/guards/add-guard" class="leftsidebar-link" :class="{'active': menuMethods('isCurrent', 'guards', 'add-guard')}">
                <i class="las la-user-plus"></i>
                <span class="menu-text">Add Guard</span>
              </nuxt-link>
            </li>

          </ul>
      </li>
      <li>
        <nuxt-link to="/reports" @click="menuMethods('activeMenu', 'reports')" class="leftsidebar-link menu-tooltip sidemenu-active" :class="{'active': menuMethods('isCurrent', 'reports')}">
          <i class="lab la-wpforms"></i><span class="menu-text">Reports</span>
          <span class="tooltip__text tooltip__text--right"> Reports </span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/settings" @click="menuMethods('activeMenu', 'settings')" class="leftsidebar-link menu-tooltip sidemenu-active" :class="{'active': menuMethods('isCurrent', 'settings')}">
          <i class="las la-cog"></i><span class="menu-text">Settings</span>
          <span class="tooltip__text tooltip__text--right"> Settings </span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script setup>
  let menuState = useMenuState()
</script>
<style scoped>
  .router-link-active[data-v-b58d64c7] {
    background: #2d4038 !important;
}
</style>