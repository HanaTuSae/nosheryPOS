<template>
  <div class="left-Nav">
    <ul>
      <li>
        <i class="iconfont icon-hanbao">
        </i>
        <div>
          商品
        </div>
      </li>
      <li>
        <i class="iconfont icon-dianpu">
        </i>
        <div>
          店铺
        </div>
      </li>
      <li>
        <i class="iconfont icon-goumai">
        </i>
        <div>
          收银
        </div>
      </li>
      <li>
        <i class="iconfont icon-huiyuanqia">
        </i>
        <div>
          会员
        </div>
      </li>
      <li>
        <i class="iconfont icon-zuanshi">
        </i>
        <div>
          统计
        </div>
      </li>
      <li>
        <i class="iconfont icon-gongnengjianyi">
        </i>
        <div>
          设置
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'LeftNav',
  data () {
    return {}
  }
}

</script>
<style type="text/css" lang="scss" scoped>
.left-Nav {
  color: #fff;
  font-size: 10px;
  height: 100%;
  background-color: #1D8ce0;
  float: left;
  width: 5%;
  ul {
    padding: 0px;
    margin: 0px;
    li {
      list-style: none;
      text-align: center;
      border-bottom: 1px solid #20a0ff;
      padding: 10px;
    }
  }
}

.iconfont {
  font-size: 24px;
}

</style>
