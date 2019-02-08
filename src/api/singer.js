
import Axios from 'axios'

export function getSingerList(){
    return Axios.post('http://192.168.0.103:3000/top/artists');
}