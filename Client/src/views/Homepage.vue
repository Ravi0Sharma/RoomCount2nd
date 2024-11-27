<template>
  <div class="main bg-dark" style="min-height: 100vh;">
    <BRow>
      <BContainer fluid class="beerBack" />
      <BCol class="overlay">
        <div class="stats">
          <h2>{{ stepsNeeded }}</h2>
           <p>Entries</p>
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


<style scoped>

.main {
  overflow-x: hidden;
}

.overlay {
  position: absolute;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  font-size: 28px;
  font-family: sans-serif;
  margin-top: 10%;
}

.btn{
 border-radius: 20px;
}

.btn:hover {
  transform: translateY(-3px);
}

.quotes {
  margin-top: 2%;
  color: #292929;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.card-quotes {
  background-color: #292929; 
  color: white; 
  height: 70%; 
  text-align: center; 
  padding: 40px ;
  width: 100%; 
  max-width: 500px; 
}

#inputfield{
  width: 100%; background-color: #333; 
  margin-top: 20px; 
  border: 1px solid #555;
  background-color: #fff;
}
.button{
margin-top: 20px; 
width: 100%; 
margin-bottom:20px;
}

.goal-display{
  color: #ffffff;
  text-decoration: underline;
  font-size: 20px;
 text-align: center;
}
</style>