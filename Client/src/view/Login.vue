<template>
    <div class="login-wrapper">
      <div class="title">
          <h1>RoomCount</h1>
        </div>
      <BContainer class="d-flex justify-content-center align-items-center vh-100">
          <BCard class="text-center">
              <h1 class="mb-3">Welcome Back!</h1>
              <p class="mb-4">Manage and track your rooms effortlessly. Log in to continue your RoomCount journey</p>
              <BForm @submit.prevent="login">
                  <div class="username d-flex justify-content-center">
                      <BFormInput id="username" v-model="input.username" type="text"
                          placeholder="Enter your username" required class="custom-input w-75"></BFormInput>
                  </div>
                  <div class="password d-flex justify-content-center">
                    <BFormInput id="password" v-model="input.password" type="password"
                          placeholder="Enter your password" required class="custom-input w-75"></BFormInput>
                  </div>
  
                  <BButton type="submit" variant="warning" class="custom-button w-75">Login</BButton>
                </BForm>
  
              <p class="register mt-3">
                  If you don't have an account,
                  <router-link to="/Register">Sign up here</router-link>
              </p>
          </BCard>
      </BContainer>
  
      <div class="toast-container position-fixed top-0 end-0 p-3">
          <div id="liveToast" class="toast bg-dark" role="alert" style="color: white;" aria-live="assertive" aria-atomic="true" :class="{'show': showToast}">
              <div class="toast-header bg-dark" style="color: white;">
                  <strong class="me-auto">BeerStep</strong>
                  <small>Just now</small>
                  <button type="button" class="btn-close" @click="showToast = false" aria-label="Close"></button>
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
      name: 'LogIn',
      data() {
          return {
              input: {
                  username: "",
                  password: ""
              },
              toastMessage: "",
              showToast: false
          };
      },
      methods: {
          async login() {
              try {
                  // Construct query parameters (username and password)
                  const queryParams = new URLSearchParams({
                      username: this.input.username,
                  }).toString();
  
                  // Send GET request with the login data
                  const response = await fetch(`/api/users?${queryParams}`, {
                      method: 'GET',
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  });
  
                  if (response.ok) {
                      const responseData = await response.json();
  
                      // Check if a user was found
                      if (responseData.users && responseData.users.length > 0) {
                          const user = responseData.users[0];
  
                          // Check if the input password matches the one from the response
                          if (user.password === this.input.password) {
                              // Save the username to local storage
                              localStorage.setItem('username', this.input.username);
  
                              // Success message and redirect to homepage
                              this.showToast = true;
                              this.toastMessage = 'Login successful!';
                             
                                  this.showToast = false;
                                  this.$router.push('/homepage');
                          } else {
                              // Password mismatch
                              this.showToast = true;
                              this.toastMessage = 'Invalid password.';
                              setTimeout(() => this.showToast = false, 3000); 
                          }
                      } else {
                          // No matching user found
                          this.showToast = true;
                          this.toastMessage = 'Invalid username.';
                          setTimeout(() => this.showToast = false, 3000); 
                      }
                  } 
              } catch (error) {
                  console.error('Error logging in:', error);
                  this.showToast = true;
                  this.toastMessage = 'An error occurred while logging in. Please try again.';
                  setTimeout(() => this.showToast = false, 3000); 
              }
          }
      }
  };
  </script>
  