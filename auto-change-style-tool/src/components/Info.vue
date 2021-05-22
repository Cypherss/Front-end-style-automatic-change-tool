<template>
  <v-main style="padding: 0">
    <v-toolbar
      color="white"
      style="font-size: 30px; box-shadow: 0 0 0 !important"
    >
      <v-toolbar-title
        ><v-icon>mdi-account</v-icon> Account Information
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-row style="padding: 20px">
      <div style="margin: 20px">
        UserId: {{ $store.state.userId }}<br />
        Username: {{ $store.state.userName }}
      </div>
    </v-row>
    <v-toolbar
      color="white"
      style="font-size: 30px; box-shadow: 0 0 0 !important"
    >
      <v-toolbar-title
        ><v-icon>mdi-account-group-outline</v-icon> Team Information
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" fab dark color="#1976d2" @click="createGroup">
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-row style="padding: 20px">
      <v-col v-for="group in groupsContent" :key="group.id" :cols="4">
        <div style="padding: 0px">
          <v-card elevation="2">
            <v-card-title>{{ group.name }}</v-card-title>
            <v-card-text>{{ group.description }}</v-card-text>
            <v-card-actions
              ><v-btn color="orange lighten-2" text @click="invite(group.id)">
                Invite
              </v-btn></v-card-actions
            >
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog1" persistent max-width="500px">
        <v-form ref="form2">
          <v-card>
            <v-card-title>
              <span class="headline">Create Your Group</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="name"
                      label="Group Name*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="desc"
                      label="Group Description*"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>* indicates required field<br /></small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close1"> Close </v-btn>
              <v-btn
                style="width: 100px"
                color="blue darken-1"
                text
                @click="submit1"
              >
                Submit</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog2" persistent max-width="500px">
        <v-form ref="form3">
          <v-card>
            <v-card-title>
              <span class="headline">Invite User</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="inviteId"
                      label="Invitee's userId*"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>* indicates required field<br /></small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close2"> Close </v-btn>
              <v-btn
                style="width: 100px"
                color="blue darken-1"
                text
                @click="submit2"
              >
                Submit</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
    <v-snackbar v-model="snackbar4" :timeout="timeout">
      {{ text4 }}
    </v-snackbar>
    <v-snackbar v-model="snackbar5" :timeout="timeout">
      {{ text5 }}
    </v-snackbar>
    <v-snackbar v-model="snackbar6" :timeout="timeout">
      {{ text6 }}
    </v-snackbar>
    <v-snackbar v-model="snackbar7" :timeout="timeout">
      {{ text7 }}
    </v-snackbar>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      groupId: null,
      dialog1: false,
      name: "",
      desc: "",
      dialog2: false,
      inviteId: null,
      text4: "Group Created!",
      snackbar4: false,
      text5: "Group Creation Failed...",
      snackbar5: false,
      text6: "Invition Success!",
      snackbar6: false,
      text7: "Invition Failed...",
      snackbar7: false,
      timeout: 2000,
      groupsContent: [],
    };
  },
  computed: {
    form2() {
      return {
        name: this.name,
        desc: this.desc,
      };
    },
    form3() {
      return {
        inviteId: this.inviteId,
      };
    },
  },
  mounted() {
    this.getGroups();
  },
  methods: {
    getGroups() {
      this.axios
        .get(
          `http://localhost:10000/user/usergroups?userId=${this.$store.state.userId}`
        )
        .then((res) => {
          if (res.data.success) {
            this.groupsContent = res.data.content;
          }
        });
    },
    createGroup() {
      this.dialog1 = true;
    },
    invite(groupId) {
      this.dialog2 = true;
      this.groupId = groupId;
    },
    close1() {
      this.$refs.form2.reset();
      this.name = "";
      this.desc = "";
      this.dialog1 = false;
    },
    close2() {
      this.$refs.form3.reset();
      this.dialog2 = false;
      this.inviteId = null;
    },
    submit1() {
      this.axios
        .post("http://localhost:10000/user/group", null, {
          params: {
            name: this.name,
            description: this.desc,
            userId: this.$store.state.userId,
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.close1();
            this.snackbar4 = true;
            this.getGroups();
          } else {
            this.close1();
            this.snackbar5 = true;
          }
        });
    },
    submit2() {
      this.axios
        .post("http://localhost:10000/user/groupmember", null, {
          params: {
            groupId: this.groupId,
            userId: this.inviteId,
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.close2();
            this.snackbar6 = true;
            this.getGroups();
          } else {
            this.close2();
            this.snackbar7 = true;
          }
        });
    },
  },
};
</script>

<style>
</style>