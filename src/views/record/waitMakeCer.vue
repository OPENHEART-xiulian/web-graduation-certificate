<template>
  <div>
    <myTable
      ref="table"
      :inputParams="inputParams"
      :requestParams="{ status: 1 }"
      :requestUrl="'trainCertificateList'"
      :tableHeader="tableHeader"
      :pageSizeOpts="[10, 20, 30, 40,50,100]"
      btnText="批量盖章并发放电子证"
      exportName="待发证学员记录"
      @clickCallback="cb"
    ></myTable>
    <Modal v-model="cerPopwinModel" fullscreen title="盖章并发放电子证书">
      请点击选择盖章区域：
      <cerPopwin ref="cp" :data="popArray"></cerPopwin>
      <template #footer>
        <Button @click="cerPopwinModel = false">取消</Button>
        <Button @click="patchGZ">一键盖章</Button>
        <Button type="primary" @click="faFang">发放以上电子证书</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import myTable from "../../components/myTable.vue";
import cerPopwin from "@/components/cerPopwin.vue";
import { trainContentJSON } from "@/js/data.js";
import { httpAjax, patchUploadFile } from "@/https/http";
import { dateFormatt } from "@/js/utils.js";
import Photo from "@/components/Photo.vue";

export default {
  name: "",
  data() {
    return {
      popArray: [],
      // 控制容器显示
      cerPopwinModel: false,
      inputParams: [
        {
          type: "input",
          label: "姓名:",
          width: 47,
          key: "name",
          value: "",
          placehold: "请输入姓名",
        },
        {
          type: "input",
          label: "身份证号:",
          key: "IDCard",
          value: "",
          placehold: "请输入身份证号",
        },
        {
          type: "input",
          label: "工作单位:",
          key: "unitName",
          value: "",
          placehold: "请输入工作单位",
        },
        {
          type: "input",
          label: "证书编号:",
          key: "certificateNo",
          value: "",
          placehold: "请输入证书编号",
        },
        {
          type: "select",
          label: "培训项目:",
          key: "trainContent",
          value: "",
          options: [
            { name: "三检合一培训", value: "1" },
            { name: "法律法规培训", value: "2" },
            {
              name: "质量体系培训",
              value: "3",
            },
          ],
        },
      ],
      tableHeader: [
        {
          type: "selection",
          minWidth: 60,
          align: "center",
        },
        {
          title: "姓名",
          minWidth: 100,
          key: "name",
          default: true,
        },
        {
          title: "工作单位",
          minWidth: 200,
          key: "unitName",
          default: true,
        },
        {
          title: "单位联系人",
          minWidth: 200,
          key: "unitContactName",
          render: (h, { row }) => {
            return h("div", row.unitContactName ? row.unitContactName : "--");
          },
        },
        {
          title: "单位邮箱",
          minWidth: 200,
          key: "unitEmail",
          render: (h, { row }) => {
            return h("div", row.unitEmail ? row.unitEmail : "--");
          },
        },
        {
          title: "证件照",
          minWidth: 100,
          default: true,
          key: "certificateImgId",
          render: (h, { row }) => {
            return h("div", [
              h(Photo, {
                id: row.certificateImgId,
              }),
            ]);
          },
        },
        {
          title: "性别",
          minWidth: 70,
          default: true,
          key: "sex",
          render: (h, { row }) => {
            return h("div", row.sex == 1 ? "女" : "男");
          },
        },
        {
          title: "文化程度",
          minWidth: 120,
          default: true,
          key: "educationLevel",
        },
        {
          title: "身份证号",
          minWidth: 180,
          default: true,
          key: "IDCard",
        },
        {
          title: "职务",
          default: true,
          key: "duties",
          minWidth: 120,
          render: (h, { row }) => {
            return h("div", row.duties ? row.duties : "--");
          },
        },
        {
          title: "职称",
          default: true,
          key: "professionalTitle",
          minWidth: 120,
          render: (h, { row }) => {
            return h("div", row.professionalTitle ? row.professionalTitle : "--");
          },
        },
        {
          title: "培训项目",
          minWidth: 220,
          default: true,
          key: "trainContent",
          render: (h, { row }) => {
            row.trainContent.map((ele, index) => {
              if (trainContentJSON[ele]) {
                row.trainContent[index] = trainContentJSON[ele];
              }
            });
            return h("div", row.trainContent.join(","));
          },
        },
        {
          title: "备注",
          minWidth: 200,
          key: "remark",
          render: (h, { row }) => {
            return h("div", row.remark ? row.remark : "--");
          },
        },
        {
          title: "证书编号",
          key: "certificateNo",
          default: true,
          minWidth: 200,
          render: (h, { row }) => {
            return h("div", "RTAGD-" + row.certificateNo);
          },
        },
        {
          title: "制证时间",
          minWidth: 180,
          default: true,
          key: "makeCertificateDate",
          render: (h, { row }) => {
            return h(
              "div",
              dateFormatt(
                "yyyy-MM-dd hh:mm:ss",
                new Date(row.makeCertificateDate)
              )
            );
          },
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          align: "center",
          width: 200,
          render: (h, { row }) => {
            let self = this;
            let btnArr = [];
            btnArr.push(
              h(
                "a",
                {
                  style: {
                    marginRight: "10px",
                  },
                  onClick: () => {
                    self.cb([row]);
                  },
                },
                "盖章并发放电子证"
              )
            );

            return h("div", btnArr);
          },
        },
      ],
    };
  },
  components: {
    myTable,
    cerPopwin,
    Photo,
  },
  methods: {
    patchGZ() {
      this.$refs.cp.gz();
    },
    cb(data) {
      this.popArray = data;
      this.cerPopwinModel = true;
    },
    faFang() {

    },
  },
};
</script>

<style scoped></style>