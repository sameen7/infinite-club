<template>
  <div class="main">
    <div class="upcoming">
      <p class="tittle">UPCOMING</p>
      <div class="events">
        <Card class="event" :dis-hover="(index+1) == uEvents.length ? !isHover : isHover" :bordered="(index+1) == uEvents.length ? !isBordered : isBordered" v-for="(item, index) in uEvents"  :class="(index+1) == uEvents.length ? 'more' : ''">
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            Event
          </p>
          <a class="enter" href="#" slot="extra" @click.prevent="isEnter = item.eventId">
            ENTER
            <Icon type="ios-arrow-forward"></Icon>
          </a>
          <p class="date">Date: {{item.startTime.substring(0, 10)}}</p>
          <p class="startTime">Start Time: {{item.startTime.substring(11)}}</p>
          <p class="endTime">End Time: {{item.endTime.substring(11)}}</p>
          <p class="courts">Court Number: {{item.courts}}</p>
          <div class="add" v-if="(index+1) == uEvents.length"><img src="../assets/add.png" @click="goCreate"/></div>
        </Card>
      </div>
    </div>
    <div class="finished">
      <p class="tittle">FINISHED</p>
      <div class="events">
        <Card class="event" v-for="(item) in fEvents">
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            Event
          </p>
          <p class="date">Date: {{item.startTime.substring(0, 10)}}</p>
          <p class="startTime">Start Time: {{item.startTime.substring(11)}}</p>
          <p class="endTime">End Time: {{item.endTime.substring(11)}}</p>
          <p class="courts">Court Number: {{item.courts}}</p>
        </Card>
      </div>
    </div>
    <div class="codemodal" v-if="isEnter != 0">
      <div class="mask" @click="isEnter = 0"></div>
      <div class="modal">
        <div class="modalhead"><img src="../assets/password.png"/>Code</div>
        <div class="content">
          <Row class="c1">
            <Input type="password" v-model="code" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </Row>
          <Row class="c2">
            <Button type="primary" @click="goEvent(isEnter)">COMFIRM</Button>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Card, Icon, Input, Row, Button } from 'iview';
  Vue.component('Card', Card);
  Vue.component('Icon', Icon);
  Vue.component('Input', Input);
  Vue.component('Row', Row);
  Vue.component('Button', Button);
    export default {
        name: "home",
      data () {
        return {
          uEvents: [],
          fEvents: [],
          isHover: false,
          isBordered: true,
          code: "",
          isEnter: 0
        }
      },
      created: function () {
        // axios.defaults.withCredentials = true;
        this.$axios.get('/api/EventList').then(response => {
          console.log(response.data);
          this.uEvents = response.data.READY;
          this.fEvents = response.data.FINISHED;
          var c = {
            "eventId": 0,
            "startTime": "",
            "courts": 0,
            "endTime": ""
          };
          this.uEvents.push(c);
          console.log(response.data);
        }).catch(error => {
          console.log("error");
        })
      },
      methods: {
          goCreate () {
            this.$router.push("/create");
          },
        goEvent (eventId) {
          var _this = this;
          this.isEnter = 0;
          this.$axios.post("/api/VerifyEvent", "eventId=" + eventId + "&code=" + this.code).then(function (response) {
            console.log(response);
            if(response.data == 'SUCCESS'){
              _this.$router.push({name: 'event', params: {id: eventId}});
            }else{
              alert("Verification Failed!");
            }
            this.code = "";
          }).catch(function (error) {
            console.log(error);
          });
          this.code = "";
        }
      }
    }
</script>

<style scoped lang="less">
  @px2rem: 144rem;
  .main {
    margin-top: 20/@px2rem;
  }
.upcoming {
  border-bottom: solid 2/@px2rem #dcdee2;
  .tittle {
    font-size: 20/@px2rem;
    font-weight: 500;
    margin: 0 30/@px2rem;
    margin-bottom: 20/@px2rem;
  }
  .events {
    margin-right: 65/@px2rem;
    margin-left: 50/@px2rem;
    .event {
      display: inline-block;
      width: 250/@px2rem;
      margin-left: 15/@px2rem;
      margin-bottom: 20/@px2rem;
    }
    .more {
      position: relative;

    }
    .date,
    .startTime,
    .endTime,
    .courts,
    .enter {
      font-size: 14/@px2rem;
    }
    .add {
      position: absolute;
      z-index: 999;
      height: 100%;
      width: 250/@px2rem;
      top: 0;
      left: 0;
      background-color: #fff;
      cursor: pointer;
      img {
        position: absolute;
        width: 148/@px2rem;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
      }
    }
  }
}

.finished {
  .tittle {
    font-size: 20/@px2rem;
    font-weight: 500;
    margin-bottom: 20/@px2rem;
    margin: 30/@px2rem;
  }
  .events {
    margin-right: 65/@px2rem;
    margin-left: 50/@px2rem;

    .event {
      display: inline-block;
      width: 250/@px2rem;
      margin-left: 15/@px2rem;
      margin-bottom: 20/@px2rem;
    }
    .date,
    .startTime,
    .endTime,
    .courts {
      font-size: 14/@px2rem;
    }
  }
}

  .codemodal {
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.3);
      z-index: 999;
    }
    .modal {
      position: fixed;
      width: 500/@px2rem;
      height: 200/@px2rem;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      background-color: #f8f8f9;
      border: solid 1px #dcdee2;
      border-radius: 10/@px2rem;
      .modalhead {
        height: 60/@px2rem;
        border-bottom: solid 2/@px2rem #dcdee2;
        text-align: center;
        color: #000;
        font-weight: 500;
        line-height: 60/@px2rem;
        font-size: 24/@px2rem;
        img {
          width: 24/@px2rem;
        }
      }
      .content {
        padding: 20/@px2rem;
        padding-right: 100/@px2rem;
        padding-left: 100/@px2rem;
        text-align: center;
        font-size: 24/@px2rem;
        font-weight: 500;
        .c1 {
          height: 70/@px2rem;
          line-height: 70/@px2rem;
        }
        .c2 {
          height: 30/@px2rem;
          line-height: 30/@px2rem;
        }
      }
    }
  }
</style>
