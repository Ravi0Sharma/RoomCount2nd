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
            <BFormInput id="maxSet" v-model="maxEntryLimit" type="text" placeholder="Enter Maximum Entry Limit" required
              class="maxSet_input"></BFormInput>
            <BButton class="maxbtn btn-danger w-25" @click="maxSet">Set Max</BButton>
          </div>
        </BCard>
        <BButton class="btn btn-warning w-50" @click="historyPage">History Page</BButton>
      </BCol>
    </BRow>
  </div>
</template>


<script>
export default {
  data() {
    return {
      session: {
        active: false,
        entries: 0,
      },
      counter: 0, // Counter variable for session entries 
      maxEntryLimit: 0,
      sseSource: null, // SSE EventSource
    };
  },
  created() {
    // Connect to the SSE endpoint
    this.sseSource = new EventSource('/events');

    // Listen for incoming messages
    this.sseSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received SSE message:', data);

      // Handle RoomCount entry topic
      if (data.topic === 'RoomCount/1/entry') {
        if (this.session.active) {
          this.session.entries++;
          this.counter++;
          console.log(`Counter incremented: ${this.counter}`);
        }
      }
    };

    this.sseSource.onerror = (error) => {
      console.error('SSE connection error:', error);
    };
  },
  methods: {
    createSession() {
      if (!this.session.active) {
        this.session.active = true;
        this.session.entries = 0;
        this.counter = 0; 
        console.log('Session started:', this.session);
      }
    },

    historyPage() {
      this.$router.push('/SessionHistory');
    },

    endSession() {
      if (this.session.active) {
        console.log('Ending session', this.session);

        // Reset session and counter data
        this.session.entries = 0;
        this.counter = 0; 
        this.session.active = false;

        console.log('Session ended.');
      }
    },

    maxSet() {
      if (isNaN(this.maxEntryLimit) || this.maxEntryLimit <= 0) {
        console.error('Please enter a valid positive number for the maximum entry limit.');
        return;
      }

      const topic = 'RoomCount/1/maxset';
      const payload = JSON.stringify({ maxLimit: this.maxEntryLimit });

      // Publish the max limit via a POST request to your server
      fetch('/api/maxset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      })
        .then((response) => {
          if (!response.ok) throw new Error('Failed to set max entry limit');
          return response.json();
        })
        .then((data) => {
          console.log('Max entry limit set successfully!', data);
          alert('Max entry limit set successfully!');
        })
        .catch((error) => {
          console.error('Error setting max entry limit:', error);
          alert('Error setting max entry limit.');
        });
    },
  },
  onUnmounted() {
    if (this.sseSource) {
      this.sseSource.close(); // Clean up SSE connection on component destruction
      console.log('SSE connection closed.');
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

.maxbtn {
  border-radius: 10px;
  margin-left: 10px;
}
</style>