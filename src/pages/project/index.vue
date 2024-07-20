<template>

  <div class="cashProject">
    <div class="top">
      <el-button type="primary" @click="openDialog()">新增项目</el-button>
    </div>

    <div class="table">
      <el-table :data="list" style="width: 100%">
        <el-table-column  prop="id" label="id" width="400" />
        <el-table-column prop="projectName" label="项目名称" width="200" />
        <el-table-column prop="projectDate" label="项目日期" width="200" />
        <el-table-column prop="createdDateTime" label="创建时间" width="200" />
        <el-table-column fixed="right" label="操作">
          <template #default="scope">

            <el-popconfirm
                width="220"
                :icon="InfoFilled"
                confirm-button-text="确认"
                cancel-button-text="考虑以下"
                icon-color="#626AEF"
                @confirm="confirmDelete(scope.row)"
                title="你确定要删除该项目吗?"
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
        :title="title"
        @close="closeAndClearInput()"
        width="500"
    >

      <el-form
          label-width="auto"
          ref="ruleFormRef"
          :rules="rules"
          style="max-width: 600px"
          :model="projectInput"
      >
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="projectInput.name" />
        </el-form-item>
        <el-form-item label="项目日期"  prop="projectDate">
          <el-date-picker type="date"  format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="projectInput.projectDate" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary"  @click="submitForm(ruleFormRef)">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>


  </div>
</template>

<script lang="ts" setup>
import {ref,onMounted,reactive} from "vue";
import {create, removeById, page, update} from "../../api/project";
import {HttpResponse,PageInput} from "../../types";
import {CashProject, ProjectInput} from "../../types/project";
import { InfoFilled } from '@element-plus/icons-vue'
import type {FormInstance } from 'element-plus'
import {ElMessage} from "element-plus";
let list = ref<CashProject[]>()
let total = ref<number>(0)
let dialogVisible = ref<boolean>(false)
let title = ref<string>('新增项目')
let pageInput =ref<PageInput>({pageIndex:1,pageSize:20})
let projectInput = ref<ProjectInput>({id:'',name:'',projectDate:''})
const ruleFormRef = ref<FormInstance>()
const rules = reactive({
  name: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
  ],
  projectDate: [
    { required: true, message: '请选择项目日期', trigger: 'blur' },
  ]
})



onMounted(() => {
  getPage();
})



const confirmDelete = (data:CashProject) => {
  deleteById(data)
}

const pageChange = (index:number) => {
  pageInput.value.pageIndex = index;
  getPage();
}

const openDialog = () => {
  dialogVisible.value = true;
}


const deleteById = async (data:CashProject) => {

  let res:HttpResponse<boolean> = await  removeById(data.id);
  if(res.code === 200) {
    ElMessage({'type':'info',message:'删除成功'})
    setTimeout(() => {
      getPage()
    },'50')
  }




}



const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      submitToServer();
    }
  })
}

const openEdite = (data:CashProject) => {

  projectInput.value.id = data.id;
  projectInput.value.name = data.projectName;
  projectInput.value.projectDate = data.projectDate;
  dialogVisible.value = true;
}


const submitToServer  = async () => {
  let res:HttpResponse<any>;
  if (projectInput.value.id !== '') {
    res =  await update(projectInput.value);
  }else {
    res =  await create(projectInput.value);
  }
  if(res.code === 200) {
      setTimeout(() => {
        getPage()
        closeAndClearInput();
      },'50')
  }
}




const closeAndClearInput = () => {
  dialogVisible.value = false;
  projectInput.value.id = '';
  projectInput.value.name = '';
  projectInput.value.projectDate = '';
}










const getPage = async () => {

  let res: HttpResponse<CashProject[]> = await page(pageInput.value);
  list.value = res.data;
  total.value = res.total;

}

</script>

<style scoped lang="scss">
.cashProject {
  display: flex;
  flex-direction: column;
  justify-content: center;


}


</style>