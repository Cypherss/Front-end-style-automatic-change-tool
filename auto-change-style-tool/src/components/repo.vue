<template>
  <v-main style="padding: 0">
    <v-toolbar
      color="white"
      style="font-size: 30px; box-shadow: 0 0 0 !important"
    >
      <v-toolbar-title> Personal Sources </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" fab dark color="#1976d2" @click="uploadSource">
        <v-icon dark> mdi-plus </v-icon>
      </v-btn></v-toolbar
    >
    <v-divider></v-divider>
    <v-row style="padding: 20px">
      <v-col
        v-for="personalSource in personalSources"
        :key="personalSource.id"
        :cols="4"
      >
        <div style="padding: 0px">
          <v-card elevation="2">
            <v-card-title>{{ personalSource.name }}</v-card-title>
            <v-card-text>{{ personalSource.uploadTime }}</v-card-text>
            <v-card-actions
              ><v-btn
                color="orange lighten-2"
                text
                @click="share(personalSource.id)"
              >
                Share
              </v-btn></v-card-actions
            >
          </v-card>
        </div>
      </v-col>
    </v-row>
    <br />
    <br />
    <v-toolbar
      color="white"
      style="font-size: 30px; box-shadow: 0 0 0 !important"
    >
      <v-toolbar-title> Groups' Sources </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-row style="padding: 20px">
      <v-col
        v-for="groupSource in groupSources"
        :key="groupSource.id"
        :cols="4"
      >
        <div style="padding: 0px">
          <v-card elevation="2">
            <v-card-title>{{ groupSource.name }}</v-card-title>
            <v-card-text>{{ groupSource.uploadTime }}</v-card-text>
            <v-card-actions
              ><v-btn
                color="orange lighten-2"
                text
                @click="share(groupSource.id)"
              >
                Share
              </v-btn></v-card-actions
            >
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="700px">
        <v-form ref="form1">
          <v-card>
            <v-card-title>
              <span class="headline">Upload Your Source</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      label="Legal Source Name*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="url"
                      :rules="urlRules"
                      label="Legal Source Url*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="pac"
                      :rules="pacRules"
                      :items="[3, 4, 5, 6, 7, 8]"
                      label="Pac*"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>* indicates required field<br /></small>
              <small
                >pac indicates the granularity of the page segmentation, in the
                range of 3-8</small
              >
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
              <v-btn
                style="width: 100px"
                color="blue darken-1"
                text
                @click="upload"
                :loading="loading"
                :disabled="loading"
              >
                Submit
                <template v-slot:loader>
                  <span>Uploading...</span>
                </template></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog1" persistent max-width="400px">
        <v-form ref="form2">
          <v-card>
            <v-card-title>
              <span class="headline">Choose the group to share</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="group"
                      :items="groupNames"
                      label="Group*"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close1"> Close </v-btn>
              <v-btn
                style="width: 100px"
                color="blue darken-1"
                text
                @click="shareSource"
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
      name: "",
      url: "",
      pac: null,
      timeout: 2000,
      text4: "Source Uploaded!",
      text5: "Source upload failed...",
      snackbar5: false,
      snackbar4: false,
      nameRules: [(v) => !!v || "Name is required"],
      urlRules: [(v) => !!v || "Url is required"],
      pacRules: [(v) => !!v || "Pac is required"],
      dialog: false,
      loader: null,
      loading: false,
      personalSources: [],
      groupSources: [],
      sourceId: null,
      dialog1: false,
      text6: "Share Success!",
      snackbar6: false,
      text7: "Share Failed...",
      snackbar7: false,
      groupsContent: [],
      group: "",
      groupNames: [],
      groupId: null,
    };
  },
  mounted() {
    this.getPersonalSources();
    this.getGroupSources();
    this.getTeams();
  },
  computed: {
    form1() {
      return {
        name: this.name,
        url: this.url,
        pac: this.pac,
      };
    },
    form2() {
      return {
        group: this.group,
      };
    },
  },
  methods: {
    shareSource() {
      for(let g of this.groupsContent){
        if (g.name == this.group){
          this.groupId = g.id;
        }
      }
      this.axios
        .post("http://localhost:10000/user/sourceshare", null, {
          params: {
            groupId: this.groupId,
            sourceId: this.sourceId,
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.close1();
            this.snackbar6 = true;
            this.getGroupSources();
          } else {
            this.close1();
            this.snackbar7 = true;
          }
        });
    },
    getTeams() {
      this.axios
        .get(
          `http://localhost:10000/user/usergroups?userId=${this.$store.state.userId}`
        )
        .then((res) => {
          if (res.data.success) {
            this.groupsContent = res.data.content;
            this.groupNames = [];
            for (let group of this.groupsContent) {
              this.groupNames.push(group.name);
            }
          }
        });
    },
    share(sourceId) {
      this.sourceId = sourceId;
      this.dialog1 = true;
    },
    getGroupSources() {
      this.axios
        .get(
          `http://localhost:10000/user/user/group/source?userId=${this.$store.state.userId}`
        )
        .then((res) => {
          if (res.data.success) {
            this.groupSources = res.data.content;
          }
        });
    },
    getPersonalSources() {
      this.axios
        .get(
          `http://localhost:10000/user/person/source?userId=${this.$store.state.userId}`
        )
        .then((res) => {
          if (res.data.success) {
            this.personalSources = res.data.content;
          }
        });
    },
    uploadSource() {
      this.dialog = true;
    },
    close() {
      this.name = "";
      this.url = "";
      this.pac = null;
      this.$refs.form1.reset();
      this.dialog = false;
    },
    close1() {
      this.group = "";
      this.$refs.form2.reset();
      this.dialog1 = false;
    },
    upload() {
      let res = this.$refs.form1.validate();
      if (res) {
        this.loader = "loading";
        const l = this.loader;
        this[l] = !this[l];
        this.axios
          .post("http://127.0.0.1:7001/segmentation", {
            name: this.name,
            userId: this.$store.state.userId,
            baseUrl: this.url,
            pac: this.pac,
            st: 'source',
          })
          .then((res) => {
            if (res.data.success) {
              console.log(res.data.message);
            } else {
              console.log(res.data.message);
            }
            this.loading = false;
            this.loader = null;
            this.close();
            this.snackbar4 = true;
            this.getPersonalSources();
          })
          .catch((res) => {
            console.log(res.data);
            this.loading = false;
            this.loader = null;
            this.close();
            this.snackbar5 = true;
          });
      }
    },
  },
};
</script>

<style>
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>