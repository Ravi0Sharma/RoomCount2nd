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
  
  