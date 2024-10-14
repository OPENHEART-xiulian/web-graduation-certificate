<template>
  <div class="container">
    <Form
      ref="formValidate"
      :label-width="90"
      class="f-box"
      inline
      label-position="right"
    >
      <FormItem
        v-for="ele in searchInput"
        :key="ele.id"
        :label="ele.label"
        :label-width="ele?.width ?? 90"
      >
        <!--输入框-->
        <Input
          v-if="ele.type == 'input'"
          v-model="ele.value"
          :placeholder="ele.placehold || ''"
          clearable
        ></Input>
        <!--选择框-->
        <Select
          v-else-if="ele.type == 'select'"
          v-model="ele.value"
          style="width: 200px; text-align: left"
        >
          <Option v-for="ele1 in ele.options" :key="ele1.id" :value="ele1.value"
            >{{ ele1.name }}
          </Option>
        </Select>
        <!--日期选择器-->
        <div v-if="ele.type == 'datePicker'" class="data-picker">
          <DatePicker
            v-model="ele.startValue"
            :placeholder="ele.StartPlacehold || ''"
            :transfer="true"
            style="width: 150px"
            type="date"
          />
          --
          <DatePicker
            v-model="ele.endValue"
            :placeholder="ele.endPlacehold || ''"
            style="width: 150px"
            :transfer="true"
            type="date"
          />
        </div>
        <DatePicker
          v-if="ele.type == 'date'"
          v-model="ele.value"
          :placeholder="ele.placehold || ''"
          style="width: 200px; text-align: left"
          type="date"
        ></DatePicker>
      </FormItem>

      <FormItem :label-width="0" class="search-btn">
        <Button type="primary" @click="search">筛选</Button>
        <Button style="margin-left: 8px" @click="reset">重置</Button>
        <Button style="margin-left: 8px" @click="exportList">导出列表</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  props: {
    searchInput: Array,
  },
  data() {
    return {};
  },
  methods: {
    search() {
      console.log(this.searchInput);
      this.$emit("searchCallBack");
    },
    exportList() {
      this.$emit("exportListCallBack");
    },
    reset() {
      this.searchInput.map((ele) => {
        ele.value = "";
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ivu-form-item {
  margin-bottom: 20px;
}
</style>
