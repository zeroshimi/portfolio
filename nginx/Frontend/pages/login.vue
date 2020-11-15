<template>
  <div id="page" class="basePage">
    <div class="contentsArea_login u-UIpaddingTop">
      <div class="loginFormContainer">
        <section v-for="obj in loginData" :key="obj.id" class="loginForm">
          <heading class="u-displayNone">
            {{ obj.name }}
          </heading>
          <IdPasswordArea
            :ref="`inputIndex${obj.id}`"
            :objIndex="obj.id"
            :emitMethodsName="'_setInputValue'"
            :typeName="obj.name"
            :placeholder="obj.name"
            :inputData="loginData[obj.id - 1].value"
            :openPassword="seePassword"
            @_setInputValue="_setInputValue"
          />
        </section>
        <section
          class="seePasswordBtnContainer"
        >
          <heading class="u-displayNone">
            Password表示
          </heading>
          <seePasswordBtn
            :className="'seePasswordBtn'"
            class="u-font-size-ss"
            @mousedown="_seePasswordMouseDown"
            @mouseup="_seePasswordMouseUp"
            @keydown="_seePasswordMouseDown"
            @keyup="_seePasswordMouseUp"
          >
            See Password
          </seePasswordBtn>
        </section>
        <!-- loginボタン -->
        <section class="loginBtnContainer">
          <!--<loginBtn
            :btnType="'button'"
            :className="`loginBtn ${isDarkMode ? 'loginBtnDarkBackGroundColor' : 'loginBtnNormalBackGroundColor'}`"
            :methodsName="'_login'"
            @_login="_login"
            @click="_outFocus($event)"
          >
            {{ isSignUp ? 'login': 'signup' }}
          </loginBtn>-->
          <button @click="preLogin" class="button">ログイン</button>
        </section>
        <section class="switchUserModeContainer">
          <a href="#" class="a switchUserMode" @click="_switchUserMode($event)">
            {{ isSignUp ? 'for New User' : 'for Signed up User' }}
          </a>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import IdPasswordArea from './../components/login/input'
// import loginBtn from './../components/ui/btn/generalBtn'
import seePasswordBtn from './../components/globalComponent/generalBtn'
import heading from './../components/globalComponent/headingCaption'
export default {
  mounted () {
    if (this.$auth.user) {
      this.$router.push('/')
    }
    this.$refs.inputIndex1[0].$el.focus()
  },
  data () {
    return {
      loginData: [
        {
          id: 1,
          name: 'Email',
          value: '',
          isValidate: false
        },
        {
          id: 2,
          name: 'Password',
          value: '',
          isValidate: false
        }
      ],
      errorMessage: '',
      openPassword: false
    }
  },
  methods: {
    _setInputValue (payload) {
      this.loginData[Number(payload.index) - 1].value = payload.value
      this.loginData[Number(payload.index) - 1].isValidate = payload.isvalid
    },
    async _login (e) {
      const similalPW = new RegExp(this.loginData[0].value.split('@')[0])
      if (!this.loginData[0].isValidate || !this.loginData[1].isValidate) {
        window.alert('不正な入力です。')
        return
      }
      if (!this._isEmail(this.loginData[0].value)) {
        window.alert('無効なEmailです。')
        return
      }
      if (similalPW.test(this.loginData[1].value)) {
        window.alert('PasswordがEmailに酷似しています。')
        return
      }
      if (this.loginData[1].value.length < 10) {
        window.alert('Passwordは10文字以上にしてください。')
        return
      }
      if (!this.isSignUp) {
        await this.$axios.$post(`${process.env.BASE_URL}/api/signup`, {
          data: {
            username: this.loginData[0].value,
            email: this.loginData[0].value,
            password: this.loginData[1].value
          }
        }).then((res) => {
          if (res.name === 'Error' && res.message === 'Request failed with status code 400') {
            window.alert('Passwordが一般的すぎます')
          } else {
            this.$auth.loginWith(
              'local'
              , {
                data: {
                  username: this.loginData[0].value,
                  email: this.loginData[0].value,
                  password: this.loginData[1].value
                }
              }
            )
              .then((res) => {
                if (res.name === 'Error' && res.message === 'Request failed with status code 401') {
                  console.log('User登録をしてください')
                }
              })
              .catch((e) => {
                console.log(e)
                return 0
              })
          }
        })
          .catch((e) => {
            console.log(e)
          })
      } else {
        this.$auth.loginWith(
          'local'
          , {
            data: {
              username: this.loginData[0].value,
              email: this.loginData[0].value,
              password: this.loginData[1].value
            }
          }
        )
          .then((res) => {
            if (res.name === 'Error' && res.message === 'Request failed with status code 401') {
              console.log('User登録をしてください')
            }
          })
          .catch((e) => {
            window.alert('PasswordまたはEmailアドレスが間違っています。')
            return 0
          })
      }
    },
    _switchUserMode (e) {
      e.target.blur()
      this.$store.dispatch('runSetIsSignUp', !this.$store.getters.getIsSignUp)
    },
    _isEmail (str) {
      return str.match(/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/)
    },
    _seePasswordMouseDown (e) {
      if (e.keyCode === undefined || e.keyCode === 32 || e.keyCode === 13) {
        this.openPassword = true
      }
    },
    _seePasswordMouseUp () {
      this.openPassword = false
    },
    preLogin () {
      this.$router.push('/')
    }
  },
  components: {
    IdPasswordArea,
    // loginBtn,
    seePasswordBtn,
    heading
  },
  computed: {
    isSignUp () {
      return this.$store.getters.getIsSignUp
    },
    seePassword () {
      return this.openPassword
    },
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../assets/scss/variables';
.loginForm {
  display: flex;
  justify-content: flex-end;
  height: auto;
  padding: 16px;
  width: auto;
  &Container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: $Ui-height;
  width: auto;
  }
}
.switchUserMode {
  text-decoration: underline;
  width:auto;
  &:hover {
    text-decoration: none;
  }
  &:active {
    color: brown;
  }
  &:focus {
    text-decoration: none;
  }
  &Container {
    display: flex;
    justify-content: center;
  }
}
.seePasswordBtn {
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
  &:active {
    color: brown;
  }
  &:focus {
    text-decoration: none;
  }
  &Container {
    display: flex;
    justify-content: flex-end;
    padding:0 16px 16px 16px;
  }
}
</style>
