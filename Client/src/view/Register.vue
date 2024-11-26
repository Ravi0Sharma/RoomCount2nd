<template>
    <div class="register-wrapper">
      <div class="title">
        <h1>RoomCount</h1>
      </div>
      <BContainer class="d-flex justify-content-center align-items-center vh-100">
        <BCard class="text-center">
          <h1 class="mb-3">Register an Account</h1>
          <p class="mb-4">Join RoomCount today and start managing and tracking your rooms</p>
          <BForm @submit.prevent="register">
            <div class="email d-flex justify-content-center">
              <BFormInput id="email" v-model="input.email" type="email" placeholder="Enter your email"
                required class="custom-input w-75"></BFormInput>
            </div>
            <div class="username d-flex justify-content-center">
              <BFormInput id="username" v-model="input.username" type="text" placeholder="Enter your username"
                required class="custom-input w-75"></BFormInput>
            </div>
            <div class="password d-flex justify-content-center">
              <BFormInput id="password" v-model="input.password" type="password" placeholder="Enter your password"
                required class="custom-input w-75"></BFormInput>
            </div>
            <BButton type="submit" variant="warning" class="custom-button w-75">Register</BButton>
          </BForm>
  
          <p class="logIn mt-3">
            If you already have an account, <router-link to="/LogIn">Sign in here</router-link>
          </p>
  
        </BCard>
      </BContainer>
  
      <!-- Toast Notification -->
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="liveToast" class="toast bg-dark" role="alert" style="color: white;" aria-live="assertive"
          aria-atomic="true" :class="{'show': showToast}">
          <div class="toast-header bg-dark" style="color: white;">
            <strong class="me-auto">BeerStep</strong>
            <small>Just now</small>
            <BButton type="button" class="btn-close" @click="showToast = false" aria-label="Close"></BButton>
          </div>
          <div class="toast-body">
            {{ toastMessage }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',
    data() {
      return {
        input: {
          username: "",
          password: ""
        },
        message: "",  
        showToast: false,  
        toastMessage: ""  
      };
    },
    methods: {
      async register() {
        try {
          const newUser = {
            username: this.input.username,
            password: this.input.password
          };
  
          // Call the backend to create a new user
          const backendResponse = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)  
          });
  
          if (backendResponse.ok) {
            const userData = await backendResponse.json();
            console.log('User registered successfully:', userData);
  
            this.toastMessage = "Registration successful! Redirecting to login page";
            this.showToast = true;
  
            // Redirect to login 
            setTimeout(() => {
              this.$router.push('/LogIn');
            }, 500);  
          } else {
            const errorData = await backendResponse.json();
            this.message = errorData.message || 'An error occurred during registration.';
            console.error('Error registering user:', this.message);
            
  
            // Show error toast
            this.toastMessage = "Registration failed: " + this.message;
            this.showToast = true;
            setTimeout(() => this.showToast = false, 3000);
          }
        } catch (error) {
          console.error('Error registering user:', error);
          this.message = 'An error occurred while registering. Please try again.';
  
          // Show error toast
          this.toastMessage = "Error: " + this.message;
          this.showToast = true;
          setTimeout(() => this.showToast = false, 3000);
        }
      }
    }
  };
  </script>
  

