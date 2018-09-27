<template>
  <div class="main">
    <div class="finishModal" v-if="finishIndex != 'G0'">
      <div class="mask" @click="finishIndex = 'G0'"></div>
      <div class="modal">
        <div class="modalhead"><img src="../assets/record.png"/>Score Record</div>
        <div class="content">
          <Row class="c1">
            <Col class="aScore" span="11">
              A: <InputNumber :max="100" :min="0" v-model="aScore" size="large"></InputNumber>
            </Col>
            <Col class="semi" span="2">
              ：
            </Col>
            <Col class="bScore" span="11">
              B: <InputNumber :max="100" :min="0" v-model="bScore" size="large"></InputNumber>
            </Col>
          </Row>
          <Row class="c2">
            <Button type="primary" @click="goFinish">COMFIRM</Button>
          </Row>
        </div>
      </div>
    </div>
    <div class="notice" v-if="showHint">
      <div class="nhead">
        <img src="../assets/notice.png"/>
        <span class="title">
          NEW GAME!
        </span>
      </div>
      <div class="ncontent">
        {{hint}}
      </div>
    </div>
    <Row :gutter="16" class="mainrow">
      <Col class="left" span="8">
        <Card class="upcoming" dis-hover>
          <p slot="title" class="cHead">
            <img src="../assets/user-round-wait.png"/>
            UPCOIMG
          </p>
          <div class="halfcontent">
            <li class="upitem" v-for="(item, key, index) in UpCourts">
              <Row>
                <Col span="2" class="index">{{index + 1}}</Col>
                <Col span="10" class="A">
                  <div class="A1" v-if="item.A1.memberId == 0">A1</div>
                  <div class="A1M" v-else-if="item.A1.gender == 'Male'">
                    <img src="../assets/male.png"/>{{item.A1.name}}
                  </div>
                  <div class="A1F" v-else>
                    <img src="../assets/female.png"/>{{item.A1.name}}
                  </div>
                  <div class="A2" v-if="item.A2.memberId == 0">A2</div>
                  <div class="A2M" v-else-if="item.A2.gender == 'Male'">
                    <img src="../assets/male.png"/>{{item.A2.name}}
                  </div>
                  <div class="A2F" v-else>
                    <img src="../assets/female.png"/>{{item.A2.name}}
                  </div>
                </Col>
                <Col span="2" class="vs">VS</Col>
                <Col span="10" class="B">
                  <div class="B1" v-if="item.B1.memberId == 0">B1</div>
                  <div class="B1M" v-else-if="item.B1.gender == 'Male'">
                    <img src="../assets/male.png"/>{{item.B1.name}}
                  </div>
                  <div class="B1F" v-else>
                    <img src="../assets/female.png"/>{{item.B1.name}}
                  </div>
                  <div class="B2" v-if="item.B2.memberId == 0">B2</div>
                  <div class="B2M" v-else-if="item.B2.gender == 'Male'">
                    <img src="../assets/male.png"/>{{item.B2.name}}
                  </div>
                  <div class="B2F" v-else>
                    <img src="../assets/female.png"/>{{item.B2.name}}
                  </div>
                </Col>
              </Row>
            </li>
          </div>
        </Card>
        <Card class="history" dis-hover>
          <p slot="title" class="cHead">
            <img src="../assets/history.png"/>
            HISTORY
          </p>
          <div class="halfcontent">
            <li class="historyitem" v-for="item in History">
              <Row>
                <Col span="10" class="A">
                  <div class="A1" v-if="item.A1.memberId == 0">A1</div>
                  <div class="A1M" v-else-if="item.A1.gender == 'Male'">
                    <img src="../assets/male.png"/>{{item.A1.name}}
                  </div>
                  <div class="A1F" v-else>
                    <img src="../assets/female.png"/>{{item.A1.name}}
                  </div>
                  <div class="A2" v-if="item.A2.memberId == 0">A2</div>
                  <div class="A2M" v-else-if="item.A2.gender == 'Male'">
                    <img src="../assets/male.png"/>{{item.A2.name}}
                  </div>
                  <div class="A2F" v-else>
                    <img src="../assets/female.png"/>{{item.A2.name}}
                  </div>
                </Col>
                <Col span="2" class="vs">{{item.aScore}}</Col>
                <Col span="2" class="vs">{{item.bScore}}</Col>
                <Col span="10" class="B">
                  <div class="B1" v-if="item.B1.memberId == 0">B1</div>
                  <div class="B1M" v-else-if="item.B1.gender == 'Male'">
                    <img src="../assets/male.png"/>{{item.B1.name}}
                  </div>
                  <div class="B1F" v-else>
                    <img src="../assets/female.png"/>{{item.B1.name}}
                  </div>
                  <div class="B2" v-if="item.B2.memberId == 0">B2</div>
                  <div class="B2M" v-else-if="item.B2.gender == 'Male'">
                    <img src="../assets/male.png"/>{{item.B2.name}}
                  </div>
                  <div class="B2F" v-else>
                    <img src="../assets/female.png"/>{{item.B2.name}}
                  </div>
                </Col>
              </Row>
            </li>
          </div>
        </Card>
      </Col>
      <Col class="mid" span="8">
        <Card class="playing" dis-hover>
          <p slot="title" class="cHead">
            <img src="../assets/ing.png"/>
            PLAYING
          </p>
          <div class="content">
            <Card class="gamecard" v-for="(item, key, index) in OnCourts">
              <p slot="title" class="cHead">
                <img src="../assets/tennis-court.png"/>
                {{"Court " + (index+1)}}
                <Button type="primary" disabled class="finishBtn" size="small" v-if="item.left == 1">FINISH</Button>
                <Button type="primary" class="finishBtn" size="small" v-else @click="finishIndex = key">FINISH</Button>
              </p>
              <li class="gameitem">
                <Row>
                  <Col span="10" class="A">
                    <div class="A1" v-if="item.A1.memberId == 0">A1</div>
                    <div class="A1M" v-else-if="item.A1.gender == 'Male'">
                      <img src="../assets/male.png"/>{{item.A1.name}}
                    </div>
                    <div class="A1F" v-else>
                      <img src="../assets/female.png"/>{{item.A1.name}}
                    </div>
                    <div class="A2" v-if="item.A2.memberId == 0">A2</div>
                    <div class="A2M" v-else-if="item.A2.gender == 'Male'">
                      <img src="../assets/male.png"/>{{item.A2.name}}
                    </div>
                    <div class="A2F" v-else>
                      <img src="../assets/female.png"/>{{item.A2.name}}
                    </div>
                  </Col>
                  <Col span="4" class="vs">VS</Col>
                  <Col span="10" class="B">
                    <div class="B1" v-if="item.B1.memberId == 0">B1</div>
                    <div class="B1M" v-else-if="item.B1.gender == 'Male'">
                      <img src="../assets/male.png"/>{{item.B1.name}}
                    </div>
                    <div class="B1F" v-else>
                      <img src="../assets/female.png"/>{{item.B1.name}}
                    </div>
                    <div class="B2" v-if="item.B2.memberId == 0">B2</div>
                    <div class="B2M" v-else-if="item.B2.gender == 'Male'">
                      <img src="../assets/male.png"/>{{item.B2.name}}
                    </div>
                    <div class="B2F" v-else>
                      <img src="../assets/female.png"/>{{item.B2.name}}
                    </div>
                  </Col>
                </Row>
              </li>
            </Card>
          </div>
        </Card>
      </Col>
      <Col class="right" span="8">
        <Card class="players" dis-hover>
          <p slot="title" class="cHead">
            <img src="../assets/players.png"/>
            PLAYERS
          </p>
          <div class="content">
            <div class="tablewrapper">
              <li class="tablehead">
                <Row>
                  <Col span="4" class="rank">Rank</Col>
                  <Col span="4" class="gender">Gender</Col>
                  <Col span="6" class="name">Name</Col>
                  <Col span="4" class="point">Point</Col>
                  <Col span="6" class="action">Action</Col>
                </Row>
              </li>
              <li class="tableitem" v-for="(item, index, key) in MemberQueue" :class="(key+1) == mTotal ? 'noborder' : ''">
                <Row>
                  <Col span="4" class="rank">{{key + 1}}</Col>
                  <Col span="4" class="gender">
                    <img v-if="item.gender == 'Male'" src="../assets/male.png"/>
                    <img v-else src="../assets/female.png"/>
                  </Col>
                  <Col span="6" class="name">{{item.name}}</Col>
                  <Col span="4" class="point">{{item.point}}</Col>
                  <Col span="6" class="action">
                    <img class="sign" v-if="item.status == 9" src="../assets/thumb-up.png" @click="signin(index)"/>
                    <img class="signed" v-else src="../assets/Check.png"/>
                    <img class="selection" v-if="item.status == 1" src="../assets/selection.png"/>
                    <img class="select" v-else-if="(sta1 == 1 && (((item.status == 2 || item.status == 3) && (item.courtId == 0 || (item.courtId != 0 && UpCourts['U'+item.courtId].total < 4))) || item.status == 4 || item.status == 5))" src="../assets/select.png" @click="goSelect(index)"/>
                    <img class="noselect" v-else src="../assets/select2.png"/>
                    <div class="choice" v-if="index == nowindex">
                      <div class="mask" @click="close"></div>
                      <div class="chosecontent" v-if="isVac && item.courtId == 0">
                        <li class="pos22" @click="isVac = false">
                          NEW
                        </li>
                        <li class="pos22" v-for="(ite, ke, inde) in UpCourts" v-if="ite.total == 2">
                          <p class="pos2" v-if="(ite.A1.memberId != 0 && ite.A2.memberId != 0) || (ite.B1.memberId != 0 && ite.B2.memberId != 0)"  @click="setUp(ke, index, '')">{{"Upcoming" + (inde+1)}}</p>
                          <p class="pos2" v-if="!((ite.A1.memberId != 0 && ite.A2.memberId != 0) || (ite.B1.memberId != 0 && ite.B2.memberId != 0))"  @click="setUp(ke, index, 'A')">{{"Upcoming" + (inde+1)}}<br/>{{"A: YOU B: " + MemberQueue[index].name.substring(0, 3) + "."}}</p>
                          <p class="pos2" v-if="!((ite.A1.memberId != 0 && ite.A2.memberId != 0) || (ite.B1.memberId != 0 && ite.B2.memberId != 0))"  @click="setUp(ke, index, 'B')">{{"Upcoming" + (inde+1)}}<br/>{{"A: " + MemberQueue[index].name.substring(0, 3) + "." + " B: YOU"}}</p>
                        </li>
                      </div>
                      <div class="content" v-if="!(isVac && item.courtId == 0)">
                        <Row>
                          <Col class="A" span="10">
                            <div class="A1" v-if="item.courtId == 0 || item.status == 4 || item.status == 5">YOU</div>
                            <div class="A11" v-else-if="UpCourts['U'+item.courtId].A1.memberId == 0" @click="selected('A1', index)">A1</div>
                            <div class="A1" v-else :class="UpCourts['U'+item.courtId].A1.gender == 'Female' ? 'Fe' : 'Ma'">{{UpCourts['U'+item.courtId].A1.name.substring(0, 3) + '.'}}</div>
                            <div class="A22" v-if="item.status == 4 || item.status == 5 || item.courtId == 0 || UpCourts['U'+item.courtId].A2.memberId == 0"  @click="selected('A2', index)">A2</div>
                            <div class="A2" v-else :class="UpCourts['U'+item.courtId].A2.gender == 'Female' ? 'Fe' : 'Ma'">{{UpCourts['U'+item.courtId].A2.name.substring(0, 3) + '.'}}</div>
                          </Col>
                          <Col class="vs" span="4">
                              VS
                          </Col>
                          <Col class="B" span="10">
                            <div class="B11" v-if="item.status == 4 || item.status == 5 || item.courtId == 0 || UpCourts['U'+item.courtId].B1.memberId == 0" @click="selected('B1', index)">B1</div>
                            <div class="B1" v-else :class="UpCourts['U'+item.courtId].B1.gender == 'Female' ? 'Fe' : 'Ma'">{{UpCourts['U'+item.courtId].B1.name.substring(0, 3) + '.'}}</div>
                            <div class="B22" v-if="item.status == 4 || item.status == 5 || item.courtId == 0 || UpCourts['U'+item.courtId].B2.memberId == 0" @click="selected('B2', index)">B2</div>
                            <div class="B2" v-else :class="UpCourts['U'+item.courtId].B2.gender == 'Female' ? 'Fe' : 'Ma'">{{UpCourts['U'+item.courtId].B2.name.substring(0, 3) + '.'}}</div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </li>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import load from '../LoadEvent'
  import { Row, Col, InputNumber, Card, Button } from 'iview';
  Vue.component('Col', Col);
  Vue.component('Row', Row);
  Vue.component('InputNumber', InputNumber);
  Vue.component('Card', Card);
  Vue.component('Button', Button);
    export default {
        name: "event",
      data () {
          return {
            load: {},
            mTotal: 0,
            MemberQueue: {},
            nowindex: -1,
            Upcoming: {},
            UpCourts: {},
            OnCourts: {},
            sta1: 0,
            left: 0,
            History: [],
            aScore: 0,
            bScore: 0,
            finishIndex: "G0",
            eventId: 0,
            isVac: false,
            showHint: false,
            hint: ""
          }
      },
      created: function () {
        // this.MemberQueue.sort(this.sortByAll);
        // console.log(this.sortObj(0, this.MemberQueue));
        this.eventId = this.$route.params.id;
        var _this = this;
        this.$axios.post("/api/LoadEvent", "eventId=" + this.eventId).then(function (response) {
          _this.load = response.data;
          _this.mTotal = _this.load.MemberQueue.Total;
          _this.MemberQueue = _this.load.MemberQueue.Queue;
          _this.Upcoming = _this.load.Upcoming;
          _this.UpCourts = _this.load.Upcoming.UpCourts;
          _this.OnCourts = _this.load.Games.OnCourts;
          _this.left = _this.load.Games.left;
          _this.History = _this.load.History;
          var key, first;
          _this.MemberQueue = _this.sortObj(1, _this.MemberQueue);
          for (key in _this.MemberQueue) {
            first = key;
            break;
          }
          if(_this.MemberQueue[first].status == 2){
            _this.MemberQueue[first].status = 1;
          }
          _this.checkSta1();
          console.log(3333333);
          console.log(response.data);
          console.log(4444444);
        }).catch(function (error) {
          console.log(error);
        });
      },
      methods: {
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
        },
        sortByAll (a, b) {
          if(a.status == b.status){
            return a.rank - b.rank;
          }else{
            return a.status - b.status
          }
        },
        sortByStatus (a, b) {
          return a.status - b.status
        },
        sortByTotal (a, b) {
          return b.total - a.total;
        },
        signin (index) {
          var first;
          var key;
          this.MemberQueue[index].status = 2;
          // this.MemberQueue.sort(this.sortByStatus);
          this.MemberQueue = this.sortObj(1, this.MemberQueue);
          for (key in this.MemberQueue) {
            first = key;
            break;
          }
          if(this.MemberQueue[first].status == 2){
            this.MemberQueue[first].status = 1;
          }
          this.checkSta1();
        },
        goSelect (index) {
          this.nowindex = index;
          this.isVac = false;
          var key;
          if(this.Upcoming.Total != 0){
            for(key in this.UpCourts){
              if(this.UpCourts[key].total == 2){
                this.isVac = true;
                break;
              }
            }
          }
        },
        close () {
          this.nowindex = -1;
        },
        sortObj (op, obj) {
          var c = [];
          var tmp = {};
          var i;
          var k;
          for (k in obj) {
            c.push(obj[k]);
          }
          if(op == 0){
            c.sort(this.sortByAll);
          }else if(op == 1){
            c.sort(this.sortByStatus);
          }else if(op == 2){
            c.sort(this.sortByTotal);
          }
          for (i = 0; i < c.length; i++){
            if(op == 1){
              tmp["M"+c[i].memberId] = c[i];
            }else if(op == 2){
              tmp["U"+c[i].courtId] = c[i];
            }
          }
          // console.log(tmp);
          return tmp;
        },
        checkGender(item, first) {
          var flag = true;
          if(this.UpCourts['U' + item.courtId].total == 2){
            var it = this.UpCourts['U' + item.courtId];
            console.log(333);
            if(it.A1.gender != "" && it.A2.gender != "" && it.A1.gender == it.A2.gender){
              if(first.gender != it.A1.gender){
                flag = false;
              }
            }else if(it.B1.gender != "" && it.B2.gender != "" && it.B1.gender == it.B2.gender){
              if(first.gender != it.B1.gender){
                flag = false;
              }
            }
          }else if(this.UpCourts['U' + item.courtId].total == 3){
            var key;
            var female = 0;
            var male = 0;
            for(key in this.UpCourts['U' + item.courtId]){
              if(this.UpCourts['U' + item.courtId][key].gender == "Male"){
                male++;
              }else if(this.UpCourts['U' + item.courtId][key].gender == "Female"){
                female++;
              }
            }
            if(first.gender == "Male"){
              male++;
            }else if(first.gender == "Female"){
              female++;
            }
            if(male % 2 != 0){
              flag = false;
            }
          }
          return flag;
        },
        setUp(ke, index, pos){
          var first;
          var key;
          for (key in this.MemberQueue) {
            first = this.MemberQueue[key];
            break;
          }
          if(pos != ""){
            var male = 0, female = 0;
            var i;
            for(i in this.UpCourts[ke]){
              if(this.UpCourts[ke][i].gender == "Male"){
                male++;
              }else if(this.UpCourts[ke][i].gender == "Female"){
                female++;
              }
            }
            if(male == 1){
              if(first.gender == this.MemberQueue[index].gender){
                this.isVac = false;
                this.nowindex = -1;
                alert("Warning：Gender Imbalance！");
                return;
              }
            }else{
              if(first.gender != this.MemberQueue[index].gender){
                this.isVac = false;
                this.nowindex = -1;
                alert("Warning：Gender Imbalance！");
                return;
              }
            }
          }else{
            var male = 0, female = 0;
            var i;
            for(i in this.UpCourts[ke]){
              if(this.UpCourts[ke][i].gender == "Male"){
                male++;
              }else if(this.UpCourts[ke][i].gender == "Female"){
                female++;
              }
            }
            if(male == 1){
              if(first.gender == this.MemberQueue[index].gender){
                this.isVac = false;
                this.nowindex = -1;
                alert("Warning：Gender Imbalance！");
                return;
              }
            }else if(male == 0){
              if(first.gender == "Male" || this.MemberQueue[index].gender == "Male"){
                this.isVac = false;
                this.nowindex = -1;
                alert("Warning：Gender Imbalance！");
                return;
              }
            }else{
              if(first.gender == "Female" || this.MemberQueue[index].gender == "Female"){
                this.isVac = false;
                this.nowindex = -1;
                alert("Warning：Gender Imbalance！");
                return;
              }
            }
          }
          if(pos != ""){
            if(this.UpCourts[ke].A1.memberId != 0){
              if(pos == 'A'){
                this.UpCourts[ke].A2.chosenBy = 0;
                this.UpCourts[ke].A2.gender = first.gender;
                this.UpCourts[ke].A2.name = first.name;
                this.UpCourts[ke].A2.chose = this.MemberQueue[index].memberId;
                this.UpCourts[ke].A2.point = first.point;
                this.UpCourts[ke].A2.memberId = first.memberId;
                this.UpCourts[ke].A2.courtId = ke[1];
                if(this.UpCourts[ke].B1.memberId != 0){
                  this.UpCourts[ke].B2.chosenBy = first.memberId;
                  this.UpCourts[ke].B2.gender = this.MemberQueue[index].gender;
                  this.UpCourts[ke].B2.name = this.MemberQueue[index].name;
                  this.UpCourts[ke].B2.chose = 0;
                  this.UpCourts[ke].B2.point = this.MemberQueue[index].point;
                  this.UpCourts[ke].B2.memberId = this.MemberQueue[index].memberId;
                  this.UpCourts[ke].B2.courtId = ke[1];
                }else{
                  this.UpCourts[ke].B1.chosenBy = first.memberId;
                  this.UpCourts[ke].B1.gender = this.MemberQueue[index].gender;
                  this.UpCourts[ke].B1.name = this.MemberQueue[index].name;
                  this.UpCourts[ke].B1.chose = 0;
                  this.UpCourts[ke].B1.point = this.MemberQueue[index].point;
                  this.UpCourts[ke].B1.memberId = this.MemberQueue[index].memberId;
                  this.UpCourts[ke].B1.courtId = ke[1];
                }
              }else{
                if(this.UpCourts[ke].B1.memberId != 0){
                  this.UpCourts[ke].B2.chosenBy = 0;
                  this.UpCourts[ke].B2.gender = first.gender;
                  this.UpCourts[ke].B2.name = first.name;
                  this.UpCourts[ke].B2.chose = this.MemberQueue[index].memberId;
                  this.UpCourts[ke].B2.point = first.point;
                  this.UpCourts[ke].B2.memberId = first.memberId;
                  this.UpCourts[ke].B2.courtId = ke[1];
                }else{
                  this.UpCourts[ke].B1.chosenBy = 0;
                  this.UpCourts[ke].B1.gender = first.gender;
                  this.UpCourts[ke].B1.name = first.name;
                  this.UpCourts[ke].B1.chose = this.MemberQueue[index].memberId;
                  this.UpCourts[ke].B1.point = first.point;
                  this.UpCourts[ke].B1.memberId = first.memberId;
                  this.UpCourts[ke].B1.courtId = ke[1];
                }
                this.UpCourts[ke].A2.chosenBy = first.memberId;
                this.UpCourts[ke].A2.gender = this.MemberQueue[index].gender;
                this.UpCourts[ke].A2.name = this.MemberQueue[index].name;
                this.UpCourts[ke].A2.chose = 0;
                this.UpCourts[ke].A2.point = this.MemberQueue[index].point;
                this.UpCourts[ke].A2.memberId = this.MemberQueue[index].memberId;
                this.UpCourts[ke].A2.courtId = ke[1];
              }
            }else{
              if(pos == 'A'){
                this.UpCourts[ke].A1.chosenBy = 0;
                this.UpCourts[ke].A1.gender = first.gender;
                this.UpCourts[ke].A1.name = first.name;
                this.UpCourts[ke].A1.chose = this.MemberQueue[index].memberId;
                this.UpCourts[ke].A1.point = first.point;
                this.UpCourts[ke].A1.memberId = first.memberId;
                this.UpCourts[ke].A1.courtId = ke[1];
                this.UpCourts[ke].B2.chosenBy = first.memberId;
                this.UpCourts[ke].B2.gender = this.MemberQueue[index].gender;
                this.UpCourts[ke].B2.name = this.MemberQueue[index].name;
                this.UpCourts[ke].B2.chose = 0;
                this.UpCourts[ke].B2.point = this.MemberQueue[index].point;
                this.UpCourts[ke].B2.memberId = this.MemberQueue[index].memberId;
                this.UpCourts[ke].B2.courtId = ke[1];
              }else{
                this.UpCourts[ke].B2.chosenBy = 0;
                this.UpCourts[ke].B2.gender = first.gender;
                this.UpCourts[ke].B2.name = first.name;
                this.UpCourts[ke].B2.chose = this.MemberQueue[index].memberId;
                this.UpCourts[ke].B2.point = first.point;
                this.UpCourts[ke].B2.memberId = first.memberId;
                this.UpCourts[ke].B2.courtId = ke[1];
                this.UpCourts[ke].A1.chosenBy = first.memberId;
                this.UpCourts[ke].A1.gender = this.MemberQueue[index].gender;
                this.UpCourts[ke].A1.name = this.MemberQueue[index].name;
                this.UpCourts[ke].A1.chose = 0;
                this.UpCourts[ke].A1.point = this.MemberQueue[index].point;
                this.UpCourts[ke].A1.memberId = this.MemberQueue[index].memberId;
                this.UpCourts[ke].A1.courtId = ke[1];
              }
            }
          }else{
            if(this.UpCourts[ke].A1.memberId != 0){
              this.UpCourts[ke].B1.chosenBy = 0;
              this.UpCourts[ke].B1.gender = first.gender;
              this.UpCourts[ke].B1.name = first.name;
              this.UpCourts[ke].B1.chose = this.MemberQueue[index].memberId;
              this.UpCourts[ke].B1.point = first.point;
              this.UpCourts[ke].B1.memberId = first.memberId;
              this.UpCourts[ke].B1.courtId = ke[1];
              this.UpCourts[ke].B2.chosenBy = first.memberId;
              this.UpCourts[ke].B2.gender = this.MemberQueue[index].gender;
              this.UpCourts[ke].B2.name = this.MemberQueue[index].name;
              this.UpCourts[ke].B2.chose = 0;
              this.UpCourts[ke].B2.point = this.MemberQueue[index].point;
              this.UpCourts[ke].B2.memberId = this.MemberQueue[index].memberId;
              this.UpCourts[ke].B2.courtId = ke[1];
            }else{
              this.UpCourts[ke].A1.chosenBy = 0;
              this.UpCourts[ke].A1.gender = first.gender;
              this.UpCourts[ke].A1.name = first.name;
              this.UpCourts[ke].A1.chose = this.MemberQueue[index].memberId;
              this.UpCourts[ke].A1.point = first.point;
              this.UpCourts[ke].A1.memberId = first.memberId;
              this.UpCourts[ke].A1.courtId = ke[1];
              this.UpCourts[ke].A2.chosenBy = first.memberId;
              this.UpCourts[ke].A2.gender = this.MemberQueue[index].gender;
              this.UpCourts[ke].A2.name = this.MemberQueue[index].name;
              this.UpCourts[ke].A2.chose = 0;
              this.UpCourts[ke].A2.point = this.MemberQueue[index].point;
              this.UpCourts[ke].A2.memberId = this.MemberQueue[index].memberId;
              this.UpCourts[ke].A2.courtId = ke[1];
            }
          }
          this.UpCourts[ke].A2.status = 4;
          this.UpCourts[ke].B1.status = 4;
          this.UpCourts[ke].A1.status = 4;
          this.UpCourts[ke].B2.status = 4;
          this.MemberQueue['M' + this.UpCourts[ke].A1.memberId].status = 4;
          this.MemberQueue['M' + this.UpCourts[ke].A2.memberId].status = 4;
          this.MemberQueue['M' + this.UpCourts[ke].B1.memberId].status = 4;
          this.MemberQueue['M' + this.UpCourts[ke].B2.memberId].status = 4;
          this.UpCourts[ke].total = 4;
          this.MemberQueue[index].courtId = ke[1];
          this.MemberQueue[key].courtId = ke[1];
          this.MemberQueue[key].chose = this.MemberQueue[index].memberId;
          this.MemberQueue[index].chosenBy = first.memberId;
          console.log(1111111111111111);
          console.log(this.UpCourts[ke]);
          console.log(2222222222222222);
          this.isVac = false;
          this.nowindex = -1;
          this.MemberQueue = this.sortObj(1, this.MemberQueue);
          for (key in this.MemberQueue) {
            first = key;
            break;
          }
          if(this.MemberQueue[first].status == 2){
            this.MemberQueue[first].status = 1;
          }
          this.checkSta1();
          this.UpCourts = this.sortObj(2, this.UpCourts);
          for (key in this.UpCourts) {
            first = key;
            break;
          }
          this.TakeSnapshot();
          this.goGame("G0");
        },
        selected (pos, index) {
          this.close();
          var item;
          var first;
          var key;
          for (key in this.MemberQueue) {
            first = this.MemberQueue[key];
            break;
          }
          item = this.MemberQueue[index];
          if(item.courtId == 0){
            this.upInitial();
            this.UpCourts['U' + this.Upcoming.Total].A1.chosenBy = 0;
            this.UpCourts['U' + this.Upcoming.Total].A1.gender = first.gender;
            this.UpCourts['U' + this.Upcoming.Total].A1.name = first.name;
            this.UpCourts['U' + this.Upcoming.Total].A1.chose = this.MemberQueue[index].memberId;
            this.UpCourts['U' + this.Upcoming.Total].A1.point = first.point;
            this.UpCourts['U' + this.Upcoming.Total].A1.memberId = first.memberId;
            this.UpCourts['U' + this.Upcoming.Total].A1.courtId = this.Upcoming.Total;
            this.UpCourts['U' + this.Upcoming.Total][pos].chosenBy = first.memberId;
            this.UpCourts['U' + this.Upcoming.Total][pos].gender = this.MemberQueue[index].gender;
            this.UpCourts['U' + this.Upcoming.Total][pos].name = this.MemberQueue[index].name;
            this.UpCourts['U' + this.Upcoming.Total][pos].chose = 0;
            this.UpCourts['U' + this.Upcoming.Total][pos].point = this.MemberQueue[index].point;
            this.UpCourts['U' + this.Upcoming.Total][pos].memberId = this.MemberQueue[index].memberId;
            this.UpCourts['U' + this.Upcoming.Total][pos].courtId = this.Upcoming.Total;
            this.UpCourts['U' + this.Upcoming.Total][pos].status = 3;
            this.UpCourts['U' + this.Upcoming.Total].A1.status = 3;
            this.UpCourts['U' + this.Upcoming.Total].total = 2;
            this.MemberQueue[key].status = 3;
            this.MemberQueue[index].status = 3;
            this.MemberQueue[index].courtId = this.Upcoming.Total;
            this.MemberQueue[key].courtId = this.Upcoming.Total;
            this.MemberQueue[key].chose = this.MemberQueue[index].memberId;
            this.MemberQueue[index].chosenBy = this.MemberQueue[key].memberId;
          }else if(item.status == 4 || item.status == 5){
            this.MemberQueue[index].pos = pos;
            this.MemberQueue[key].pos = "A1";
            this.MemberQueue[index].status = item.status == 4 ? 7 : 8;
            this.MemberQueue[key].status = 6;
            this.MemberQueue[key].chose = this.MemberQueue[index].memberId;
            this.MemberQueue[index].chosenBy = this.MemberQueue[key].memberId;
            var id = this.MemberQueue[index].memberId;
            var it;
            if(item.status == 4){
              for(it in this.UpCourts['U' + this.MemberQueue[index].courtId]){
                if(this.UpCourts['U' + this.MemberQueue[index].courtId][it].memberId == id){
                  break;
                }
              }
              this.UpCourts['U' + this.MemberQueue[index].courtId][it].status = 7;
            }else{
              console.log(222);
              console.log(id);
              console.log(this.OnCourts['G' + this.MemberQueue[index].courtId]);
              for(it in this.OnCourts['G' + this.MemberQueue[index].courtId]){
                if(this.OnCourts['G' + this.MemberQueue[index].courtId][it].memberId == id){
                  break;
                }
              }
              console.log(it);
              this.OnCourts['G' + this.MemberQueue[index].courtId][it].status = 8;
            }
          }else{
            if(!this.checkGender(item, first)){
              alert("Warning：Gender Imbalance！");
              return;
            }
            this.MemberQueue[key].courtId = item.courtId;
            this.MemberQueue[key].chose = this.MemberQueue[index].memberId;
            this.MemberQueue[index].chosenBy = this.MemberQueue[key].memberId;
            this.UpCourts['U' + item.courtId][pos].chosenBy = 0;
            this.UpCourts['U' + item.courtId][pos].gender = first.gender;
            this.UpCourts['U' + item.courtId][pos].name = first.name;
            this.UpCourts['U' + item.courtId][pos].chose = this.MemberQueue[index].memberId;
            this.UpCourts['U' + item.courtId][pos].point = first.point;
            this.UpCourts['U' + item.courtId][pos].memberId = first.memberId;
            this.UpCourts['U' + item.courtId][pos].courtId = item.courtId;
            this.UpCourts['U' + item.courtId].total++;
            if(this.UpCourts['U' + item.courtId].total == 4){
              this.UpCourts['U' + item.courtId].A1.status = 4;
              this.UpCourts['U' + item.courtId].A2.status = 4;
              this.UpCourts['U' + item.courtId].B1.status = 4;
              this.UpCourts['U' + item.courtId].B2.status = 4;
              this.MemberQueue['M' + this.UpCourts['U' + item.courtId].A1.memberId].status = 4;
              this.MemberQueue['M' + this.UpCourts['U' + item.courtId].A2.memberId].status = 4;
              this.MemberQueue['M' + this.UpCourts['U' + item.courtId].B1.memberId].status = 4;
              this.MemberQueue['M' + this.UpCourts['U' + item.courtId].B2.memberId].status = 4;
            }else {
              this.UpCourts['U' + item.courtId][pos].status = 3;
              this.MemberQueue[key].status = 3;
            }
          }
          this.MemberQueue = this.sortObj(1, this.MemberQueue);
          for (key in this.MemberQueue) {
            first = key;
            break;
          }
          if(this.MemberQueue[first].status == 2){
            this.MemberQueue[first].status = 1;
          }
          this.checkSta1();
          this.UpCourts = this.sortObj(2, this.UpCourts);
          for (key in this.UpCourts) {
            first = key;
            break;
          }
          this.TakeSnapshot();
          this.goGame("G0");
        },
        checkSta1 () {
          var key;
          var flag = false;
          for (key in this.MemberQueue) {
            if(this.MemberQueue[key].status == 1){
              flag = true;
              break;
            }
          }
          if(flag){
            this.sta1 = 1;
          }else{
            this.sta1 = 0;
          }
          console.log(this.sta1);
        },
        upInitial () {
          this.Upcoming.Total++;
          this.UpCourts['U' + this.Upcoming.Total] = {};
          this.upInit("A1");
          this.upInit("A2");
          this.upInit("B1");
          this.upInit("B2");
          this.UpCourts['U' + this.Upcoming.Total].total = 0;
          this.UpCourts['U' + this.Upcoming.Total].courtId = this.Upcoming.Total;
        },
        upInit (pos) {
          this.UpCourts['U' + this.Upcoming.Total][pos] = {};
          this.UpCourts['U' + this.Upcoming.Total][pos]["gender"] = "";
          this.UpCourts['U' + this.Upcoming.Total][pos]["name"] = "";
          this.UpCourts['U' + this.Upcoming.Total][pos]["chose"] = 0;
          this.UpCourts['U' + this.Upcoming.Total][pos]["point"] = 0;
          this.UpCourts['U' + this.Upcoming.Total][pos]["memberId"] = 0;
          this.UpCourts['U' + this.Upcoming.Total][pos]["courtId"] = 0;
          this.UpCourts['U' + this.Upcoming.Total][pos]["chosenBy"] = 0;
          this.UpCourts['U' + this.Upcoming.Total][pos]["status"] = 0;
        },
        goGame (index) {
          var key, first, cid;
          for (key in this.UpCourts) {
            first = key;
            break;
          }
          while(this.UpCourts[first] && this.UpCourts[first].total == 4 && this.left > 0){
            if(index == "G0"){
              for (key in this.OnCourts) {
                if(this.OnCourts[key].left > 0){
                  cid = key[1];
                  this.onGame(first, key, "A1");
                  this.onGame(first, key, "A2");
                  this.onGame(first, key, "B1");
                  this.onGame(first, key, "B2");
                  this.OnCourts[key].left--;
                  break;
                }
              }
            }else{
              cid = index[1];
              this.onGame(first, index, "A1");
              this.onGame(first, index, "A2");
              this.onGame(first, index, "B1");
              this.onGame(first, index, "B2");
              this.OnCourts[index].left--;
            }
            this.left--;
            delete this.UpCourts[first];
            this.MemberQueue = this.sortObj(1, this.MemberQueue);
            for (key in this.MemberQueue) {
              first = key;
              break;
            }
            if(this.MemberQueue[first].status == 2){
              this.MemberQueue[first].status = 1;
            }
            this.checkSta1();
            this.UpCourts = this.sortObj(2, this.UpCourts);
            for (key in this.UpCourts) {
              first = key;
              break;
            }
            this.hint = "NEXT GAME " + this.OnCourts['G' + cid]['A1'].name + "," + this.OnCourts['G' + cid]['A2'].name + "VS" + this.OnCourts['G' + cid]['B1'].name + "," + this.OnCourts['G' + cid]['B2'].name + " AT COURT " + cid;
            this.showHint = true;
            setTimeout(() => {
              this.showHint = false;
              this.hint = "";
            }, 5000);
            this.TakeSnapshot();
            var para = "eventId=" + this.eventId + "&courtId=" + cid + "&playerA1=" + this.OnCourts['G' + cid]['A1'].memberId + "&playerA2=" + this.OnCourts['G' + cid]['A2'].memberId + "&playerB1=" + this.OnCourts['G' + cid]['B1'].memberId + "&playerB2=" + this.OnCourts['G' + cid]['B2'].memberId;
            console.log(para);
            var _this = this;
            this.$axios.post("/api/SaveGame", para).then(function (response) {
              console.log(response);
              _this.OnCourts['G' + cid].gameId = response.data;
            }).catch(function (error) {
              console.log(error);
            });
          }
        },
        onGame (uk, ok, pos) {
          this.OnCourts[ok][pos].gender = this.UpCourts[uk][pos].gender;
          this.OnCourts[ok][pos].name = this.UpCourts[uk][pos].name;
          this.OnCourts[ok][pos].chose = this.UpCourts[uk][pos].chose;
          this.OnCourts[ok][pos].point = this.UpCourts[uk][pos].point;
          this.OnCourts[ok][pos].memberId = this.UpCourts[uk][pos].memberId;
          this.OnCourts[ok][pos].chosenBy = this.UpCourts[uk][pos].chosenBy;
          this.OnCourts[ok][pos].status = this.UpCourts[uk][pos].status == 4 ? 5 : 8;
          this.MemberQueue["M" + this.OnCourts[ok][pos].memberId].status = this.UpCourts[uk][pos].status == 4 ? 5 : 8;
          this.MemberQueue["M" + this.OnCourts[ok][pos].memberId].courtId = this.OnCourts[ok].courtId;
        },
        clear (index, pos) {
          if(this.OnCourts[index][pos].status == 8){
            console.log(111);
            this.MemberQueue["M" + this.OnCourts[index][pos].memberId].status = 3;
            console.log(this.OnCourts[index][pos].memberId);
            console.log(this.MemberQueue["M" + this.OnCourts[index][pos].memberId].chosenBy);
            this.MemberQueue["M" + this.MemberQueue["M" + this.OnCourts[index][pos].memberId].chosenBy].status = 3;
            var first = this.MemberQueue["M" + this.MemberQueue["M" + this.OnCourts[index][pos].memberId].chosenBy];
            var pos1 = this.MemberQueue["M" + this.OnCourts[index][pos].memberId].pos;
            this.upInitial();
            this.UpCourts['U' + this.Upcoming.Total].A1.chosenBy = 0;
            this.UpCourts['U' + this.Upcoming.Total].A1.gender = first.gender;
            this.UpCourts['U' + this.Upcoming.Total].A1.name = first.name;
            this.UpCourts['U' + this.Upcoming.Total].A1.chose = this.OnCourts[index][pos].memberId;
            this.UpCourts['U' + this.Upcoming.Total].A1.point = first.point;
            this.UpCourts['U' + this.Upcoming.Total].A1.memberId = first.memberId;
            this.UpCourts['U' + this.Upcoming.Total].A1.courtId = this.Upcoming.Total;
            this.UpCourts['U' + this.Upcoming.Total][pos1].chosenBy = first.memberId;
            this.UpCourts['U' + this.Upcoming.Total][pos1].gender = this.OnCourts[index][pos].gender;
            this.UpCourts['U' + this.Upcoming.Total][pos1].name = this.OnCourts[index][pos].name;
            this.UpCourts['U' + this.Upcoming.Total][pos1].chose = 0;
            this.UpCourts['U' + this.Upcoming.Total][pos1].point = this.OnCourts[index][pos].point;
            this.UpCourts['U' + this.Upcoming.Total][pos1].memberId = this.OnCourts[index][pos].memberId;
            this.UpCourts['U' + this.Upcoming.Total][pos1].courtId = this.Upcoming.Total;
            this.UpCourts['U' + this.Upcoming.Total].A1.status = 3;
            this.UpCourts['U' + this.Upcoming.Total][pos1].status = 3;
            this.UpCourts['U' + this.Upcoming.Total].total = 2;
            this.MemberQueue["M" + this.MemberQueue["M" + this.OnCourts[index][pos].memberId].chosenBy].courtId = this.Upcoming.Total;
            this.MemberQueue["M" + this.OnCourts[index][pos].memberId].courtId = this.Upcoming.Total;
          }else{
            this.MemberQueue["M" + this.OnCourts[index][pos].memberId].status = 2;
            this.MemberQueue["M" + this.OnCourts[index][pos].memberId].courtId = 0;
            this.MemberQueue["M" + this.OnCourts[index][pos].memberId].chose = 0;
            this.MemberQueue["M" + this.OnCourts[index][pos].memberId].chosenBy = 0;
          }
          this.OnCourts[index][pos].gender = "";
          this.OnCourts[index][pos].name = "";
          this.OnCourts[index][pos].chose = 0;
          this.OnCourts[index][pos].point = 0;
          this.OnCourts[index][pos].memberId = 0;
          this.OnCourts[index][pos].courtId = 0;
          this.OnCourts[index][pos].chosenBy = 0;
          this.OnCourts[index][pos].status = 0;
        },
        goFinish () {
          var first, key;
          var index = this.finishIndex;
          this.goHistory(index);
          this.clear(index, "A1");
          this.clear(index, "A2");
          this.clear(index, "B1");
          this.clear(index, "B2");
          this.OnCourts[index].left++;
          this.left++;
          this.MemberQueue = this.sortObj(1, this.MemberQueue);
          for (key in this.MemberQueue) {
            first = key;
            break;
          }
          if(this.MemberQueue[first].status == 2){
            this.MemberQueue[first].status = 1;
          }
          this.checkSta1();
          this.goGame(index);
          this.finishIndex = "G0";
          var para = "eventId=" + this.eventId + "&gameId=" + this.OnCourts[index].gameId + "&scoreA=" + this.aScore + "&scoreB=" + this.bScore;
          console.log(para);
          this.$axios.post("/api/FinishGame", para).then(function (response) {
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          });
          this.aScore = 0;
          this.bScore = 0;
          this.TakeSnapshot();
        },
        goHistory (index) {
          var history = {};
          var arr = ['A1', 'A2', 'B1', 'B2'];
          var i;
          for(i = 0; i < arr.length; i++){
            var c = {};
            c['memberId'] = this.OnCourts[index][arr[i]].memberId;
            c['name'] = this.OnCourts[index][arr[i]].name;
            c['gender'] = this.OnCourts[index][arr[i]].gender;
            c['point'] = this.OnCourts[index][arr[i]].point;
            history[arr[i]] = c;
          }
          history['courtId'] = this.OnCourts[index].courtId;
          history['aScore'] = this.aScore;
          history['bScore'] = this.bScore;
          this.History.push(history);
          console.log(JSON.stringify(this.MemberQueue));
          console.log(JSON.stringify(this.UpCourts));
          console.log(JSON.stringify(this.OnCourts));
          console.log(JSON.stringify(this.History));
          console.log(JSON.stringify(this.load));
        },
        TakeSnapshot() {
          this.load.Upcoming = this.Upcoming;
          this.load.Upcoming.UpCourts = this.UpCourts;
          this.load.MemberQueue.Queue = this.MemberQueue;
          this.load.History = this.History;
          this.load.Games.left = this.left;
          this.load.Games.OnCourts = this.OnCourts;
          var para = JSON.stringify(this.load);
          console.log(para);
          // console.log(para);
          this.$axios.post("/api/TakeSnapshot", "eventId=" + this.eventId + "&data=" + para).then(function (response) {
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          });
        }
      }
    }
