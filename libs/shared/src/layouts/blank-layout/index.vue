<template>
  <!-- 此 layout 为静态空白页面布局 -->
  <!-- TODO 实现静态空白页面布局 -->
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped></style>
