<template>
  <div class="main bg-dark" style="min-height: 100vh;">
    <BRow>
      <BContainer fluid class="beerBack" />
      <BCol class="overlay">
        <div class="stats">
          <h2>{{ stepsNeeded }}</h2>
          <p>Steps Needed</p>
        </div>
        <router-link to="/" class="btn btn-danger w-25">Session Page</router-link>
      </BCol>

      <BCol class="quotes text-center">
        <p style="color: #ebb112;">Session</p>
        <BCard class="card-quotes">
        
        </BCard>
      </BCol> 
    </BRow>
  </div>
</template>