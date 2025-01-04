<template>
  <div class="main" style="min-height: 100vh;">
    <BRow>
      <BCol class="quotes text-center">
        <p style="color: whitesmoke; font-size: 34px; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);">Session History</p>
        <BCard class="card">
          <div class="stats">
            <p style="font-size: 18px;">Previous Sessions:</p>
            <ul class="history-list">
              <li v-for="(session, index) in sessionHistory" :key="index">
                <p>Session {{ index + 1 }}:</p>
                <ul class="session-details">
                  <li><strong>Max Count:</strong> {{ session.max_count }}</li>
                  <li><strong>Entries:</strong> {{ session.entries }}</li>
                  <li><strong>Max Amount Surpassed:</strong> {{ session.max_amount_surpass }}</li>
                </ul>
              </li>
            </ul>
          </div>
        </BCard>
      </BCol>
    </BRow>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      sessionHistory: [] 
    };
  },
  created() {
    this.fetchSessions();
  },
  methods: {
    async fetchSessions() {
      try {
        const username = sessionStorage.getItem('username')
        const response = await axios.get(`http://localhost:3000/api/session${username}`); 
        this.sessionHistory = response.data; 
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    }
  }
};
</script>

<style scoped>
.main {
  overflow-x: hidden;
  background-image: url('../assets/background.jpg');
  background-size: cover;
  background-position: center;
  height: 100%;
  margin: 0;
}

.quotes {
  margin-top: 2%;
  color: #292929;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  background-color: #292929;
  color: white;
  height: 100%;
  text-align: center;
  padding: 40px;
  width: 900px;
  border-radius: 15px;
}

.history-list {
  color: white;
  font-size: 18px;
  list-style-type: none;
  padding: 0;
  margin: 20px 0 0 0;
}

.history-list li {
  margin: 10px 0;
}

.session-details {
  list-style-type: none;
  padding-left: 20px;
  font-size: 16px;
  text-align: left;
}

.session-details li {
  margin: 5px 0;
}
</style>