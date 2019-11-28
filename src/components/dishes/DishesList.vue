<template>
  <ul class="boxList">
    <li v-for="(item,index) in this.dishes">
      <img :src="item.img" alt="">
      <div class="menuName">
        <div class="left">
          <span>{{item.name}}</span>
          <p><strong>{{item.price}}RMB/份</strong></p>
        </div>
        <div class="right">
          <a @click="order(item)"></a>
        </div>
      </div>

    </li>
  </ul>
</template>

<script>
  //var headers;
  export default {
    data() {
      return {
        dishes: []
      }
    },
    // mounted() {
    //   headers=this.$headers.headers;
    // },
    props: ['fatherName'],
    methods: {
      order(item) {
        //console.log(item)

        // this.$axios({
        //   method: 'post',
        //   url: ('https://api2.bmob.cn/1/classes/Order'),
        //   data:JSON.stringify(item),
        //   headers:JSON.stringify(headers)
        // }).then(res => {
        //     console.log(res)
        //   }).catch(err => {
        //     console.log(err)
        //   })

        //   item.num++;
        // this.$axios.post('https://api2.bmob.cn/1/classes/Order', JSON.stringify(item), this.$headers)
        //   .then(res => {
        //     console.log(res)

        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
        //查询当前菜是否有订单
        this.$axios.get('https://api2.bmob.cn/1/classes/Order?where=' + JSON.stringify({
            "dishId": item.objectId
          }), this.$headers)
          .then(res => {
            //res  中的  results 是一个数组  res.results.length==0 证明当前菜没有订单 res.results.length!=0  证明当前菜有订单
            console.log(res);
            let click = false, //存储是否被点击
              hash = '', //存储点击过的菜的对应的hash(用于更新)
              num = 0, //存储点击的次数(用于更新)
              orderId=""; //当前菜的订单ID
            //拿到所有的数据后，去匹配一下当前点击的那个菜，如要有，那就更新，如果没有那就增加
            // if(res.results.length==0){  //当前菜没有订单

            // }else{
            //   //当前菜有订单

            // }

            if (res.data.results.length!=0) {
              const keys = Object.keys(res.data.results);

              for (let v of keys) {
                if (res.data.results[v].name === item.name) { //这个条件是拿点击的菜与请求过来数据里的菜做对比
                  click = true;
                  hash = v;
                  num = res.data.results[v].num;
                  orderId=res.data.results[v].objectId
                  break; //当找到数据后，后面的循环就不用走了
                } else { //这个条件成立说明这个菜没有被点击过
                  click = false;
                }
              }
            }
            //这里return出去的目的是，可以在下面再使用.then，同时下面的then里面可以使用return的数据
            return {
              click,
              hash,
              num,
              orderId
            }
          })
          .then(res => {
            //如果这里的res.click为true就代表这个菜被点击过，要做的事情是更新数据
            //如果这里的res.click为false就代表这个菜没被点击过，要做的事情是增加数据
            console.log(res);
            //这个条件成立，下一步就是更新
            if (res.click) {
              item.num = res.num+1; //这里同时让它们相加
              this.$axios.put('https://api2.bmob.cn/1/classes/Order/'+res.orderId,JSON.stringify({"dishId": item.objectId,num:item.num}), this.$headers)
              .then(res=>{
                //console.log("更新");
                //console.log(res);
              })
            } else {
              item.num++;
              delete item["objectId"]
              delete item["updatedAt"]
              delete item["createdAt"]
              //这个条件成立，下一步就是增加
              this.$axios.post('https://api2.bmob.cn/1/classes/Order' , JSON.stringify(item), this.$headers)
              .then(res=>{
                //console.log("添加》》》");
                //console.log(res);
              });
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    created() {
      this.$axios.get('https://api2.bmob.cn/1/classes/Menu?where=', this.$headers)
        .then(res => {
          // console.log(res);
          const keys = Object.keys(res.data.results)
          for (let v of keys) {
            // this.fatherName是父组件传过来的数据
            if (res.data.results[v].classifl == this.fatherName) {
              this.dishes.push(res.data.results[v])
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style>
</style>
