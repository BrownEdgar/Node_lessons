function uu(str){
  let k;
  if(str.length % 2==0){
    k=str.length/2
    console.log(str[k])
  }else  {
    k=Math.floor((str.length/2))
    console.log(str[k])
  }
}

uu("gariak")