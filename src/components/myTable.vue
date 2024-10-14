<template>
  <div class="table-page">
    <inputParam
      :searchInput="inputParams"
      @exportListCallBack="exportList"
      @searchCallBack="searchCB"
    />
    <div class="middle">
      <Button
        :disabled="selectionData.length == 0"
        icon="md-done-all"
        type="primary"
        @click="cb"
        >{{ btnText }}
      </Button>
      <Select
        v-model="model"
        :max-tag-count="1"
        multiple
        prefix="ios-apps"
        style="width: 200px"
      >
        <Option v-for="item in cityList" :key="item.value" :value="item.value">
          {{ item.label }}
        </Option>
      </Select>
    </div>
    <Alert v-if="selectionData.length != 0">
      <Icon
        color="#0E77D1"
        size="18"
        style="margin-right: 5px"
        type="ios-information-circle"
      />
      已选择 {{ selectionData.length }} 人次
    </Alert>
    <div >
      <Table :fixed-header="true"
              :columns="columnsArr"
              :data="tableData.list"
              :loading="loading"
              border
             :height="tableData.list&&tableData.list.length<5?'':550"
              @on-select-cancel="mulitSelect"
              @on-select-all-cancel="mulitSelect"
              @on-select-all="mulitSelect"
              @on-select="mulitSelect"
      >
      </Table>
    </div>

    <Page
      :total="tableData.total"
      class="page"
      show-elevator
      show-sizer
      show-total
      :page-size-opts="pageSizeOpts?pageSizeOpts:[10, 20, 30, 40,50,100,500]"
      @on-change="pageChange"
      @on-page-size-change="psChange"
    />
  </div>
</template>
<script>
import { downLoad, httpAjax } from "@/https/http";
import inputParam from "./inputParam.vue";
import { dateFormatt } from "@/js/utils.js";
import { nextTick } from "vue";

export default {
  components: { inputParam },
  props: {
    tableHeader: Array,
    requestUrl: String,
    requestParams: Object,
    inputParams: Array,
    btnText: String,
    exportName: String,
    pageSizeOpts:Array
  },
  data() {
    return {
      loading: false,
      fromData: {
        page: 1,
        pageSize: 10,
      },
      tableData: {
        totalPages: 0, //总页数
        content: [], //表格数据
      },
      selectionData: [],
      model: [],
      columnsArr: [],
    };
  },
  methods: {
    getHeaderParams(){
      let arr={};
      this.model.forEach((ele)=>{
        this.tableHeader.forEach((v, i) => {
          if(ele==v.key){
            arr[v.key]=v.title
          }
        });
      })
      return arr;
    },
    exportList() {
      let obj = Object.assign(this.fromData, this.requestParams);
      let str = "";
      Object.keys(obj).forEach(function (key) {
        str += "&" + key + "=" + obj[key];
      });
      downLoad(
        "/trainCertificate/exportList?header="+JSON.stringify(this.getHeaderParams())  + str,
        this.exportName + dateFormatt("yyyy-MM-dd", new Date())
      );
    },
    cb() {
      this.$emit("clickCallback", this.selectionData);
    },
    mulitSelect(selection) {
      this.selectionData = selection;
    },
    pageChange(index) {
      this.fromData.page = index;
      this.init();
    },
    searchCB() {
      this.inputParams.map((ele) => {
        this.fromData[ele.key] = ele.value;
        if (ele.type == "datePicker") {
          this.fromData[ele.startKey] = ele.startValue
            ? dateFormatt("yyyy-MM-dd", new Date(ele.startValue))
            : "";
          this.fromData[ele.endKey] = ele.endValue
            ? dateFormatt("yyyy-MM-dd", new Date(ele.endValue))
            : "";
        }
      });
      this.init();
    },
    psChange(size) {
      this.fromData.pageSize = size;
      this.init();
    },
    init() {
      let self = this;
      // self.loading = true;
      // httpAjax(
      //   this.requestUrl,
      //   "get",
      //   Object.assign(this.fromData, this.requestParams),
      //   function (data) {
      //     self.tableData = data;
      //     self.loading = false;
      //   }
      // );
      this.tableData={
        "total": 1,
        "page": 1,
        "list": [
          {
            "trainContent": [
              1
            ],
            "status": 1,
            "_id": "66ece923b0340b64a9d651e5",
            "name": "54345",
            "certificateImgId": "66ece91db0340b64a9d651e3",
            "unitName": "345",
            "unitTelephone": "13764545645",
            "unitContactName": "435",
            "unitSocialCode": "453453453453454",
            "unitMailAddress": "345345",
            "IDCard": "441808121651223544",
            "sex": 2,
            "educationLevel": "45",
            "professionalTitle": "345",
            "duties": "345",
            "created": "2024-09-20T03:16:51.618Z",
            "updated": "2024-09-20T03:17:02.702Z",
            "__v": 0,
            "certificateNo": "34234",
            "makeCertificateDate": "2024-09-20T03:17:02.701Z",
            "trainingDate": "2024-09-19T16:00:00.000Z"
          }
        ],
        "pageSize": 10
      }
    },
  },
  mounted() {
    nextTick(() => {
      this.init();
    });
  },
  watch: {
    model: {
      handler() {
        this.columnsArr = this.tableHeader.filter((v, i) => {
          return (
            this.model.includes(v?.key) ||
            i === 0 ||
            i === this.tableHeader.length - 1
          );
        });
      },
    },
  },
  computed: {
    cityList: function () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.columnsArr = JSON.parse(JSON.stringify(this.tableHeader));
      const defaultArr = [];
      const arr = this.tableHeader.slice(1, -1).map((v) => {
        if (v?.default) {
          defaultArr.push(v.key);
        }
        return {
          value: v.key,
          label: v.title ?? "多选框",
        };
      });
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.model = defaultArr;
      return arr;
    },
  },
};
</script>

<style lang="less" scoped>
.table-page {
  background: white;
  width: 100%;
  position: initial;
}

.page {
  height: 65px;
  margin-top: 10px;
  float: right;
}

.middle {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
</style>