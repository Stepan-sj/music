import * as types from './mutations-type'
import {getSong} from '../api/singer'
export const selectPlay=async function({commit,state},{list,index}){
    let data = await getSong(list[index].id)
    commit(types.SET_SEQUENCE_LIST,list)
    commit(types.SET_PLAYLIST,list)
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
    commit(types.SET_SONGSRC,{list,index,data})
}

export const asyncSongSrc= async function({commit,state},{list,index}){
    let data = await getSong(list[index].id)
    commit(types.SET_SONGSRC,{list,index,data})
} 