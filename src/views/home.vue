<style lang="scss" scope>
    .ivu-layout {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
    }

    .layout-logo {
        height: 100%;
        display: flex;
        float: left;
        position: relative;
        left: 32px;
        z-index: 999;
        color: white;

    > div {
        display: flex;
        justify-content: center;
        margin-right: 50px;
    }

    }
    .layout-nav {
        width: 120px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .layout-footer-center {
        text-align: center;
    }

    .dev-run-preview .dev-run-preview-edit {
        display: none
    }

    .info-box {
        width: 100%;

    .infos {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        width: 1000px;

    > .ivu-form-item {
        margin-right: 200px;
    }

    }

    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%',height:'68px'}">
                <Menu mode="horizontal" theme="dark" active-name="1">

                    <div class="layout-nav">
                        <Dropdown>
                            <a href="javascript:void(0)" style="color: white">
                                <Icon type="md-person"/>
                                {{userInfoName}}
                            </a>
                            <template #list>
                                <DropdownMenu>
                                    <DropdownItem @click="logout">退出登录</DropdownItem>

                                </DropdownMenu>
                            </template>
                        </Dropdown>
                    </div>
                </Menu>
            </Header>
            <Content
                    :style="{margin: '88px 20px 0', background: '#fff',height:'100%','flex-grow': 1,'overflow-y':'scroll'}">
                <router-view/>
            </Content>
            <!--<Footer class="layout-footer-center">2011-2016 &copy; View Design</Footer>-->
        </Layout>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userInfoName: localStorage.getItem("userInfo"),
                buttonSize: 'large',
            }
        },
        methods: {
            logout() {
                let self=this;
                this.$Modal.confirm({
                    title: '退出登录',
                    content: '<p>确认退出登录吗？</p>',
                    onOk: () => {
                        localStorage.clear();
                        self.$router.push("/login")
                    },
                    onCancel: () => {

                    }
                });

            }
        }
    }
</script>