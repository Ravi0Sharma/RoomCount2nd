<template>
    <div class="login-wrapper">
      <div class="title">
          <h1>RoomCount</h1>
        </div>
      <BContainer class= "container">
          <BCard class="text-center">
              <h1 class="mb-3">Welcome Back!</h1>
              <p class="mb-4">Manage and track your rooms effortlessly. Log in to continue your RoomCount journey</p>
              <BForm @submit.prevent="login">
                  <div class="username d-flex justify-content-center">
                      <BFormInput id="username" v-model="input.username" type="text" 
                          placeholder="Enter your username" required class="custom-input"></BFormInput>
                  </div>
                  <div class="password d-flex justify-content-center">
                    <BFormInput id="password" v-model="input.password" type="password"
                          placeholder="Enter your password" required class="custom-input"></BFormInput>
                  </div>
  
                  <BButton type="submit" variant="warning" class="custom-button">Login</BButton>
                </BForm>
  
              <p class="register mt-3">
                  If you don't have an account,
                  <router-link to="/Register">Sign up here</router-link>
              </p>
          </BCard>
      </BContainer>
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
  

  <style scoped>
  .username {
      padding-top: 40px;
      padding-bottom: 10px;
  }
  
  .password {
      padding-top: 10px;
      padding-bottom: 20px;
  }
  
  .custom-button {
      width: 78%;
      border-radius: 20px;
      padding: 15px;
      border: none;
      background-color: orange
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; 
    text-align: center;
}
  
  .custom-input {
      border-radius: 20px;
      padding: 13px;
      border: 1px solid #ced4da;
      width: 75%;
  }
  
  .text-center {
      border-radius: 20px;
      margin-bottom: 390px;
      background-color: white;
  }
  
  .mb-3 {
      padding-top: 12%;
      font-weight: 400;
      font-size: 42px;
      font-family:  sans-serif;
  }

  .mb-4{
    font-family:  Tahoma;
  }
  
  .form {
      border-radius: 20px;
  }
  
  .title {
      font-family:  Tahoma;
      text-align: center;
      color: White;
      font-size: 16px;
      padding: 20px;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }
  
  .login-wrapper {
      background-image: url('../assets/background.jpg');
      background-size: cover;
      background-position: center;
      height: 100%;
      margin: 0;
  }
  
  .register {
      color: rgb(49, 49, 49);
      font-size: 14px;
      font-family:  Tahoma;
  }
  
  .text-center {
      width: 700px;
      height: 600px;
  }
  </style>
  