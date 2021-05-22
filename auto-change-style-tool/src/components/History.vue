<template>
  <v-main style="padding: 0">
    <v-toolbar color="white" style="font-size: 30px; box-shadow: 0 0 0!important">
      <v-toolbar-title> Execution History </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-expansion-panels style="z-index: 0!important">
      <v-expansion-panel v-for="history in histories" :key="history.time">
        <v-expansion-panel-header> {{history.targetName}} </v-expansion-panel-header>
        <v-expansion-panel-content>
          Source: {{history.sourceName}}<br>
          Execution Time: {{history.time}}
          Result Page:<br>
          <iframe :src="getFile(history.targetId)"></iframe>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
        histories: [],
    };
  },
  mounted() {
    this.getHistory();
  },
  methods: {
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
    getFile(targetId) {
        this.axios
        .get(
          `http://localhost:10000/core/getFile?fileId=${targetId}`
        )
        .then((res) => {
          if (res.data.success) {
            return res.data.content;
          }
        });
    }
  },
};
</script>

<style>
</style>