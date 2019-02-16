<template>
  <Scroll
    class="listview"
    ref="listview"
    @scroll="scroll"
    :listenScroll="listenScroll"
    :probeType="probeType"
  >
    <ul>
      <li v-for="group in data" class="list-group" :key="group.id" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" @click="selectItem(item)" :key="item.id" class="list-group-item">
            <img :src="item.avatar" class="avatar" alt>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchmove.stop="onShortcutTouchMove"
      @touchstart="onShortcutTouchStart"
    >
      <ul>
        <li
          v-for="(item,index) in shortcutList"
          :key="item.id"
          class="item"
          :class="{'current':currentIndex===index}"
          :data-index="index"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-if="scrollY<=0" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </Scroll>
</template>

<script>
import Scroll from "../../base/scroll/scroll";
import Loading from "../../base/loading/loading";
import { getData } from "../../commons/js/dom";

export default {
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    diff(newVal) {
      let fixedTop = newVal > 0 && newVal < 30 ? newVal - 30 : 0;
      this.fixedTop = fixedTop;
      if (this.$refs.fixed) {
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
      }
    }
  },
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: 0,
      diff: -1
    };
  },
  created() {
    this.startY = {};
    this.listenScroll = true;
    this.listHeight = [];
    this.probeType = 3;
  },
  computed: {
    shortcutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1);
      });
    },
    fixedTitle() {
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : "";
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      // console.log(e.target.innerHTML)
      let index = getData(e.target, "index");
      // this.currentIndex = index;
      this.startY.pageY = e.touches[0].pageY;
      this.startY.index = index;
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index]);
    },
    onShortcutTouchMove(e) {
      let moveY = e.touches[0].pageY;
      let delIndex = Math.floor((moveY - this.startY.pageY) / 18);
      // console.log(delIndex+this.startY.index)
      this.$refs.listview.scrollToElement(
        this.$refs.listGroup[delIndex + parseInt(this.startY.index)]
      );
    },
    scroll(pos) {
      this.scrollY = pos.y;
      let scrollY = -pos.y;
      for (var i = 0; i < this.listHeight.length; i++) {
        let prev = this.listHeight[i];
        let next = this.listHeight[i + 1];
        if (scrollY == prev) {
          this.currentIndex = i;
          return;
        }
        if (scrollY > prev && scrollY < next) {
          this.currentIndex = i;
          this.diff = next - scrollY;
          return;
        }
        if (i == this.listHeight.length) {
          this.currentIndex = i;
          return;
        }
      }
    },
    _calculateHeight() {
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height = item.clientHeight + height;
        this.listHeight.push(height);
      }
    },
    selectItem(item){
      this.$emit('select',item);
    }
  },
  components: {
    Scroll,
    Loading
  }
};
</script>

<style scoped lang="stylus">
@import '../../commons/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>


