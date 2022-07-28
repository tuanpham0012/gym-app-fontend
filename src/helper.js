import { auth} from './config';
import axios from 'axios';
import moment from "moment/min/moment-with-locales";
moment.locale("vi");
import { server_url} from './config'

export async function logout(token){
    return await axios({
          method: 'post',
          url: auth.USER_LOGOUT,
          headers: 
            {'Authorization': token,
              'Accept': 'application/json'
            },
        })
}

export function randImage(){
  let arr = [
    'https://th.bing.com/th/id/OIP.jQ25-wPN_HDWY3S5Ie_FsQHaJd?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.KsGVktiJa_atu2oEMBDr8QHaHa?pid=ImgDet&w=2000&h=2000&rs=1',
    'https://th.bing.com/th/id/OIP.up2w2XR5eQhoWu8GzPZCdAHaHa?pid=ImgDet&w=1060&h=1060&rs=1',
    'https://cdn.shopify.com/s/files/1/0032/5736/8611/products/Evofusion_Chocolate_Sup_Facts_1080x.jpg?v=1611956657',
    'https://th.bing.com/th/id/OIP.FqCz_TWjB83dSCiN30U0sQHaJd?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/R.fb47abed7dd73ae54d18d672c7d71e66?rik=eYJ%2bjclfkFrfBA&riu=http%3a%2f%2fsupplementssa.eu%2fwp-content%2fuploads%2f2018%2f03%2fpurewhey.jpg&ehk=r9uK7AGHU4bJg%2bdFCoSDe%2f%2b9%2bJhuqGw0Yr5sE8FQkUE%3d&risl=&pid=ImgRaw&r=0'
  ];

  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];
  return item;
}

export const imageLink = (value) =>{
  if(value) return server_url + value;
  else return randImage();
}

export const formatMoney = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

export const formatDate = (value) => {
  return value
    ? moment(value).format("DD/MM/YYYY")
    : "Đang cập nhật!";
}

export const formatDateTime = (value) => {
  return value
    ? moment(value).format("HH:mm DD/MM/YYYY")
    : "Đang cập nhật!";
}

export const countDownTime = (value) => {
  return value
    ? moment(value).calendar()
    : "Đang cập nhật!";
}

export const slugify = (str) =>
{
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '') 
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-') 
    // Collapse dashes
    .replace(/-+/g, '-'); 

    return str;
}