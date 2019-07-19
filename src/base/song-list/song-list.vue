<template>
    <div class="song-list">
        <ul> 
            <li @click="selectItem(song,index)" v-for='(song,index) in songList' class='item' :key='song.id'>
                <div class='content'>
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        songList:{
            type:Array,
            default:() => []
        }
    },
    methods:{
        getDesc(song){
            return song.singer+song.name
        },
        selectItem(item,index){
            this.$emit('select',item,index)
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import "../../commons/stylus/variable"
    @import "../../commons/stylus/mixin"

    .song-list
        .item
            display flex
            align-items center
            box-sizing border-box
            height 60px
            font-size $font-size-medium
        .content
            flex 1
            line-height 20px
            overflow hidden
            .name
                margin-top 4px
                width 80%
                no-warp()
                color $color-text
            .desc
                no-wrap()
                font-size 12px
                color $color-text-d

</style>

