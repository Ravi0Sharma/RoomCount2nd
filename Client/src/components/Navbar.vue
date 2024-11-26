<template>
   <BNavbar toggleable="lg" variant="dark" v-b-color-mode="'dark'" expand="lg">
      <BNavbarBrand class="brand">Room Count</BNavbarBrand>
  
      <BNavbarToggle target="nav-collapse"/>
      <BCollapse id="nav-collapse" is-nav>
  
      <!-- Nav buttons -->
      <BNavbarNav class="d-flex gap-2">
        <BNavItem class="buttonsNav">
          <router-link to="/HomePage">Home</router-link>
        </BNavItem>
        <BNavItem class="buttonsNav">
          <router-link to="/Offices">Sessions</router-link>
        </BNavItem>
      </BNavbarNav>
  
      <!-- Username-->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <div class="d-none d-lg-flex align-items-center">
        </div>
  
        <!-- Dropdown -->
        <BDropdown class="custom-dropdown ml-3 text-center" variant="transparent" size="sm" right >
          <template #button-content>
            <span class="d-lg-none" style="margin-left: 26%; font-size: 16px; font-family: sans-serif; color: #FFFFFF;"> Account</span>
          </template>
          <BDropdownItem @click="logout">Logout</BDropdownItem>
        </BDropdown>
      </BNavbarNav>
    </BCollapse>
    </BNavbar>
  </template>
 