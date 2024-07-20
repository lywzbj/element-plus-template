<template>

  <div class="cashItem">
    <div class="top">
      <el-button type="primary" @click="openDialog()">新增明细</el-button>
    </div>

    <div class="table">
      <el-table :data="list" style="width: 100%">
        <el-table-column  prop="id" label="id" width="400" />
        <el-table-column prop="projectName" label="项目名称" width="100" />
        <el-table-column prop="projectDate" label="项目日期" width="120" />
        <el-table-column prop="cashUserName" label="送礼人" show-overflow-tooltip width="200" />
        <el-table-column prop="amount" label="礼金" width="100" />
        <el-table-column prop="remark" label="备注" show-overflow-tooltip width="200" />
        <el-table-column prop="createdDateTime" label="创建时间" width="200" />
        <el-table-column fixed="right" width="200" label="操作">
          <template #default="scope">
            <el-popconfirm
                width="220"
                :icon="InfoFilled"
                confirm-button-text="确认"
                cancel-button-text="考虑以下"
                icon-color="#626AEF"
                @confirm="confirmDelete(scope.row)"
                title="你确定要删除该明细吗?"
            >
              <template #reference>
                <el-button link type="primary" size="small">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
            <el-button link type="primary" size="small" @click="openEdite(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="total"  :default-page-size="20"  @current-change="pageChange" :hide-on-single-page="true"  />
    </div>
    <el-dialog
        v-model="dialogVisible"
        title="新增明细"
        width="500"
    >
      <el-form
          label-width="auto"
          ref="ruleFormRef"
          style="max-width: 600px"
          :rules = "rules"
          :model="requestInput"
      >
        <el-form-item label="礼金项目" prop="projectId">
          <el-select  v-model="requestInput.projectId">
            <el-option v-for="(item) in selectListData"  :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="送礼人"  prop="cashUserName">
          <el-input type="text" v-model="requestInput.cashUserName" />
        </el-form-item>
        <el-form-item label="金额"  prop="amount">
          <el-input-number  v-model="requestInput.amount" />
        </el-form-item>
        <el-form-item label="备注"  prop="remark">
          <el-input type="textarea" v-model="requestInput.remark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary"   @click="submitForm(ruleFormRef)">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>


  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {CashItem, CashItemInput} from "../../types/item";
import {HttpResponse, PageInput, SelectDTO} from "../../types";
import { InfoFilled } from '@element-plus/icons-vue'
import {page} from "../../api/item";
import { selectList} from "../../api/project";
import {create, update,removeById} from "../../api/item";
import {ElMessage, FormInstance} from "element-plus";
let pageInput =ref<PageInput>({pageIndex:1,pageSize:20})
let requestInput = ref<CashItemInput>({id:'',projectId:'',cashUserName:'',amount:0,remark:''})
let list = ref<CashItem[]>()
let selectListData = ref<SelectDTO[]>([])
let total = ref<number>(0)
let dialogVisible = ref<boolean>(false)

const ruleFormRef = ref<FormInstance>()
const rules = reactive({
  projectId: [
    { required: true, message: '请选择项目', trigger: 'blur' },
  ],
  cashUserName: [
    { required: true, message: '请输入送礼人', trigger: 'blur' },
  ],
  amount: [
    { required: true, message: '请输入金额', trigger: 'blur' },
  ]
})

onMounted(() => {
  getPage();
  getSelect();
})

const pageChange = (index:number) => {
  pageInput.value.pageIndex = index;
  getPage();
}

const openDialog = () => {
  dialogVisible.value = true;
}

const confirmDelete = (data:CashItem) => {
  deleteById(data)
}

const deleteById = async (data:CashItem) => {
  let res:HttpResponse<boolean> = await  removeById(data.id);
  if(res.code === 200) {
    ElMessage({'type':'info',message:'删除成功'})
    setTimeout(() => {
      getPage()
    },'50')
  }




}

const getSelect = async () => {
  let res:HttpResponse<SelectDTO[]>  = await selectList();
  selectListData.value = res.data
}

const openEdite = (data:CashItem) => {
  requestInput.value.id = data.id;
  requestInput.value.projectId = data.projectId;
  requestInput.value.cashUserName = data.cashUserName;
  requestInput.value.amount = data.amount;
  requestInput.value.remark = data.remark;
  dialogVisible.value = true;
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      submitToServer();
    }
  })
}

const submitToServer  = async () => {
  let res:HttpResponse<any>;
  if (requestInput.value.id !== '') {
    res =  await update(requestInput.value);
  }else {
    res =  await create(requestInput.value);
  }
  if(res.code === 200) {
    setTimeout(() => {
      getPage()
      closeAndClearInput()
    },'50')
  }
}

const closeAndClearInput = () => {
  dialogVisible.value = false;
  requestInput.value.id = '';
  requestInput.value.projectId = '';
  requestInput.value.cashUserName = '';
  requestInput.value.amount = 0;
  requestInput.value.remark = '';
}

const getPage = async () => {
  let res: HttpResponse<CashItem[]> = await page(pageInput.value);
  list.value = res.data;
  total.value = res.total;

}

</script>

<style scoped lang="scss">
.cashItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>