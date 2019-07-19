<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list :songList="songList" :title="this.singer.name" :bg-image="this.singer.avatar"></music-list>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "../../api/singer";
import Song from "../../commons/js/song";
import { filterSinger } from "../../commons/js/util";
import musicList from "../music-list/music-list";
export default {
  data() {
    return {
      songList: []
    };
  },
  computed: {
    ...mapGetters(["singer"])
  },
  created() {
    this._getSingerDetail(this.$route.params.id);
  },
  mounted() {
    console.log("子路由");
  },
  methods: {
    _getSingerDetail(id) {
      if (!this.singer.id) {
        this.$router.push("/singer");
      }
      getSingerDetail(id).then(res => {
        console.log(res);
        let list = res.data.hotSongs;
        this._initSongList(list);
        console.log(this.songList);
        console.log(this.singer);
      });
    },
    _initSongList(list) {
      list.forEach(item => {
        let singer = filterSinger(item.ar);
        item.singer = singer;
        item.album = item.al.name;
        item.image = item.al.picUrl;
        this.songList.push(new Song(item));
      });
    }
  },
  components: {
    musicList
  }
};
</script>
<style scoped lang="stylus">
@import '../../commons/stylus/variable';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>


