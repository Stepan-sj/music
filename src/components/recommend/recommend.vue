<template>
  <div class="recommend">
    <Scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <Slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="fresh" :src="item.picUrl" alt>
              </a>
            </div>
          </Slider>
        </div>
        <h1 class="list-title">热门歌单推荐</h1>
        <Loading v-show="discList.length == 0"></Loading>
        <div class="recommend-list">
          <div class="item" v-for="item in discList" :key="item.id">
            <div class="playCount">{{(item.playCount/1000).toFixed(1)}}万</div>
            <div class="icon">
              <img v-lazy="item.picUrl" alt>
            </div>
            <div class="text">{{item.name}}</div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from "../../base/scroll/scroll";
import Slider from "../../base/slider/slider";
import Loading from '../../base/loading/loading';
import { getRecommend, getDiscList } from "../../api/recommend";
import { ERR_OK } from "../../api/config";
export default {
  data() {
    return {
      recommends: [],
      discList: []
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
    console.log("组件recommend created");
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList()
        .then(res => {
          if (res.status === 200) {
            this.discList = res.data.result;
            console.log(this.discList);
          }
        })
        .catch(err => {
          alert(err.toString());
        });
    },
    fresh() {
       this.$refs.scroll.refresh();
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
};
</script>

<style scoped lang='stylus'>
@import '../../commons/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .list-title {
      height: 65px;
      text-align: center;
      line-height: 65px;
      font-size: $font-size-medium;
      color: $color-theme;
    }

    .recommend-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .item {
        width: 33%;
        padding: 0 1%;
        position: relative;
        box-sizing: border-box;

        .playCount {
          position: absolute;
          right: 10px;
          font-size: $font-size-small;
        }

        .icon {
          img {
            width: 100%;
            border-radius: 3px;
          }
        }

        .text {
          margin-top: 5px;
          font-size: $font-size-small;
          height: 40px;
          line-height: 16px;
        }
      }
    }
  }
}

.loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: tranlateY(-50%);
}
</style>