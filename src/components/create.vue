<template>
  <div class="main">
    <p class="tittle">NEW EVENT</p>
    <Row class="basic">
      <Col span="5" class="date">DATE: <DatePicker class="datepick" type="date" v-model="date"  placeholder="Select date"></DatePicker></Col>
      <Col span="6" class="stime">START TIME: <TimePicker class="timepick" v-model="stime" type="time" placeholder="Select time"></TimePicker></Col>
      <Col span="5" class="etime">END TIME: <TimePicker class="timepick" v-model="etime" type="time" placeholder="Select time"></TimePicker></Col>
      <Col span="4" class="courts">COURTS: <InputNumber class="number" v-model="courts"  :max="100" :min="1" ></InputNumber></Col>
      <Col span="4" class="done">
        <Button type="primary" @click="goCreate" v-if="date != '' && stime != '' && etime != '' && data1.length != 0">
        Create
        <Icon type="ios-arrow-forward" />
      </Button>
        <Button type="primary" v-else disabled>
          Create
          <Icon type="ios-arrow-forward" />
        </Button>
      </Col>
    </Row>
    <Row class="choose">
      <Card class="chosen">
        <p slot="title" class="cHead">
          <img src="../assets/addpeople_fill.png"/>
          CHOSEN
        </p>
        <div class="cContent">
          <li class="list-header">
            <Row>
              <Col span="8" class="gender">Gender</Col>
              <Col span="8" class="name">Name</Col>
              <Col span="8" class="point">Point</Col>
            </Row>
          </li>
          <draggable v-model="data1" element="span" :options="dragOptions">
            <transition-group :name="'flip-list'" class="list-group" tag="ul">
              <li class="list-group-item" v-for="item in data1" :key="item.MemberId">
                <Row>
                  <Col span="8" class="gender">{{item.Gender}}</Col>
                  <Col span="8" class="name">{{item.Name}}</Col>
                  <Col span="8" class="point">{{item.Point}}</Col>
                </Row>
              </li>
            </transition-group>
          </draggable>
        </div>
      </Card>
      <Card class="all">
        <p slot="title" class="cHead">
          <img src="../assets/people.png"/>
          ALL
          <Input class="search" size="small" clearable placeholder="search..." @on-enter="goSearch"/>
          <Button type="primary" class="searchBtn" size="small" shape="circle" icon="ios-search" @click="goSearch"></Button>
        </p>
        <div class="cContent">
          <li class="list-header">
            <Row>
              <Col span="8" class="gender">Gender</Col>
              <Col span="8" class="name">Name</Col>
              <Col span="8" class="point">Point</Col>
            </Row>
          </li>
          <draggable v-model="data2" element="span" :options="dragOptions">
            <transition-group :name="'flip-list'" class="list-group" tag="ul">
              <li class="list-group-item" v-for="item in data2" :key="item.MemberId">
                <Row>
                  <Col span="8" class="gender">{{item.Gender}}</Col>
                  <Col span="8" class="name">{{item.Name}}</Col>
                  <Col span="8" class="point">{{item.Point}}</Col>
                </Row>
              </li>
            </transition-group>
          </draggable>
        </div>
      </Card>
      <Card class="add">
        <p slot="title" class="cHead">
          <img src="../assets/Add person.png"/>
          ADD
        </p>
        <div class="cContent">
          <Form class="addForm" ref="formDynamic" :model="formDynamic">
            <FormItem
              v-for="(item, index) in formDynamic.items"
              v-if="item.status"
              :key="index"
              :label="'Member ' + item.index"
              :prop="'items.' + index + '.value'"
              :rules="{required: true, message: 'Member ' + item.index +' can not be empty', trigger: 'blur'}">
              <Row>
                <Col span="8">
                  <RadioGroup v-model="item.gender">
                    <Radio label="male">Male</Radio>
                    <Radio label="female">Female</Radio>
                  </RadioGroup>
                </Col>
                <Col span="6">
                  <Input type="text" v-model="item.value" placeholder="Name"></Input>
                </Col>
                <Col span="2" offset="1">
                  <Button @click="handleRemove(index)">Delete</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <div class="formBtn">
                  <Button type="dashed" @click="handleAdd">Add Member</Button>
                </div>
              </Row>
            </FormItem>
            <FormItem>
              <div class="formBtn">
                <Button type="primary" :loading="loading" @click="handleSubmit('formDynamic')">{{loading ? 'Loding,,,' : 'Submit'}}</Button>
                <Button @click="handleReset('formDynamic')">Reset</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Card>
    </Row>
  </div>
</template>

