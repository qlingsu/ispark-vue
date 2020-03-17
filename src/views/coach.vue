<template>
  <div class="spark-main-page">
    <div>
      <el-button type="primary" icon="el-icon-edit" @click="openAddDialog">
        添加新学员
      </el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="user_name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex_type"
          label="性别">
          <template slot-scope="scope">
            <span>{{sexItems[scope.row.sex_type]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone_number"
          label="联系电话"
          width="150">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          label="类别">
          <template slot-scope="scope">
            <span>{{typeItems[scope.row.coach_type]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="月薪">
          {{item.month_pay}}
        </el-table-column>
        <el-table-column
          label="主教次薪">
          {{item.time_coach_pay}}
        </el-table-column>
        <el-table-column
          label="助教次薪">
          {{item.time_assistant_pay}}
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align:right;">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="pageNum"
        @current-change="getUserList">
      </el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogAddStudentVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.user_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex_type" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级类别" :label-width="formLabelWidth">
          <el-select v-model="form.grade" placeholder="请选择班级类别">
            <el-option v-for="item in gradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddStudentVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUsers">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import userApi from "@/api/userApi"
import DateUtil from '@/util/DateUtil';
import AppUtil from '@/util/AppUtil';
export default {
  name:"coach-list",
  data(){
    return{
      tableData:[],
      formLabelWidth:"100px",
      gradeOptions:[
        {
          label:"兴趣班",
          value:"1"
        },
        {
          label:"基础班",
          value:"2"
        },
        {
          label:"提高班",
          value:"3"
        },
        {
          label:"精英班",
          value:"4"
        },
        {
          label:"一对一班",
          value:"5"
        },
        {
          label:"其他",
          value:"6"
        },
      ],
      gradeItems:{
        "1":"兴趣班",
        "2":"基础班",
        "3":"提高班",
        "4":"精英班",
        "5":"一对一班", 
        "6":"其他",        
      },
      typeItems:{
        "1":"全职",
        "2":"兼职",
        "3":"其他",        
      },
      sexItems:{
        "0":"女",
        "1":"男"      
      },
      dialogAddStudentVisible:false,
      dialogTitle:"添加学员",
      form:{
        user_name:"",
        phone_number:"",
        age:"",
        sex_type:"",
        grade:""
      },
      rules: {
        user_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        phone_number: [
          { required: true, message: '请填写电话', trigger: 'change' }
        ],
        sex_type: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        grade: [
          { required: true, message: '请选择一个班级类别', trigger: 'change' }
        ]
      },
      total:0,
      pageSize:10,
      pageNum:1,      
    }
  },
  filters:{
      timefmt:function(time){
          return DateUtil.timeFormat(time,"yyyy-MM-dd HH:mm:ss");
      }
  },
  mounted(){
    let self = this;
    self.getUserList(1);
  },
  methods:{
    async getUserList(pageNum){
      let self = this;
      self.pageNum = pageNum;
      let res = await userApi.getUserList("coach",{
        pageSize:self.pageSize,
        pageNum:self.pageNum
      });
      console.log(res);
      if(res.success){
        self.tableData = res.data.rows;
        self.total = res.data.total;
      }
    },
    openAddDialog(){
      let self = this;
      self.dialogAddStudentVisible = true;
    },
    addUsers(){
      let self = this;
      self.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let user_id = AppUtil.uuid();
          let create_time = new Date();
          let data = Object.assign({},self.form);
          data.user_id = user_id;
          data.create_time = create_time;
          console.log(data);
          let res = await userApi.addUser("coach",data);
          console.log(res);
          if(res.success){
            self.dialogAddStudentVisible = false;
            self.getUserList(1);
          }          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async addUser(data){
          console.log(data);
          let res = await userApi.addUser("coach",data);
          console.log(res);
    }
  }
}
</script>
<style lang="scss">
.spark-main-page{
  margin:20px;
}
</style>