</script>

<style scoped lang="less">
  @px2rem: 144rem;
  .main {
    margin-top: 30/@px2rem;
    margin-left: 30/@px2rem;
    margin-right: 30/@px2rem;
    height: 100%;
  }
  .finishModal {
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
  .notice {
    position: fixed;
    width: 500/@px2rem;
    height: 200/@px2rem;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-color: #fff;
    border: solid 1px #dcdee2;
    border-radius: 10/@px2rem;
    .nhead {
      position: relative;
      height: 52/@px2rem;
      border-bottom: solid 2/@px2rem #dcdee2;
      padding-left: 12/@px2rem;
      padding-bottom: 8/@px2rem;
      padding-top: 8/@px2rem;
      font-size: 20/@px2rem;
      color: #5cadff;
      font-weight: 500;
      img {
        position: absolute;
        width: 32/@px2rem;
      }
      .title {
        position: absolute;
        left: 48/@px2rem;
        top: 10/@px2rem
      }
    }
    .ncontent {
      padding: 20/@px2rem;
      text-align: center;
      font-size: 24/@px2rem;
      font-weight: 500;
    }
  }
  .mainrow {
    height: 100%;
  }
  .left, .mid, .right {
    height: 100%;
  }
  .cHead {
    height: 20px;
    line-height: 20px;
    position: relative;
    padding-left: 24/@px2rem;
    img {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      width: 20/@px2rem;
    }
  }

  .upitem, .gameitem, .historyitem {
    border: solid 1px #dcdee2;
    border-radius: 2/@px2rem;
    text-align: center;
    font-size: 16/@px2rem;
    color: #fff;
    height: 80/@px2rem;
    background-color: #f8f8f9;
    box-sizing: content-box;
    margin-bottom: 10/@px2rem;
    .vs {
      font-weight: 500;
      color: #000;
      line-height: 80/@px2rem;
    }
    .A1, .B1, .A2, .B2 {
      background-color: #19be6b;
      line-height: 40/@px2rem;
    }
    .A1M, .B1M, .A2M, .B2M {
      background-color: #ff9900;
      color: #5cadff;
      line-height: 40/@px2rem;
      img {
        width: 16/@px2rem;
      }
    }
    .A1F, .B1F, .A2F, .B2F {
      background-color: #ff9900;
      color: #ed4014;
      line-height: 40/@px2rem;
      img {
        width: 16/@px2rem;
      }
    }
    .A1, .B1, .A1F, .B1F, .A1M, .B1M {
      border-bottom: solid 1/@px2rem #f8f8f9;
      line-height: 39/@px2rem;
    }
  }

  .upcoming {
    .halfcontent {
      height: 285/@px2rem;
      overflow: auto;
      .upitem {
        .index {
          font-weight: 500;
          color: #000;
          line-height: 80/@px2rem;
        }
      }
    }
  }

  .playing {
    .content {
      height: 600/@px2rem;
      overflow: auto;
      .gamecard {
        margin-bottom: 20/@px2rem;
        .gameitem {
          margin-bottom: 0;
        }
        .cHead {
          height: 25px;
          line-height: 25px;
          .finishBtn {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
          }
        }
      }
    }
  }

  .history {
    margin-top: 30/@px2rem;
    .halfcontent {
      height: 200/@px2rem;
      overflow: auto;
      .historyitem {
        .A1F, .B1F, .A2F, .B2F, .A1M, .B1M, .A2M, .B2M, .A1, .B1, .A2, .B2 {
          background-color: #f8f8f9;
        }
        .A1, .B1, .A1F, .B1F, .A1M, .B1M {
          border-bottom: solid 1/@px2rem #dcdee2;
        }
        .vs {
          border-left: solid 1/@px2rem #dcdee2;
          border-right: solid 1/@px2rem #dcdee2;
        }
      }
    }
  }
  .players {
    .content {
      height: 600/@px2rem;
      overflow: auto;
      .tablewrapper {
        border: solid 1px #dcdee2;
        border-radius: 2/@px2rem;
        .tablehead {
          text-align: center;
          font-weight: 500;
          padding-top: 10/@px2rem;
          padding-bottom: 10/@px2rem;
          border-bottom: solid 1px #dcdee2;
          background-color: #f8f8f9;
        }
        .tableitem {
          text-align: center;
          padding-top: 10/@px2rem;
          padding-bottom: 10/@px2rem;
          border-bottom: solid 1px #dcdee2;
          .gender {
            img {
              width: 16/@px2rem;
            }
          }
          .action {
            position: relative;
            .choice {
              .mask {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 999;
              }
              .chosecontent {
                position: absolute;
                width: 200/@px2rem;
                height: 120/@px2rem;
                bottom: 0;
                right: 50/@px2rem;
                z-index: 1001;
                background-color: #f8f8f9;
                border: solid 1px #dcdee2;
                border-radius: 4/@px2rem;
                font-size: 12/@px2rem;
                overflow: auto;
                .pos2,
                .pos22 {
                  border-bottom: solid 1px #e8eaec;
                  padding: 5/@px2rem;
                  cursor: pointer;
                }
                .pos22 {
                  border-bottom: solid 4px #e8eaec;
                }
              }
              .content {
                position: absolute;
                width: 180/@px2rem;
                height: 100/@px2rem;
                bottom: 0;
                right: 50/@px2rem;
                background-color: #19be6b;
                z-index: 1000;
                text-align: center;
                color: #fff;
                font-size: 12/@px2rem;
                .A1, .A11 {
                  line-height: 50/@px2rem;
                  border-bottom: solid 1px #fff;
                }
                .B1, .B11 {
                  line-height: 50/@px2rem;
                  border-bottom: solid 1px #fff;
                }
                .A2, .B2, .A22, .B22 {
                  line-height: 50/@px2rem;
                }
                .vs {
                  line-height: 100/@px2rem;
                  font-weight: 500;
                  border-right: solid 1px #fff;
                  border-left: solid 1px #fff;
                }
                .A11, .A22, .B11, .B22 {
                  cursor: pointer;
                }
                .A1, .A2, .B1, .B2 {
                  background-color: #ff9900;
                }
                .Fe {
                  color: #ed4014;
                }
                .Ma {
                  color: #5cadff;
                }
              }
            }
            .sign {
              width: 16/@px2rem;
              cursor: pointer;
            }
            .signed {
              width: 16/@px2rem;
            }
            .select {
              cursor: pointer;
              width: 16/@px2rem;
              margin-left: 7/@px2rem;
            }
            .selection {
               width: 16/@px2rem;
               margin-left: 7/@px2rem;
             }
            .noselect {
              width: 16/@px2rem;
              margin-left: 7/@px2rem;
            }
          }
        }
        .noborder {
          border-bottom: none;
        }
      }
    }
  }
  li {
    list-style: none;
  }
</style>
