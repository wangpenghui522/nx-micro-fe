<template>
  <ConfigProvider :locale="locale">
    <RouterView v-slot="{ Component }" >
      <component :is="Component" />
    </RouterView>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  // import { useSiteConfig } from '@shared/hooks';

  dayjs.locale('zh-cn');

  const locale = ref(zhCN);

  // const { isReady } = useSiteConfig();

  // 全局请求  抽取一个hook  useSiteConfig
</script>
