<template>
  <div class="main " style="min-height: 100vh;">
    <BRow>
      <BCol class="quotes text-center">
        <p style="color: whitesmoke; font-size: 34px; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);">Session</p>
        <BCard class="card">
          <div class="stats">
            <p>Entries:</p>
            <h2>{{ session.entries }}</h2>
          </div>
          <BButton class="btn btn-success w-50" @click="createSession">Create Session</BButton>
          <BButton class="btn btn-danger w-50" @click="endSession">End Session</BButton>

          <div class="MaxSet d-flex justify-content-center">
            <BFormInput id="maxSet" v-model="maxEntryLimit" type="text" placeholder="Enter Maximum Entry Limit"
              required class="maxSet_input"></BFormInput>
              <BButton class="maxbtn btn-danger w-25" @click="maxSet">Set Max</BButton>
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
      session: {
        active: false,
        entries: 0,
      },
      fetchInterval: null,
      maxEntryLimit: 0
    };
  },
  methods: {
    // Fetch the latest counter value and update the session
    async fetchCounter() {
      try {
        const response = await axios.get('http://localhost:3000/api/entries');
        if (response.data && typeof response.data.counter === 'number') {
          this.session.entries = response.data.counter; // Update entries
        } else {
          console.error('Unexpected response:', response.data);
        }
      } catch (err) {
        console.log('Error fetching counter: ' + err.message);
      }
    },


    // Start a new session with entries initialized to 0
    async createSession() {
      if (!this.session.active) {
        this.session.active = true;
        this.session.entries = 0;
        console.log('Session started:', this.session);


        // Set an interval to fetch data every 1 second
        this.fetchInterval = setInterval(async () => {
          await this.fetchCounter();
        }, 1000);
      }
    },

    endSession() {
      if (this.session.active) {
        console.log('Ending session', this.session);


        axios.post('http://localhost:3000/api/session', { value: 0 })
          .then((response) => {
            console.log(response.data.message);
            this.session.entries = 0;
            this.session.active = false;
            clearInterval(this.fetchInterval);
          })
          .catch((err) => {
            console.error('Error updating counter:', err.message);
          });
      }
    },

    async maxSet() {
      try {
        const response = await axios.post('http://localhost:3000/api/entries/maxset', {
          maxLimit: this.maxEntryLimit
        });

        console.log(response.data);
        alert("Maximum entry limit set successfully!");
      } catch (error) {
        console.error("Error setting maximum entry limit:", error);
        alert("Failed to set maximum entry limit.");
      }
    }

  },
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

.card {
  background-color: #292929;
  color: white;
  height: 100%;
  text-align: center;
  padding: 40px;
  width: 900px;
  border-radius: 15px;
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

.maxSet_input {
  width: 100%;
  background-color: #333;
  margin-top: 50px;
  border: 1px solid #555;
  background-color: #fff;
  height: 40px;
}

.maxbtn{
border-radius: 10px;
margin-left: 10px;
}
</style>