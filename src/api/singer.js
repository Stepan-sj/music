
import Axios from 'axios'

export function getSingerList(){
    return Axios.post('http://192.168.0.103:3000/top/artists');
}

export function getSingerDetail(id){
    return Axios.post(`http://192.168.0.103:3000/artists?id=${id}`);
}

export function getSong(musicId){
    return Axios.post(`http://192.168.0.103:3000/song/url?id=${musicId}`);
}