<template>
    <div class="login-wrapper">
        <div class="title">
            <h1>RoomCount</h1>
        </div>
        <BContainer class="container">
            <BCard class="text-center">
                <h1 class="mb-3">Welcome Back!</h1>
                <p class="mb-4">Manage and track your rooms effortlessly. Log in to continue your RoomCount journey</p>
                <BForm @submit.prevent="login">
                    <div class="username d-flex justify-content-center">
                        <BFormInput id="username" v-model="input.username" type="text" placeholder="Enter your username"
                            required class="custom-input"></BFormInput>
                    </div>
                    <div class="password d-flex justify-content-center">
                        <BFormInput id="password" v-model="input.password" type="password"
                            placeholder="Enter your password" required class="custom-input"></BFormInput>
                    </div>

                    <BButton type="submit" variant="warning" class="custom-button">Login</BButton>
                </BForm>

                <p class="register mt-3">
                    If you don't have an account,
                    <router-link to="/RegisterPage">Sign up here</router-link>
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
            }
        };
    },
    methods: {
        async login() {
            try {

                // Send GET request with the login data
                const response = await fetch(`http://localhost:3000/api/users/${this.input.username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const user = await response.json();

                    if (user) {
                        if (user.password === this.input.password) {
                            sessionStorage.setItem('username', this.input.username);
                            this.$router.push('/homepage');
                        } else {
                            alert('Invalid password.');
                        }
                    }
                } else {
                    console.error('Server responded with status:', response.status);
                    
                    alert('An error occurred while logging in. Please try again.');
                }
            } catch (error) {
                console.error('Error logging in:', error);
                alert('An error occurred while logging in. Please try again.');
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
    font-family: sans-serif;
}

.mb-4 {
    font-family: Tahoma;
}

.form {
    border-radius: 20px;
}

.title {
    font-family: Tahoma;
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
    font-family: Tahoma;
}

.text-center {
    width: 700px;
    height: 600px;
}
</style>