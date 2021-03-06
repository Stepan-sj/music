import * as types from './mutations-type'

const mutations = {
    [types.SET_SINGER](state,singer){
        state.singer = singer;
    },
    [types.SET_PLAYING_STATE](state,flag){
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state,flag){
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state,list){
        state.playList = list
    },
    [types.SET_SEQUENCE_LIST](state,list){
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state,mode){
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state,index){
        state.currentIndex = index
    },
    [types.SET_SONGSRC](state,{list,index,data}){
        if(!state.playList[index].songSrc){
            state.playList[index].songSrc=data.data.data[0].url
        }
    }
}

export default mutations;