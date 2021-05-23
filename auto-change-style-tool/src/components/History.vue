<template>
  <v-main style="padding: 0">
    <v-toolbar
      color="white"
      style="font-size: 30px; box-shadow: 0 0 0 !important"
    >
      <v-toolbar-title> Execution History </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-expansion-panels style="z-index: 0 !important">
      <v-expansion-panel v-for="history in histories" :key="history.time" @click="changeId(history.targetId)">
        <v-expansion-panel-header>
          {{ history.targetName }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Source: {{ history.sourceName }}<br />
          Execution Time: {{ history.time }}<br />
          <v-btn @click="openPage()">Open Result Page</v-btn><br />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      ><v-toolbar
          dark
          color="primary"
        ><v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn></v-toolbar><iframe id="iframe" style="width: 100%; height: 100%"></iframe
    ></v-dialog>
  </v-main>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {
      histories: [],
      dialog: false,
      targetId: null,
      url: null,
    };
  },
  mounted() {
    this.getHistory();
  },
  methods: {
    changeId(id) {
      this.targetId = id;
    },
    getHistory() {
      this.axios
        .get(
          `http://localhost:10000/user/history?userId=${this.$store.state.userId}`
        )
        .then((res) => {
          if (res.data.success) {
            this.histories = res.data.content;
          }
        });
    },
    openPage() {
      this.dialog = true;
      this.getFile(this.targetId);
      // console.log(this.url);
      // document.getElementById("iframe").src = this.url;
    },
    getFile(targetId) {
      this.axios
        .get(`http://localhost:10000/core/url?fileId=${targetId}`)
        .then((res) => {
          console.log(res);
            document.getElementById("iframe").src = res.data.content;
        });
    },
  },
};
</script>

<style>
</style>