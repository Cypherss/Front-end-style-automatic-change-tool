<template>
  <div>
    <v-stepper v-model="e1" style="box-shadow: 0 0 0 !important">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Auto Style Change Process
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"> Result </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-stepper v-model="e6" vertical style="box-shadow: 0 0 0 !important">
            <v-stepper-step :complete="e6 > 1" step="1">
              Choose your source and target
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-form ref="form">
                <v-card>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            v-model="sourceId"
                            :rules="sourceRules"
                            :items="sourceNames"
                            label="Source*"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            label="Legal Target Name*"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="url"
                            :rules="urlRules"
                            label="Legal Target Url*"
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
                      >pac indicates the granularity of the page segmentation,
                      in the range of 3-8</small
                    >
                  </v-card-text>
                  <v-card-actions>
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
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">
              Matching source and target
            </v-stepper-step>

            <v-stepper-step :complete="e6 > 3" step="3">
              Replacing styles
            </v-stepper-step>

            <v-stepper-step :complete="e6 > 4" step="4">
              Rebuilding target
            </v-stepper-step>
          </v-stepper>
        </v-stepper-content>

        <v-stepper-content step="2">
          <iframe :src="iframeUrl"></iframe>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {
      e1: 1,
      e6: 1,
      websocket: null,
      message: "websocket not loaded",
      name: "",
      url: "",
      pac: null,
      sourceId: "",
      sourceRules: [(v) => !!v || "Source is required"],
      nameRules: [(v) => !!v || "Name is required"],
      urlRules: [(v) => !!v || "Url is required"],
      pacRules: [(v) => !!v || "Pac is required"],
      personalSources: [],
      sourceNames: [],
      loader: null,
      loading: false,
      targetId: null,
      iframeUrl: "",
    };
  },
  mounted() {
    this.getPersonalSources();
  },
  computed: {
    form() {
      return {
        sourceId: this.sourceId,
        name: this.name,
        url: this.url,
        pac: this.pac,
      };
    },
  },
  methods: {
    upload() {
      let res = this.$refs.form.validate();
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
            st: "target",
          })
          .then((res) => {
            if (res.data.success) {
              console.log(res.data.message);
            } else {
              console.log(res.data.message);
            }
            this.loading = false;
            this.loader = null;
            this.e6 = 2;
            this.targetId = res.data.id;
            for (let source of this.personalSources) {
              if (source.name == this.sourceId) {
                this.sourceId = source.id;
              }
            }
            this.openWebSocket();
          })
          .catch((res) => {
            console.log(res.data);
            this.loading = false;
            this.loader = null;
          });
      }
    },
    getPersonalSources() {
      this.axios
        .get(
          `http://localhost:10000/user/person/source?userId=${this.$store.state.userId}`
        )
        .then((res) => {
          if (res.data.success) {
            this.personalSources = res.data.content;
            this.sourceNames = [];
            for (let source of this.personalSources) {
              this.sourceNames.push(source.name);
            }
          }
        });
    },
    showResult() {
      this.e1 = 2;
      let res = JSON.parse(this.message);
      this.iframeUrl = res.html;
    },
    closeWebSocket() {
      this.websocket.close();
    },
    sendMessage(m) {
      this.websocket.send(m);
    },
    openWebSocket() {
      if ("WebSocket" in window) {
        this.websocket = new WebSocket("ws://localhost:10000/replace/schedule");
        this.websocket.onerror = () => {
          this.message = "error";
        };
        this.websocket.onopen = (event) => {
          console.log("websocket open");
          this.sendMessage(`match:${this.sourceId}@${this.targetId}`);
        };
        this.websocket.onmessage = (event) => {
          this.message = event.data;
          if (this.message == "fail") {
            this.closeWebSocket();
          } else if (this.message.startsWith("matchSuccess")) {
            console.log('match success');
            this.e6 = 3;
            this.sendMessage("replace");
          } else if (this.message.startsWith("replaceSuccess")) {
            console.log(this.message);
            console.log('replace success');
            this.e6 = 4;
            this.sendMessage(
              `rebuild:${this.sourceId}@${this.message.substring(15)}@${
                this.$store.state.userId
              }`
            );
          } else if (this.message.startsWith("rebuildSuccess:")) {
            this.e6 = 5;
            this.message = this.message.substring(15);
            this.showResult();
            this.closeWebSocket();
          }
        };
        this.websocket.onclose = () => {
          console.log("websocket close");
        };
        this.websocket.onbeforeunload = () => {
          this.websocket.close();
        };
      } else {
        console.log("Not support websocket!");
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