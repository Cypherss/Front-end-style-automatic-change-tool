<template>
  <v-app>
    <v-app-bar app color="primary-dark" dark>
      <v-btn class="shrink mt-1 hidden-sm-and-down" text>
        <span class="mr-2" style="font-size: 20px"
          >Frontend Style Auto Change Tool</span
        >
      </v-btn>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <span class="mr-2" style="color: #ffffff">{{
              $store.state.userName
            }}</span>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2"> Tips </v-card-title>
          <br>
          <v-card-text style="font-size:20px"> Are you sure to log out? </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="primary-dark" text @click="dialog = false">
              no
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="logout"> yes </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item link>
                  <v-list-item-content>
                    <v-list-item-title> 源仓库 </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-content>
                    <v-list-item-title> 风格替换 </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-content>
                    <v-list-item-title> 历史记录 </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> 个人信息 </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-snackbar
      v-model="snackbar1"
      :timeout="timeout"
    >
      {{ text1 }}
    </v-snackbar>
  </v-app>
  
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    snackbar1: false,
    text1: "login success",
    timeout: 2000,
  }),
  mounted() {
    this.snackbar1 = true;
  },
  methods: {
    logout() {
      this.$store.dispatch('refresh');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
</style>