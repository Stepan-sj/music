<template>
  <div class="singer">
    <list-view :data="list" @select='selectSinger'></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from "../../api/singer";
import listView from "../../base/listview/listview";

var pinyin = require("pinyin");

export default {
  created() {
    this._getSingerList();
  },
  data() {
    return {
      list:[]
    };
  },
  methods: {
    selectSinger(singer){
      console.log(singer)
      this.$router.push({
        path:`/singer/${singer.id}`
      })
    },
    _getSingerList() {
      getSingerList().then(res => {
        let s = res.data.artists;
        s.map(item => {
          let py = pinyin(item.name[0], {
            style: pinyin.STYLE_FIRST_LETTER
          });
          item.initial = py[0][0].toUpperCase();
        });
        this.list = this._normalizeSinger(s)
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: "热门",
          items: []
        }
      };
      list.forEach((item, index) => {
        if(item.initial=="蔡"){
          item.initial="C"
        }
        if (index < 10) { 
          map.hot.items.push({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias.join(" / ")
          });
        }
        let key = item.initial;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push({
          id: item.id,
          name: item.name,
          avatar: item.img1v1Url,
          aliaName: item.alias.join(" / ")
        });
      });
      var hot=[]
      var other=[]
      for(let key in map){
        if(key=='hot'){
          hot.push(map[key])
        }else{
          other.push(map[key])
        }
      }
      other.sort((a,b) => {
        return a.title.charCodeAt(0)-b.title.charCodeAt(0)
      })
      return hot.concat(other)
    }
  },
  components:{
    listView
  }
};
</script>

<style scoped lang="stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>