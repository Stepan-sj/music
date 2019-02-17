<template>
    <transition name="slide">
        <div class="singer-detail">

        </div>
    </transition>
</template>
<script>
import {mapGetters} from 'vuex';
import {getSingerDetail} from '../../api/singer';
import Song from '../../commons/js/song'
import {filterSinger} from '../../commons/js/util'
export default {
    data(){
        return {
            songList:[]
        }
    },
    computed:{
        ...mapGetters([
            'singer'
        ])
    },
    created(){
        this._getSingerDetail(this.$route.params.id);
    },
    methods:{
        _getSingerDetail(id){
            getSingerDetail(id).then(res=>{
                console.log(res)
                let list = res.data.hotSongs
                this._initSongList(list)
                console.log(this.songList)
            })
        },
        _initSongList(list){
            list.forEach(item => {
                let singer = filterSinger(item.ar)
                item.singer = singer
                item.album = item.al.name
                item.image = item.al.picUrl
                this.songList.push(new Song(item))
            });
        }
    }
}
</script>
<style scoped lang="stylus">
    @import "../../commons/stylus/variable"

    .singer-detail
        position fixed
        z-index 100
        top 0
        left 0
        right 0
        bottom 0
        background $color-background
    .slide-enter-active,.slide-leave-active
        transition all 0.3s
    .slide-enter,.slide-leave
        transform translateX(100%) 
</style>


