<template>
  <v-main style="padding: 0">
    <v-subheader style="font-size: 24px">Personal Sources</v-subheader>
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
          </v-card>
        </div>
      </v-col>
    </v-row>
    <br>
    <br>
    <v-subheader style="font-size: 24px">Teams' Sources</v-subheader>
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
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      personalSources: [
        { id: '123123123', name: "react", uploadTime: "2021.05.21 23:23:23 GMT" },
        { id: '1231231245', name: "react", uploadTime: "2021.05.21 23:23:23 GMT" },
        { id: '123123134', name: "react", uploadTime: "2021.05.21 23:23:23 GMT" },
        { id: '1231231dfg', name: "react", uploadTime: "2021.05.21 23:23:23 GMT" },
        { id: '1231231546', name: "react", uploadTime: "2021.05.21 23:23:23 GMT" },
      ],
    };
  },
};
</script>

<style>
</style>