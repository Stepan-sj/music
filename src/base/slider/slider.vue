<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			 <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
		</div>
	</div>
</template>

<script>
import BScroll from "better-scroll";
import { addClass } from "../../commons/js/dom";
export default {
  name: "slider",
  created() {
    console.log(1);
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  mounted() {
    console.log(2);
    this._setSliderWidth();
    this._initDots();
    this._initSliderWidth();
  },
  methods: {
    _setSliderWidth() {
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
      let slideWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");
        child.style.width = slideWidth + "px";
        width += slideWidth;
      }
      if (this.loop) {
        width += 2 * slideWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initSliderWidth() {
      this.slide = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        bounce: false,
        stopPropagation: true,
        click: true
      });
      this.slide.on("scrollEnd", this._onScrollEnd);

      this.slide.on("touchEnd", () => {
        if (this.autoPlay) {
          this._play();
        }
      });
      this.slide.on("beforeScrollStart", () => {
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
    },
    _onScrollEnd() {
      let pageIndex = this.slide.getCurrentPage().pageX;
      this.currentPageIndex = pageIndex;
      if (this.autoPlay) {
        this._play();
      }
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _play() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slide.next();
      }, this.interval);
    }
  },

  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    showDot: {
      type: Boolean,
      default: true
    },
    click: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0.3
    },
    speed: {
      type: Number,
      default: 400
    }
  }
};
</script>

<style scoped lang='stylus'>
@import '../../commons/stylus/variable';

.slider {
	min-height: 1px;

	.slider-group {
		position: relative;
		overflow: hidden;
		white-space: nowrap;

		.slider-item {
			float: left;
			box-sizing: border-box;
			overflow: hidden;
			text-align: center;

			a {
				display: block;
				width: 100%;
				overflow: hidden;
				text-decoration: none;

				img {
					display: block;
					width: 100%;
				}
			}
		}
	}

	.dots {
		position: absolute;
		right: 0;
		left: 0;
		bottom: 12px;
		text-align: center;
		font-size: 0;

		.dot {
			display: inline-block;
			margin: 0 4px;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: $color-text-l;

			&.active {
				width: 20px;
				border-radius: 5px;
				background: $color-text-ll;
			}
		}
	}
}
</style>