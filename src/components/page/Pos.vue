<template>
  <div class="pos">
    <el-row>
      <el-col :span='7' id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData" border style="width:100%" max-height="500" show-summary :summary-method="getSummaries">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="60"></el-table-column>
              <el-table-column prop="price" label="单价" width="80"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delOrderList(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="div-btn">
              <el-button type="warning" size="small">挂单</el-button>
              <el-button type="danger" size="small" @click="delAllGoods">删除</el-button>
              <el-button type="success" size="small" @click="checkOut">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">
            挂单
          </el-tab-pane>
          <el-tab-pane label="外卖">
            外卖
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span='17'>
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-good-list">
            <ul>
              <li v-for="good in oftenGoodsData" :key="good.goodsId" @click="addOrderList(good)">
                <span>{{good.goodsName}}</span>
                <span class="good-price">￥{{good.price}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <ul class="goods-list">
                <li v-for="good in goods0Data" :key="good.goodsId" @click="addOrderList(good)">
                  <span class="good-img"><img :src=good.goodsImg width="100%"></span>
                  <span class="good-name">{{good.goodsName}}</span>
                  <span class="good-price">￥{{good.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <ul class="goods-list">
                <li v-for="good in goods1Data" :key="good.goodsId" @click="addOrderList(good)">
                  <span class="good-img"><img :src=good.goodsImg width="100%"></span>
                  <span class="good-name">{{good.goodsName}}</span>
                  <span class="good-price">￥{{good.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <ul class="goods-list">
                <li v-for="good in goods2Data" :key="good.goodsId" @click="addOrderList(good)">
                  <span class="good-img"><img :src=good.goodsImg width="100%"></span>
                  <span class="good-name">{{good.goodsName}}</span>
                  <span class="good-price">￥{{good.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <ul class="goods-list">
                <li v-for="good in goods3Data" :key="good.goodsId" @click="addOrderList(good)">
                  <span class="good-img"><img :src=good.goodsImg width="100%"></span>
                  <span class="good-name">{{good.goodsName}}</span>
                  <span class="good-price">￥{{good.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'Pos',
  data () {
    return {
      tableData: [],
      oftenGoodsData: [],
      goods0Data: [],
      goods1Data: [],
      goods2Data: [],
      goods3Data: []
    }
  },
  created () {
    // 读取常用商品列表
    this.axios.get('http://jspang.com/DemoApi/oftenGoods.php')
      .then(response => {
        // console.log(response)
        this.oftenGoodsData = response.data
      })
      .catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    // 读取分类商品列表
    this.axios.get('/api/goodsData')
      .then(
        response => {
          // console.log(response)
          this.goods0Data = response.data[0]
          this.goods1Data = response.data[1]
          this.goods2Data = response.data[2]
          this.goods3Data = response.data[3]
        })
      .catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        })
  },
  mounted () {
    var orderHeight = document.body.clientHeight
    document.getElementById('order-list').style.height = orderHeight - 1 + 'px'
  },
  methods: {
    // 添加订单列表
    addOrderList (goods) {
      let isHave = false
      // 判断商品是否在订单列表里
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true
        }
      }
      // 如果存在则数量+1
      if (isHave) {
        let arr = this.tableData.filter(order => order.goodsId === goods.goodsId)
        arr[0].count++
      } else {
        // 如果不存在则添加商品
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        }
        this.tableData.push(newGoods)
      }
    },
    // 删除单个商品
    delOrderList (goods) {
      this.tableData = this.tableData.filter(order => order.goodsId !== goods.goodsId)
    },
    // 删除整个订单
    delAllGoods () {
      this.tableData = []
    },
    // 订单数量和价格汇总
    getSummaries (param) {
      let { columns, data } = param
      let sums = []
      columns.forEach((column, index) => {
        let totalNum = 0
        let totalPrice = 0
        data.forEach(good => {
          totalNum = totalNum + good.count
          totalPrice = totalPrice + (good.count * good.price)
        })
        if (index === 0) {
          sums[index] = '合计'
          // return
        } else if (index === 1) {
          sums[index] = totalNum
        } else if (index === 2) {
          sums[index] = totalPrice + ' 元'
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    // 结账
    checkOut () {
      if (this.tableData.length !== 0) {
        this.tableData = []
        this.$message({
          message: '结账成功，感谢你又为店里出了一份力!',
          type: 'success'
        })
      } else {
        this.$message.error('不能空结,老板了解你急切的心情！')
      }
    }
  }
}

</script>
<style type="text/css" lang="scss" scoped>
.pos {
  width: 100%;
  height: 100%;
  .often-goods {
    height: 20px;
    padding: 10px;
    border-bottom: 1px solid #D3DCE6;
    background-color: #F9FAFC;
    .title {
      text-align: left; // font-size: 18px;
    }
    .often-good-list {
      li {
        float: left;
        list-style: none;
        border: 1px solid #E5E9F2;
        padding: 10px;
        margin: 5px;
        background-color: #fff;
        cursor: pointer;
        .good-price {
          color: #58B7FF;
        }
      }
    }
  }
  .goods-type {
    clear: both;
    li {
      list-style: none;
      width: 23%;
      border: 1px solid #E5E9F2;
      height: auto;
      overflow: hidden;
      background-color: #fff;
      padding: 2px;
      float: left;
      margin: 2px;
      cursor: pointer;
      span {
        float: left;
        display: block;
      }
      .good-img {
        width: 40%;
      }
      .good-name {
        font-size: 18px;
        padding-left: 10px;
        color: brown;
      }
      .good-price {
        font-size: 16px;
        padding-left: 10px;
        padding-top: 10px;
      }
    }
  }
}

#order-list {
  border-right: 1px solid #C0CCDA;
  background-color: #F9FAFC;
}

.div-btn {
  margin-top: 10px;
}

</style>
