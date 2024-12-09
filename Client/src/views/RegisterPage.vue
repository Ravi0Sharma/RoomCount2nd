<template>
    <div class="register-wrapper">
      <div class="title">
        <h1>RoomCount</h1>
      </div>
      <BContainer class="container">
        <BCard class="text-center">
          <h1 class="mb-3">Register an Account</h1>
          <p class="mb-4">Join RoomCount today and start managing and tracking your rooms effortlessly.</p>
          <BForm @submit.prevent="register">
            <div class="email d-flex justify-content-center">
              <BFormInput id="email" v-model="input.email" type="email" 
                placeholder="Enter your email" required class="custom-input"></BFormInput>
            </div>
            <div class="username d-flex justify-content-center">
              <BFormInput id="username" v-model="input.username" type="text" 
                placeholder="Enter your username" required class="custom-input"></BFormInput>
            </div>
            <div class="password d-flex justify-content-center">
              <BFormInput id="password" v-model="input.password" type="password" 
                placeholder="Enter your password" required class="custom-input"></BFormInput>
            </div>
            <BButton type="submit" variant="warning" class="custom-button">Register</BButton>
          </BForm>
  
          <p class="logIn mt-3">
            If you already have an account, <router-link to="/">Sign in here</router-link>
          </p>
        </BCard>
      </BContainer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',
    data() {
      return {
        input: {
          email: "",
          username: "",
          password: ""
        },
        toastMessage: "",
        showToast: false
      };
    },
    methods: {
      async register() {
        try {
          const newUser = {
            email: this.input.email,
            username: this.input.username,
            password: this.input.password
          };
  
          const backendResponse = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
          });
  
          if (backendResponse.ok) {
            const userData = await backendResponse.json();
            this.toastMessage = "Registration successful! Redirecting to login page";
            this.showToast = true;
  
            setTimeout(() => {
              this.$router.push('/LogIn');
            }, 500);
          } else {
            const errorData = await backendResponse.json();
            this.toastMessage = "Registration failed: " + (errorData.message || 'Unknown error');
            this.showToast = true;
            setTimeout(() => this.showToast = false, 3000);
          }
        } catch (error) {
          console.error('Error registering user:', error);
          this.toastMessage = "An error occurred during registration. Please try again.";
          this.showToast = true;
          setTimeout(() => this.showToast = false, 3000);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .email, .username, .password {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  
  .custom-button {
    width: 78%;
    border-radius: 20px;
    padding: 15px;
    border: none;
    background-color: orange;
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
    font-family: sans-serif;
  }
  
  .mb-4 {
    font-family: Tahoma;
  }
  
  .title {
    font-family: Tahoma;
    text-align: center;
    color: White;
    font-size: 16px;
    padding: 20px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }
  
  .register-wrapper {
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: center;
    height: 100%;
    margin: 0;
  }
  
  .logIn {
    color: rgb(49, 49, 49);
    font-size: 14px;
    font-family: Tahoma;
  }
  
  .text-center {
    width: 700px;
    height: 600px;
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
  }
  </style>
  