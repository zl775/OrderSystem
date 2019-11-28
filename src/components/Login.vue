<template>
  <div class="loginBox">
    <div class="top">
      <div class="input">
        <label for="username">账号:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="input">
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="btn">
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
var that
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mounted () {
    that = this
  },
  methods: {
    login () {
      if (this.username == '') {
        alert('请输入账号！')
        return
      }

      if (this.password == '') {
        alert('请输入密码')
        return
      }

      // 把要传递的数据存储在一个对象里，做为数据交互的第二个参数
      const formData = {
        username: this.username,
        password: this.password
      }
      this.$axios.get('https://api2.bmob.cn/1/classes/User?where=' + JSON.stringify(formData), this.$headers)
        .then(res => {
          console.log(res)
          const keys = Object.keys(res.data.results)
          //console.log(keys)
          for(let v of keys){
            //console.log(v)
            if(res.data.results[v].username==this.username&&res.data.results[v].password==this.password){
            //logined=true;
              alert('登录成功');
              this.$router.push('/home')
            }
          }
          // if (res.data.results.length == 0) {
          //   alert('登录失败,账号或密码不正确！')
          // } else {
          //   if (that.username == res.data.results[0].username) {
          //     alert('登录成功')
          //     this.$router.push('/home')
          //   }
          //}
        })

        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
   .loginBox{
		width: 600px;
		height: 520px;
		background: rgba(173,173,173,0.7);
		border-radius: 30px;
		box-shadow: 0 0 20px #403939;
		overflow: hidden;
		position: absolute;

		margin: auto;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}
	.loginBox .top div.logo{
		height: 200px;
	}
	.loginBox .top{
		text-align: center;
	}
	.loginBox .input{
		height: 60px;
		font-size: 30px;
		color: #fff;
		margin-bottom: 20px;
	}
	.loginBox .top input{
		width: 260px;
		height: 30px;
		border: none;
		border-bottom: 1px solid #fff;
		background: none;
		outline: none;
		font-size: 30px;
		color: #fff;
	}
	.loginBox .btn button{
		width: 100%;
		height: 80px;
		line-height: 80px;
		background: #f39801;
		text-align: center;
		font-size: 40px;
		color: #fff;
		position: absolute;
		left: 0;
		bottom: 0;
		border: none;
		outline: none;
		cursor: pointer;
	}
</style>
