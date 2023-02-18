//  无权限直接隐藏当前元素
// （1）当判断的权限挂在当前页面时，只需要传 权限字段名称key，使用示例：<div v-permission="{ key: 'roleAdd' }">判断权限1，无权限隐藏</div>
// （2）当判断的权限未挂在当前页面时，需增加传入对应的pathname，使用示例：<div v-permission="{ key: 'roleAdd', pathname: '/roleAndRight' }">判断权限2，无权限隐藏</div>

// （3）显示页面级别的权限提示，使用示例：<div v-permission="{ key: 'roleAdd', hasShowTips: true }">判断权限3，无权限显示提示</div>
import { usePermission } from '@shared/hooks';

const permission = {
  mounted(el: HTMLElement, binding: any) {
    //  获取到 v-permission的值：
    const objData = binding.value;
    if (objData && objData.key) {
      const { hasPermission } = usePermission(objData);
      if (!hasPermission.value) {
        if (objData?.hasShowTips) {
          el.innerHTML = '<div class="global-permission-empty-text">您当前没有此功能权限</div>';
          return;
        }
        // 没有权限移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
};

export default permission;
