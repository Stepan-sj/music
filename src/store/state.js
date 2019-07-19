import {playMode} from '../commons/js/config'

const state = {
    singer:{},
    playing:false,
    fullScreen:false,
    playList:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:-1,
    songSrc:''
}

export default state