<template>
  <div>
    <nav class="conNav">
      <ul>
        <li><a href="">管理页</a></li>
      </ul>
    </nav>
    <div class="box">
      <div class="control">
        <div class="add">
          <dl>
            <dt>添加菜品</dt>
            <dd>
              <label for="">菜名：</label>
              <input type="text" v-model="newDishes.name">
            </dd>
            <dd>
              <label for="">分类：</label>
              <input type="text" v-model="newDishes.classifl">
            </dd>
            <dd>
              <label for="">单价：</label>
              <input type="text" v-model="newDishes.price">
            </dd>
            <dd>
              <label for="">图片：</label>
              <input type="text" v-model="newDishes.img">
            </dd>
          </dl>
          <button @click="addDishes">添加</button>
        </div>
        <div class="del">
          <dl>
            <dt>删除菜品</dt>
            <dd v-for="(item,index) in this.totalDishes">
              <span>{{item.name}}</span><a @click='del(item)'>删除</a>
            </dd>
            <!-- <dd><span>可乐鸡翅</span><a href="#">删除</a></dd>
    						<dd><span>可乐鸡翅</span><a href="#">删除</a></dd> -->
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newDishes: {//这个数据放的是从页面拿到的提交的数据
          neme: '',
          classifl: '',
          price: '',
          img: '',
          num: 0	//这个字段代表菜品被点击了多少次，为了在订单页面获取数据的时候取得这条属性

        },
        totalDishes: []
      }
    },
    methods: {
      addDishes() {
        if (this.newDishes.name == '' || this.newDishes.classifl == '' ||
          this.newDishes.price == '' || this.newDishes.img == '') {
          alert('请输入内容！')
          return
        }
        this.$axios.post('https://api2.bmob.cn/1/classes/Menu', JSON.stringify(this.newDishes), this.$headers)
          .then(res => {
            console.log(res)
            alert('添加成功！')
                //根据添加的菜品的类别跳转到对应的页面
            switch(this.newDishes.classifl){
              case '热菜':this.$router.push('/dishes/hotDishes');
              break;
              case '凉菜':this.$router.push('/dishes/coldDishes');
              break;
              case '汤':this.$router.push('/dishes/soup');
              break;
              case '饮料':this.$router.push('/dishes/drink');
              break;
              case '其它':this.$router.push('/dishes/other');
              break;
            }
			
            // 清空输入框
            this.newDishes.name = ''
            this.newDishes.classifl = ''
            this.newDishes.price = ''
            this.newDishes.img = ''
          })
      },
	  //删除
      del(item) {
        //console.log(item);
        this.$axios({
            method: 'delete',
            url: ('https://api2.bmob.cn/1/classes/Menu/'+item.objectId ),
            headers:this.$headers.headers
          })
          .then(res => {
            console.log(res);
            
          })
          .catch(err => {
            console.log(err);
          })

      }
    },
    created() {	//这个方法在页面里的实例被创建完成后触发，在这个方法里请求数据，然后展示在页面上
      this.$axios.get('https://api2.bmob.cn/1/classes/Menu?where=', this.$headers)
        .then(res => {
          console.log(res)
            //数据请求成功后，需要在数据里添加一条字段(key),这是作为删除数据时候要传递的一个参数
          const keys = Object.keys(res.data.results);
          for (let v of keys) {
            this.totalDishes.push(res.data.results[v]);
          }
          // for (let i = 0; i < totalDishes.length; i++) {
          //   this.totalDishes[i].key = keys[i];
          // }
          //console.log(this.totalDishes)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style>
	dl,dd{
		margin: 0;
		padding: 0;
	}

	 .box{
		background: #c6c2c1;
		padding: 30px 65px 0;
		min-height: 500px;
	}

	/* add */
	.add {
		margin-bottom: 50px;
	}
	.add dt,.del dt{
		font-size: 30px;
		color: #ba6824;
	}
	.add dd label{
		font-size: 24px;
		color: #716154;
	}
	.add dd{
		margin: 10px 0;
		padding-left: 50px;
	}
	.add dd input{
		width: 400px;
		height: 50px;
		border: 1px solid #ccc;
		font-size: 26px;
		color: #716154;
	}
	.add button{
		width: 100px;
		height: 50px;
		margin-left: 250px;
	}

	.del{
		width: 520px;
	}
	.del dd{
		font-size: 30px;
		margin: 15px 0;
		padding-left: 50px;
	}
	.del dd a{
		float: right;
		font-size: 22px;
		color: #716154;
	}
	.del dd a:hover{
		text-decoration: underline;
	}
</style>