<script>
  import data from '../MemberList'
  import Vue from 'vue'
  import draggable from "vuedraggable";
  import { Row, Col, DatePicker, TimePicker, InputNumber, Card, Table, Input, FormItem, Form, Button, Radio, RadioGroup } from 'iview';
  Vue.component('Col', Col);
  Vue.component('Row', Row);
  Vue.component('DatePicker', DatePicker);
  Vue.component('TimePicker', TimePicker);
  Vue.component('InputNumber', InputNumber);
  Vue.component('Input', Input);
  Vue.component('Card', Card);
  Vue.component('Table', Table);
  Vue.component('FormItem', FormItem);
  Vue.component('Form', Form);
  Vue.component('Button', Button);
  Vue.component('Radio', Radio);
  Vue.component('RadioGroup', RadioGroup);
    export default {
        name: "create",
      components: {draggable},
      data () {
          return {
            columns: [
              {
                title: 'Gender',
                key: 'Gender'
              },
              {
                title: 'Name',
                key: 'Name'
              },
              {
                title: 'Point',
                key: 'Point'
              }
            ],
            data1: [],
            data2: [],
            editable: true,
            isDragging: false,
            delayedDragging: false,
            index: 1,
            date: "",
            stime: "",
            etime: "",
            courts: 1,
            formDynamic: {
              items: [
                {
                  value: '',
                  index: 1,
                  status: 1,
                  gender: 'male'
                }
              ]
            },
            newmember: [],
            loading: false
        }
      },
      created: function () {
        this.$axios.get('/api/MemberList').then(response => {
          console.log(response.data);
          this.data2 = response.data;
        }).catch(error => {
          console.log("error");
        })
      },
      computed: {
        dragOptions() {
          return {
            animation: 0,
            group: "description",
            disabled: !this.editable,
            ghostClass: "ghost"
          };
        }
      },
      watch: {
        isDragging(newValue) {
          if (newValue) {
            this.delayedDragging = true;
            return;
          }
          this.$nextTick(() => {
            this.delayedDragging = false;
          });
        }
      },
      methods: {
        handleSubmit (name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              var names = "", genders = "", i;
              for(i = 0; i < this.formDynamic.items.length; i++){
                names = names + this.formDynamic.items[i].value;
                if(this.formDynamic.items[i].gender == "male"){
                  genders = genders + "M";
                }else{
                  genders = genders + "F";
                }
                if(i != (this.formDynamic.items.length - 1)){
                  names = names + ",";
                  genders = genders + ",";
                }
              }
              console.log(names);
              console.log(genders);
              this.loading = true;
              var _this = this;
              this.$axios.post("/api/NewMembers", "Names=" + names + "&Genders=" + genders).then(function (response) {
                alert("Successful Submission");
                _this.formDynamic.items.splice(1, _this.formDynamic.items.length-1);
                _this.formDynamic.items[0].value = "";
                _this.formDynamic.items[0].gender = "male";
                _this.data2 = _this.data2.concat(response.data);
                _this.loading = false;
              }).catch(function (error) {
                console.log(error);
              });
            } else {
              // this.$Message.error('Fail!');
            }
          })
        },
        handleReset (name) {
          this.$refs[name].resetFields();
        },
        handleAdd () {
          this.index++;
          this.formDynamic.items.push({
            value: '',
            index: this.index,
            status: 1,
            gender: 'male'
          });
        },
        handleRemove (index) {
          this.formDynamic.items[index].status = 0;
          this.formDynamic.items.splice(index, 1);
        },
        goSearch () {
          console.log("111");
        },
        goCreate () {
          var para = "startTime=" + this.formatDate(this.date, "yyyy-MM-dd") + ' ' + this.stime + "&endTime=" + this.formatDate(this.date, "yyyy-MM-dd") + ' ' + this.etime + "&courts=" + this.courts + "&members=(";
          var i;
          for(i = 0; i < this.data1.length; i++){
            para = para + this.data1[i].MemberId;
            if(i != (this.data1.length - 1)){
              para = para + ",";
            }else{
              para = para + ")";
            }
          }
          console.log(para);
          if(this.etime > this.stime){
            var _this = this;
            this.$axios.post("/api/NewEvent", para).then(function (response) {
              alert("Code: " + response.data);
              _this.$router.push("/");
            }).catch(function (error) {
              console.log(error);
            });
          }else{
            alert("Time Error!");
          }
        },
        formatDate (date, fmt) {
          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
          };
          for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
              let str = o[k] + '';
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
            }
          }
          return fmt;
        },
        padLeftZero (str) {
          return ('00' + str).substr(str.length);
        }
      }
    }
</script>

<style scoped lang="less">
  @px2rem: 144rem;
  .main {
    margin-top: 20/@px2rem;
  }
  .tittle {
    font-size: 20/@px2rem;
    font-weight: 500;
    margin-bottom: 20/@px2rem;
    margin: 30/@px2rem;
  }
  .basic {
    margin: 0 60/@px2rem;
    font-size: 16/@px2rem;
    margin-bottom: 30/@px2rem;
    .datepick,
    .timepick {
      width: 168/@px2rem;
    }
    .number {
      width: 68/@px2rem;
    }
  }
  .choose {
    margin: 0 100/@px2rem;
    .chosen,
    .all {
      display: inline-block;
      margin-right: 20/@px2rem;
      width: 320/@px2rem;
    }
    .add {
      display: inline-block;
      width: 460/@px2rem;
      margin-left: 30/@px2rem;
      .addForm {
        .formBtn {
          text-align: center;
        }
      }
    }
  }
  .cContent {
    height: 450/@px2rem;
    overflow-y: auto;
  }
  .list-group {
    min-height: 20px;
  }
  .list-header {
    list-style: none;
    text-align: center;
    padding: 10/@px2rem;
    background-color: #f8f8f9;
    border: solid 1px #dcdee2;
    font-weight: 600;
  }
  .list-group-item {
    text-align: center;
    list-style: none;
    cursor: move;
    background-color: #f8f8f9;
    border: solid 1px #dcdee2;
    padding: 10/@px2rem;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .cHead {
    height: 25px;
    line-height: 25px;
    position: relative;
    padding-left: 24/@px2rem;
    img {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      width: 20/@px2rem;
    }
    .search {
      position: absolute;
      width: 120/@px2rem;
      right: 36/@px2rem;
      top: 50%;
      transform: translate(0, -50%);
    }
    .searchBtn {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
    }
  }

</style>
