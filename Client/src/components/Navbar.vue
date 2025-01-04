<template>
  <BNavbar toggleable="lg" variant="dark" v-b-color-mode="'dark'" expand="lg">
    <BNavbarBrand class="brand">Room Count</BNavbarBrand>

    <!-- Navbar links displayed in normal view -->
    <BNavbarNav class="ms-auto mb-2 mb-lg-0">
      <BNavItem> <router-link to="/Homepage" class="nav-link">Home</router-link></BNavItem>
      <BNavItem> <router-link to="/SessionHistory" class="nav-link">SessionHistory</router-link> </BNavItem>
    </BNavbarNav>

    <BNavbarToggle target="nav-collapse"/>
    <BCollapse id="nav-collapse" is-nav>
      <!-- Account Dropdown in collapsed view -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BDropdown class="custom-dropdown ml-3 text-center" variant="transparent" size="sm" right>
          <template #button-content>
            <span class="d-lg-none" style="font-size: 16px; font-family: sans-serif; color: #FFFFFF;">Account</span>
          </template>
          <BDropdownItem @click="logout">Logout</BDropdownItem>
        </BDropdown>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<style scoped>
.nav-link {
  padding-left: 0;
  padding-right: 0;
  font-size: 16px;
}

.custom-dropdown {
  margin-left: 10px;
}

.custom-dropdown .nav-link {
  padding-left: 15px; 
}
</style>

<style scoped>
.nav-link {
  padding-left: 0;
  padding-right: 0;
  font-size: 16px;
}

.custom-dropdown {
  margin-left: 10px;
}

.custom-dropdown .nav-link {
  padding-left: 15px; 
}
</style>

  <script>
  export default {
    name: 'Navbar',
    data() {
      return {
        menuVisible: false,
        username: ''
      };
    },
    mounted() {
      this.username = localStorage.getItem('username') || 'Guest';
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      logout() {
        // Clear the localStorage on logout .
        localStorage.removeItem('username');
        this.$router.push('/');
      }
    }
  }
  </script>
  
  <style scoped>
  .brand {
    color: whitesmoke !important;
    font-size: 28px;
    margin-right: 5%;
    margin-left: 5%;
    font-family: 'Source Sans Pro';
  }
  
  .buttonsNav {
    font-family: sans-serif;
    gap: 30px;
  }
  
  .username {
    font-size: 13px;
    font-weight: bold;
    color: whitesmoke;
    padding-left: 10px;
    padding-right: 10px;
    font-family: Tahoma;
  }
  
  .buttonsNav a,
  router-link {
    color: #E0E0E0;
    text-decoration: none;
    font-family: Tahoma;
  }
  
  .buttonsNav a:hover,
  router-link:hover {
    color: #d1da8e;
  }
  
  .custom-dropdown {
    padding-right: 30px;
  }
  
  .nav-collapse {
    margin-right: 5%;
  }
  
  .custom-dropdown .dropdown-item {
    color: #E0E0E0;
    background-color: transparent;
  }
  
  </style>
  