# pms 项目工程规范

## 组件化规范

ps:参考自:https://juejin.cn/post/7133127716638818340

## 组件化的好处

1. 组件化是对实现的分层，是更有效的代码组合方式。
2. 组件化是对资源的重组和优化，从而使项目资源管理更合理。'
3. 组件化利于重构。

## 组件目录模板示例

- src
  - components/ （全局组件）
    - UploadImage/
      - utils/ (组件内部函数)
        - oss.ts
      - index.vue
    - CommonForm/
      - components/ (CommonForm 组件内部子组件)
        - BaseHeader.vue
        - BaseFooter.vue
      - index.vue (CommonForm 组件入口)
  - views/ (页面文件夹)
    - order/
      - orderList/
        - components/ (订单列表页面子组件)
          - TableFilter.vue
          - TableList.vue
        - index.vue
      - orderLog/
        - index.vue (订单日志页面入口)
    - login/
      - index.vue

## 组件化规范说明:

1. 具体组件文件和目录统一以`多单词全拼`的`PascalCase`方式命名,如:`BaseHeader.vue`,`BaseFooter.vue`; `index.vue`入口文件除外
2. 组件引用统一以`PascalCase`自闭合标签引用,包含`slot`插槽除外
3. 理论上组件或页面的`index.vue`入口文件不允许出现同级`vue`文件
4. src 下的顶层`components`文件夹下只允许存放全局公共组件,页面相关强耦合业务组件需放在对应页面下级 components 目录下
5. `views`页面组件命名统一以`lowerCase`方式命名,页面组件下的子组件`components/`命名遵守`PascalCase`

## 组件模块化拆分思路

1. `index.vue`作为入口文件,以`简洁`为主,尽量不承载或少承载业务逻辑代码,主要承担组合各子组件的作用
2. 子组件拆分尽量遵循`高内聚,低耦合`的原则. 高内聚:一个好的子组件应当恰好做一件事;低耦合:尽量减少与外部数据连接的点;
3. 子组件拆分按页面复杂度分成几个大的基本模块,如: `头部,弹窗,列表,底部`等
4. 代码不要重复: 标准就是你修改每一个功能时，只会修改一处，如果多余 1 处，那么这就是重复了
5. 避免太多参数: 不要出现一个子组件功能不多,但是 props 过多
6. 持续改进: 很少有人能把初稿写的完善，写代码也是如此，我们刚开始写的时候尽可以先为完成功能，然后逐步打磨，拆分函数，改善名称，消除重复。
