<script setup>
import {
  NMessageProvider,
  NDialogProvider,
  NConfigProvider,
  zhCN,
  dateZhCN,
} from "naive-ui";

import MessageProvider from "@/components/MessageProvider.vue";
</script>

<template>
  <n-message-provider>
    <message-provider></message-provider>
  </n-message-provider>
  <n-dialog-provider>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <router-view></router-view>
    </n-config-provider>
  </n-dialog-provider>
</template>

<style scoped></style>
