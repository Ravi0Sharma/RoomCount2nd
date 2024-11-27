<template>
  <div class="main " style="min-height: 100vh;">
    <BRow>
      <BCol class="quotes text-center">
        <p style="color: whitesmoke; font-size: 34px; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);">Session</p>
        <BCard class="card">
            <div class="stats">
              <h2>{{ Entries }}</h2>
              <p>Entries</p>
            </div>
            <BButton class="btn btn-success w-50">Start Session</BButton>
            <BButton class="btn btn-danger w-50">End Session</BButton>
        </BCard>
      </BCol>
    </BRow>
  </div>
</template>


<style scoped>
.main {
  overflow-x: hidden;
  background-image: url('../assets/background.jpg');
      background-size: cover;
      background-position: center;
      height: 100%;
      margin: 0;
}

.overlay {
  position: absolute;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  font-size: 28px;
  font-family: sans-serif;
  margin-top: 10%;
}

.btn {
  border-radius: 20px;
  margin-top: 50px;
}

.quotes {
  margin-top: 2%;
  color: #292929;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card{
  background-color: #292929;
  color: white;
  height: 100%;
  text-align: center;
  padding: 40px;
  width: 900px;
  border-radius: 15px;
}

#inputfield {
  width: 100%;
  background-color: #333;
  margin-top: 20px;
  border: 1px solid #555;
  background-color: #fff;
}

.button {
  margin-top: 20px;
  width: 100%;
  margin-bottom: 20px;
}

.goal-display {
  color: #ffffff;
  text-decoration: underline;
  font-size: 20px;
  text-align: center;
}
</style>