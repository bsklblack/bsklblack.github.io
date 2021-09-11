**项目：京东商城首页实现**

**技术：HTML、JQuery**

**步骤：**

###### 1、封装轮播图公共组件swiper

| 属性名         | 说明                                                          | 数据类型      | 默认值  |
| -------------- | ------------------------------------------------------------- | ------------- | ------- |
| contentList    | 切换内容                                                      | $obj          | []      |
| autoChangeTime | 自动切换时间                                                  | Number        | 3000    |
| type           | 轮播动画类型(animate-滑动、fade-淡出)                         | Stringanimate | animate |
| isAuto         | 是否自动轮播                                                  | Boolean       | true    |
| showChangeBtn  | 左右按钮显示状态：always一直显示，hide隐藏，hover鼠标移入显示 | String        | always  |
| showSpots      | 是否显示小圆点                                                | Boolean       | true    |
| spotSize       | 小圆点大小                                                    | Number        | 10      |
| spotPosition   | 小圆点位置 center居中，left左侧，right右侧                    | String        | center  |
| spotColor      | 小圆点颜色                                                    | Color         | #fff    |
| width          | 轮播内容宽度                                                  | Number        | 容器宽  |
| height         | 轮播内容高度                                                  | Number        | 容器高  |

使用`$.fn.extend()`方法注册到JQuery对象

**轮播图组件实现**

1. 创建Swiper类，初始化参数
2. Swiper.prototype.init()，初始化方法
3. Swiper.prototype.createElement()，创建结构
4. Swiper.prototype.initStyle()，初始化样式
5. Swiper.prototype.render()，渲染方法
6. Swiper.prototype.autoPlay()，自动轮播
7. Swiper.prototype.bindEvent()，功能实现



