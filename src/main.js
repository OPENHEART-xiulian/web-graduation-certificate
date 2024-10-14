import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import "amfe-flexible/index.js"
import store from './store'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import './iview.less';

export const  app=createApp(App).use(store).use(router).use(ViewUIPlus).use(Viewer,{
    defaultOptions: {
        inline: false, //默认值：false。启用内联模式。
        button: true, //在查看器的右上角显示按钮。
        navbar: false, //指定导航栏的可见性。
        title: false, //指定标题的可见性和内容。
        toolbar: false, //指定工具栏及其按钮的可见性和布局。
        tooltip: false, //放大或缩小时显示带有图像比率（百分比）的工具提示。
        movable: true, //启用以移动图像。
        zoomable: true, //启用以缩放图像
        rotatable: true, //启用以旋转图像
        scalable: true, //启用以缩放图像。
        transition: true, //为某些特殊元素启用CSS3转换。
        fullscreen: true, //启用以在播放时请求全屏。
        keyboard: true, //启用键盘支持。
        // url: 'src',  //默认值：'src'。定义获取原始图像URL以供查看的位置。
    },
}).mount('#app')
