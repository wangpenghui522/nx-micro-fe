module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-order', 'stylelint-config-recess-order'],
  customSyntax: 'postcss-less',
  // ===== vue项目要增加的配置项============
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  // ======================================
  rules: {
    // 字符串用单引号括起来--为了兼容vue文件中script部分的prettier格式化规则
    'string-quotes': 'single',
    indentation: 2,
    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'extend', 'content', 'include'] }],
    'no-empty-source': null, //  null是关闭规则的意思--less文件内容可以为空
    'no-descending-specificity': null, //禁止特异性较低的选择器在特异性较高的选择器之后重写
    'font-family-no-missing-generic-family-keyword': null, // 关闭必须设置通用字体的规则
    // 动画名称前,可以加浏览器前缀  如@-webkit-keyframes bounce
    'at-rule-no-vendor-prefix': null,
    // id选择器为了兼容#__vconsole, 修改短横线命名
    'selector-id-pattern': '^([#_a-z][_a-z0-9]*)(-[a-z0-9]+)*$',
    // class选择器修改为同时支持短横线和小驼峰
    // 为了兼容css module,.coupon-backCard-modal,.czH5shouye-huodong,.czcommon_36_youjiantou_qianhui这样的类名
    'selector-class-pattern': null,
    // "selector-class-pattern":
    //   "(^([#_a-z][a-zA-Z0-9]*)(-[a-zA-Z0-9]+)*$)|(^[a-z][a-zA-Z0-9]+$)|(^([a-z][a-z0-9]*)(_[a-z0-9]+)*$)",
    // 动画名称命名,为了兼容这种命名btnScaleAni,添加小驼峰命名规则
    'keyframes-name-pattern': '(^([a-z][_a-z0-9]*)(-[a-z0-9]+)*$)|(^([a-z][a-zA-Z0-9]+)*$)',
    // url地址不加引号
    'function-url-quotes': null,
    // 保留各大浏览器不兼容的样式属性名前缀， 如 -moz-user-select: auto;
    'property-no-vendor-prefix': null,
    // 保留各大浏览器不兼容的样式属性值前缀，display: -webkit-box;
    'value-no-vendor-prefix': null,
    // 保留各大浏览器不兼容的选择器前缀,如input::-webkit-input-placeholder
    'selector-no-vendor-prefix': null,
    // 屏蔽background-color: rgba(0, 0, 0, 0.5);这种写法引起的警告
    'color-function-notation': 'legacy',
    // 屏蔽background-color: rgba(0, 0, 0, 0.5);中0.5引起的警告
    'alpha-value-notation': 'number',
    // css属性值中小数点之后数字的最大位数
    'number-max-precision': 10,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['box-flex'], // 忽略某些未知属性的检测
      },
    ],
    'selector-pseudo-class-no-unknown': null,
    // 'selector-pseudo-class-no-unknown': [
    //   true,
    //   {
    //     ignorePseudoClass: ['deep'], // 忽略ng-deep这种合法的伪元素选择器报警
    //   },
    // ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', ':deep', 'input-placeholder'], // 忽略ng-deep这种合法的伪元素选择器报警
      },
    ],
    'declaration-colon-newline-after': null, //一个属性过长的话可以写成多行
    'declaration-block-trailing-semicolon': null, // 关闭声明块后面需要加分号的规则，避免和prettier冲突
    'media-feature-name-no-unknown': null, // 关闭禁止未知的媒体功能名
    // 下面的排序规则是stylelint-config-recess-order的css排序规则,
    // 要对某个属性排序进行调整,这个属性之前的样式排序都要配置在自定义属性排序中
    'order/properties-order': [
      {
        // Must be first.
        properties: ['all'],
      },
      {
        // Position.
        properties: ['position', 'top', 'right', 'bottom', 'left', 'z-index'],
      },
      {
        // Display mode.
        properties: ['box-sizing', 'display'],
      },
      {
        // Flexible boxes.
        properties: ['flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap'],
      },
      {
        // Grid layout.
        properties: [
          'grid',
          'grid-area',
          'grid-template',
          'grid-template-areas',
          'grid-template-rows',
          'grid-template-columns',
          'grid-row',
          'grid-row-start',
          'grid-row-end',
          'grid-column',
          'grid-column-start',
          'grid-column-end',
          'grid-auto-rows',
          'grid-auto-columns',
          'grid-auto-flow',
          'grid-gap',
          'grid-row-gap',
          'grid-column-gap',
        ],
      },
      {
        // Align.
        properties: ['align-content', 'align-items', 'align-self'],
      },
      {
        // Justify.
        properties: ['justify-content', 'justify-items', 'justify-self'],
      },
      {
        // Order.
        properties: ['order'],
      },
      {
        // Box model.
        properties: [
          'float',
          'width',
          'min-width',
          'max-width',
          'height',
          'line-height',
          'min-height',
          'max-height',
          'padding',
          'padding-top',
          'padding-right',
          'padding-bottom',
          'padding-left',
          'margin',
          'margin-top',
          'margin-right',
          'margin-bottom',
          'margin-left',
          'overflow',
          'overflow-x',
          'overflow-y',
          '-webkit-overflow-scrolling',
          '-ms-overflow-x',
          '-ms-overflow-y',
          '-ms-overflow-style',
          'clip',
          'clear',
        ],
      },
      {
        // Typography.
        properties: [
          'font',
          'font-family',
          'font-size',
          'font-style',
          'font-weight',
          'font-variant',
          'font-size-adjust',
          'font-stretch',
          'font-effect',
          'font-emphasize',
          'font-emphasize-position',
          'font-emphasize-style',
          '-webkit-font-smoothing',
          '-moz-osx-font-smoothing',
          'font-smooth',
          'hyphens',
          'color',
          'text-align',
          'text-align-last',
          'text-emphasis',
          'text-emphasis-color',
          'text-emphasis-style',
          'text-emphasis-position',
          'text-decoration',
          'text-indent',
          'text-justify',
          'text-outline',
          '-ms-text-overflow',
          'text-overflow',
          'text-overflow-ellipsis',
          'text-overflow-mode',
          'text-shadow',
          'text-transform',
          'text-wrap',
          '-webkit-text-size-adjust',
          '-ms-text-size-adjust',
          'letter-spacing',
          'word-break',
          'word-spacing',
          'word-wrap', // Legacy name for `overflow-wrap`
          'overflow-wrap',
          'tab-size',
          'white-space',
          'vertical-align',
          'list-style',
          'list-style-position',
          'list-style-type',
          'list-style-image',
        ],
      },
      {
        // Accessibility & Interactions.
        properties: [
          'pointer-events',
          '-ms-touch-action',
          'touch-action',
          'cursor',
          'visibility',
          'zoom',
          'table-layout',
          'empty-cells',
          'caption-side',
          'border-spacing',
          'border-collapse',
          'content',
          'quotes',
          'counter-reset',
          'counter-increment',
          'resize',
          'user-select',
          'nav-index',
          'nav-up',
          'nav-right',
          'nav-down',
          'nav-left',
        ],
      },
      {
        // Background & Borders.
        properties: [
          'background',
          'background-color',
          'background-image',
          "-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
          'filter:progid:DXImageTransform.Microsoft.gradient',
          'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader',
          'filter',
          'background-repeat',
          'background-attachment',
          'background-position',
          'background-position-x',
          'background-position-y',
          'background-clip',
          'background-origin',
          'background-size',
          'background-blend-mode',
          'isolation',
          'border',
          'border-color',
          'border-style',
          'border-width',
          'border-top',
          'border-top-color',
          'border-top-style',
          'border-top-width',
          'border-right',
          'border-right-color',
          'border-right-style',
          'border-right-width',
          'border-bottom',
          'border-bottom-color',
          'border-bottom-style',
          'border-bottom-width',
          'border-left',
          'border-left-color',
          'border-left-style',
          'border-left-width',
          'border-radius',
          'border-top-left-radius',
          'border-top-right-radius',
          'border-bottom-right-radius',
          'border-bottom-left-radius',
          'border-image',
          'border-image-source',
          'border-image-slice',
          'border-image-width',
          'border-image-outset',
          'border-image-repeat',
          'outline',
          'outline-width',
          'outline-style',
          'outline-color',
          'outline-offset',
          'box-shadow',
          'mix-blend-mode',
          'filter:progid:DXImageTransform.Microsoft.Alpha(Opacity',
          "-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha",
          'opacity',
          '-ms-interpolation-mode',
        ],
      },
      {
        // SVG Presentation Attributes.
        properties: [
          'alignment-baseline',
          'baseline-shift',
          'dominant-baseline',
          'text-anchor',
          'word-spacing',
          'writing-mode',

          'fill',
          'fill-opacity',
          'fill-rule',
          'stroke',
          'stroke-dasharray',
          'stroke-dashoffset',
          'stroke-linecap',
          'stroke-linejoin',
          'stroke-miterlimit',
          'stroke-opacity',
          'stroke-width',

          'color-interpolation',
          'color-interpolation-filters',
          'color-profile',
          'color-rendering',
          'flood-color',
          'flood-opacity',
          'image-rendering',
          'lighting-color',
          'marker-start',
          'marker-mid',
          'marker-end',
          'mask',
          'shape-rendering',
          'stop-color',
          'stop-opacity',
        ],
      },
      {
        // Transitions & Animation.
        properties: [
          'transition',
          'transition-delay',
          'transition-timing-function',
          'transition-duration',
          'transition-property',
          'transform',
          'transform-origin',
          'animation',
          'animation-name',
          'animation-duration',
          'animation-play-state',
          'animation-timing-function',
          'animation-delay',
          'animation-iteration-count',
          'animation-direction',
        ],
      },
    ],
  },
};
