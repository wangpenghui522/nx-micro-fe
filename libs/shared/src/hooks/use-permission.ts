// 根据菜单权限接口（manage/platform/privilege/staff/get-privilege）返回的各二级菜单页权限集合字段privileges，查找当前的权限字段key是否为true
import { ref } from 'vue';
import { useBrowserLocation } from '@vueuse/core';

// （1）当判断的权限挂在当前页面时，只需要传 权限字段名称key，使用示例：usePermission({ key: 'roleAdd' })
// （2）当判断的权限未挂在当前页面时，需增加传入指定的pathname，使用示例：usePermission({ key: 'roleAdd', pathname: '/roleAndRight' })
export const usePermission = ({ key = '', pathname = '' }) => {
  const hasPermission = ref<boolean>(false); // 默认无权限
  // 未传pathname时自动获取当前页面地址，使用当前页面去匹配对应的权限
  let locationPathname = useBrowserLocation().value.pathname || '';
  const urlPrefix = import.meta.env.VITE_SITE_PATH_PREFIX;
  locationPathname = locationPathname.replace(urlPrefix, ''); // 去掉url前缀 --- /caizhi-manage

  const curPathname = pathname || locationPathname;
  const nameArr = curPathname.split('/');
  const name = nameArr.length > 1 ? nameArr[1] : '';
  if (key && name) {
    hasPermission.value = true;
  } else {
    console.warn(
      '请检查权限校验：(1) 是否有传权限字段key,值不能为空; (2)pathname 是否正确 (必须以 / 开头)'
    );
  }
  return {
    hasPermission,
  };
};
