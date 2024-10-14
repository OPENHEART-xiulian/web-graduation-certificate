<template>
    <div style="width: 100%;height: 100%;">
        <!--<certificate :ref="setItemRef" ></certificate>-->
        <Carousel style="width: 1450px;margin: 0 auto" v-model="currentIndex">
            <CarouselItem v-for="(ele,index) in data">
                <certificate :ref="setItemRef" :index="index" :itemData="ele" v-if="ele"></certificate>
            </CarouselItem>
        </Carousel>
    </div>
</template>

<script setup>
    import {ref, reactive, watch} from "vue"
    import certificate from './certificate.vue';
    import { app } from "@/main.js";
    const props = defineProps({
        data: Array
    });
    // 设置多个ref
    const refList = ref([]);
    let finlishIndex=ref(0);
    const setItemRef = (el) => {
        if (!refList.value.includes(el)) {
            refList.value.push(el);
        }
    };
    watch(() => props.data, (newCount, oldCount) => {
        //监听数据变化  新打开窗口把章隐藏起来
        currentIndex.value = 0;
    })
    const currentIndex = ref(0);
    const gz = () => {
        for (let v of refList.value) {
            if (v) {
                v.gz();
            }
        }

    }
    const submit = async (cb) => {
        app.$Spin.show({
            render: (h) => {
                return h('div', [
                    h('Icon', {
                        'class': 'demo-spin-icon-load',
                        props: {
                            type: 'ios-loading',
                            size: 18
                        }
                    }),
                    h('div',{
                            style: {
                                fontSize: "28px",
                            }
                        },finlishIndex.value==props.data.length?"发放中，可能需要几分钟，请耐心等待....":"正在生成证书:"+ finlishIndex.value+'/'+props.data.length,

                    )
                ])
            }
        });
        try {
            let filesArr = [];
            for (let v of refList.value) {
                let i = await v.isShow();
                finlishIndex.value++;
                filesArr.push(i)
            }
            cb(filesArr);
        } catch (e) {
            console.log(e)
        }

    }
    // 第二部：暴露方法
    defineExpose({
        submit,
        gz
    })

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
