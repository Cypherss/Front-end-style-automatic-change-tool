<template>
  <v-app style="position: relative">
    <v-content style="max-width: 700px; max-height: 500px; text-align: center">
      <div style="font-size: 40px">Frontend Style Auto Change Tool</div>
      <br />
      <v-card ref="form" style="opacity: 0.9">
        <v-card-text v-if="isloggingin">
          <div>log in to your account</div>
          <v-text-field
            v-model="name"
            :rules="[() => !!name || 'This field is required']"
            label="Username"
            placeholder="Your username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-card-text>
        <v-card-text v-else>
          <div>create an account</div>
          <v-text-field
            v-model="name1"
            :rules="[() => !!name1 || 'This field is required']"
            label="Enter Your Username"
            placeholder="Your username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password1"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show2 ? 'text' : 'password'"
            label="Enter Your Password"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>
          <v-text-field
            v-model="password2"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show3 ? 'text' : 'password'"
            label="Enter Your Password Again"
            counter
            @click:append="show3 = !show3"
          ></v-text-field>
        </v-card-text>
        <v-card-actions  v-if="isloggingin">
          <v-btn color="primary-dark" dark @click="login" style="width: 100%">
            Log In
          </v-btn>
        </v-card-actions>
        <v-card-actions  v-else>
          <v-btn color="primary-dark" dark @click="signup" style="width: 100%">
            Sign Up
          </v-btn>
        </v-card-actions>
        <br>
      </v-card>
      <br />
      <div v-if="isloggingin">
        <span>Don't have an account? </span
        ><v-btn color="primary-dark" @click="register">Sign Up</v-btn>
      </div>
      <div v-else>
        <span>Already have an account? </span
        ><v-btn color="primary-dark" @click="signin">Log In</v-btn>
      </div>
    </v-content>
    <v-footer app> @copyright 2021 </v-footer>
    <v-snackbar
      v-model="snackbar2"
      :timeout="timeout"
    >
      {{ text2 }}
    </v-snackbar>
    <v-snackbar
      v-model="snackbar3"
      :timeout="timeout"
    >
      {{ text3 }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    isloggingin: true,
    name: null,
    name1: null,
    snackbar2: false,
    snackbar3: false,
    text1: "login success",
    text2: "signup success",
    text3: "Two passwords should be same",
    timeout: 2000,
    show1: false,
    show2: false,
    show3: false,
    password: null,
    password1: null,
    password2: null,
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),

  computed: {
    form() {
      return {
        name: this.name,
        password: this.password,
        name1: this.name1,
        password1: this.password1,
        password2: this.password2
      };
    },
  },

  methods: {
    login() {
      this.axios
        .get(`http://localhost:10000/user/login?name=${this.name}&password=${this.password}`)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit("login", res.data.content.id);
            this.$store.commit("fillName", res.data.content.name);
            this.$router.push("workspace");
          }
        });
    },
    register() {
      this.isloggingin = false;
    },
    signin(){
      this.isloggingin = true;
    },
    signup() {
      if(this.password1 != this.password2){
        this.snackbar3 = true;
        return;
      }
      this.axios
        .post('http://localhost:10000/user/register',null, {params:{
          name: this.name1,
          password: this.password1
        }})
        .then((res) => {
          if (res.data.success) {
            this.snackbar2 = true;
            this.isloggingin = true
          }
        });
    }
  },
};
</script>

<style>
.v-content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>