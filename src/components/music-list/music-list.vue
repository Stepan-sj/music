<template>
    <div class="music-list">
        <div class="back" @click='back'>
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref='img'>
            <div class="play-wrapper" ref='btn'>
                <div class="play">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref='filter'></div>
        </div>
        <div class="layer" ref='layer'></div>
        <scroll class='list' ref='list' :probeType='probeType' @scroll='scroll' :listenScroll='true'>
            <div class="song-list-wrapper">
                <song-list @select='selectItem' :songList='songList'></song-list>
            </div>
        </scroll>
    </div>
    
</template>

<script>
import Scroll from "../../base/scroll/scroll";
import songList from "../../base/song-list/song-list";
import {mapActions} from "vuex"
export default {
    props:{
        bgImage:{
            type:String,
            default:""
        },
        songList:{
            type:Array,
            default: ()=> []
        },
        title:{
            type:String,
            default:""
        }
    },
    created(){
        this.probeType=3
    },
    data(){
        return {
            top:0
        }
    },
    mounted(){
        this.$refs.list.$el.style.top = `${this.$refs.img.clientHeight}px`
        this.minTop = -this.$refs.img.clientHeight+40
    },
    computed:{
        bgStyle(){
            return `background-image:url(${this.bgImage})`
        }
    },
    methods:{
        scroll(pos){
            this.top=pos.y
        },
        back(){
            this.$router.back();
        },
        selectItem(item,index){
            this.selectPlay({
                list:this.songList,
                index
            })
        },
        ...mapActions([
            'selectPlay'
        ])
    },
    watch:{
        top(newV){
            let min = Math.max(this.minTop,newV)
            let scale=1+Math.abs(newV/this.minTop)
            let blur=Math.min(20*Math.abs(newV/this.minTop),20)
            if(min==this.minTop){
                this.$refs.img.style.zIndex = 10
                this.$refs.img.style.height='40px'
                this.$refs.img.style.paddingTop=0
                this.$refs.btn.style.display='none'
            }else{
                this.$refs.img.style.zIndex = 0
                this.$refs.img.style.height=0
                this.$refs.img.style.paddingTop='70%'
                this.$refs.btn.style.display='block'
            }
            if(newV>0){
                this.$refs.img.style.transform=`scale(${scale})`
                this.$refs.img.style.zIndex = 10
            }
            this.$refs.layer.style.transform=`translateY(${min}px)`
            this.$refs.filter.style['backdrop-filter']=`blue(${blur}px)`
        }
    },
    components:{
        Scroll,
        songList
    }
}
</script>

<style scoped lang='stylus'>
@import '../../commons/stylus/variable';
@import '../../commons/stylus/mixin';

.music-list
    position fixed
    z-index 100
    top 0
    left 0
    bottom 0
    right 0 
    background $color-background
    .back
        position absolute
        top 0
        left 6px
        z-index 50
        .icon-back
            display block
            padding 10px
            font-size $font-size-large-x
            color $color-theme
    .title
        position absolute
        top 0
        left 10%
        width:80%
        no-wrap()
        text-align center
        line-height 40px
        font-size $font-size-large
        color $color-text
        z-index 100
    .bg-image
        position relative
        width 100%
        height 0
        padding-top 70%
        background-size cover
        transform-origin top
        .play-wrapper
            position absolute
            bottom 20px
            z-index 50
            width 100%
            .play
                box-sizing border-box
                width 135px
                padding 7px 0
                margin 0 auto
                text-align center
                border 1px solid $color-theme
                color $color-theme
                border-radius 100px
                font-size 0
                .icon-play
                    display inline-block
                    vertical-align middle
                    margin-right 6px
                    font-size $font-size-medium-x
                .text
                    display inline-block
                    vertical-align middle
                    font-size $font-size-small
        .filter
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            background rgba(7, 17, 27, 0.4)
    .list
        position fixed
        bottom 0
        width 100%
        background $color-background
        .song-list-wrapper
            padding 20px 30px
    .layer
        position relative
        height 100%
        background $color-background

</style>


