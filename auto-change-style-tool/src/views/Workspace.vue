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
            <span class="mr-2" style="color: #ffffff">{{ username }}</span>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2"> Tips </v-card-title>
          <br />
          <v-card-text style="font-size: 20px">
            Are you sure to log out?
          </v-card-text>

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
                <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
                <v-list-item link>
                  <v-list-item-content @click="toSource">
                    <v-list-item-title
                      ><v-icon left> mdi-warehouse </v-icon> Source Repo
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-content @click="toChange">
                    <v-list-item-title
                      ><v-icon left> mdi-camera-switch-outline </v-icon>
                      Style Change
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-content @click="toHistory">
                    <v-list-item-title
                      ><v-icon left> mdi-history </v-icon> History
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link>
                  <v-list-item-content @click="toInfo">
                    <v-list-item-title
                      ><v-icon left>
                        mdi-account-supervisor-circle-outline
                      </v-icon>
                      Person Info
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg" v-show="show[0]">
              <repo></repo>
            </v-sheet>
            <v-sheet min-height="70vh" rounded="lg" v-show="show[1]">
              <workflow></workflow>
            </v-sheet>
            <v-sheet min-height="70vh" rounded="lg" v-show="show[2]">
              <!--  -->
            </v-sheet>
            <v-sheet min-height="70vh" rounded="lg" v-show="show[3]">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-snackbar v-model="$store.state.snackbar1" :timeout="timeout">
      {{ text1 }}
    </v-snackbar>
  </v-app>
</template>

<script>
import workflow from '../components/workflow'
import repo from '../components/repo'

export default {
  components: { workflow, repo },
  data: () => ({
    selectedItem: 0,
    username: "",
    dialog: false,
    text1: "login success",
    timeout: 2000,
    show: [true, false, false, false],
  }),
  mounted() {
    this.username = this.$store.state.userName;
  },
  methods: {
    logout() {
      this.$store.dispatch("refresh");
      this.$router.push("/login");
    },
    toSource() {
      this.show = [true, false, false, false];
    },
    toChange() {
      this.show = [false, true, false, false];
    },
    toHistory() {
      this.show = [false, false, true, false];
    },
    toInfo() {
      this.show = [false, false, false, true];
    },
  },
};
</script>

<style>
</style>