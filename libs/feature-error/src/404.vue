<template>
  <Result status="404" title="404" sub-title="没有找到该页面">
    <template #extra>
      <RouterLink
        :to="{ path: '/', replace: true }"
        class="ant-btn ant-btn-primary"
        >回到首页</RouterLink
      >
    </template>
  </Result>
</template>

<script setup lang="ts">
import { Result } from 'ant-design-vue';
</script>

<style lang="less" scoped></style>
