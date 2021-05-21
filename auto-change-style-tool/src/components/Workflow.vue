<template>
  <div>
    <v-btn block depressed elevation="5" rounded x-large @click="openWebSocket"
      >Open Websocket</v-btn
    >
    <v-btn block depressed elevation="5" rounded x-large @click="closeWebSocket"
      >Close WebSocket</v-btn
    >
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {
      websocket: null,
      message: "websocket not loaded",
    };
  },
  methods: {
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
          this.sendMessage(
            "match:20210521-2b5c9360-ba41-11eb-9342-d511dea871ef.json@20210521-2b5c9360-ba41-11eb-9342-d511dea871ef.json"
          );
        };
        this.websocket.onmessage = (event) => {
          this.message = event.data;
          if (this.message == "fail") {
            this.closeWebSocket();
          } else if (this.message.startsWith("matchSuccess:")) {
            this.sendMessage(
              "optimize:20210521-2b5c9360-ba41-11eb-9342-d511dea871ef.json"
            );
          } else if (this.message.startsWith("optimizeSuccess:")) {
            this.sendMessage(
              "rebuild:20210521-2b5c9360-ba41-11eb-9342-d511dea871ef.json@20210521-2b5c9360-ba41-11eb-9342-d511dea871ef.json@1"
            );
          } else if (this.message.startsWith("rebuildSuccess:")) {
            this.message = this.message.substring(15);
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
</style>