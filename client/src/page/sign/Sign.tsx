import React, {useState} from 'react'
import styles from './sign.module.css'
import {ImGoogle} from 'react-icons/im'
import {SiKaios} from 'react-icons/si'
import {IoIosLogIn} from 'react-icons/io'

const Sign = () => {
  const [isUser, setIsUser] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [errMessage, setErrorMessage] = useState('')

  const emailChange = e => setEmail(e.target.value)
  const passwordChange = e => setPassword(e.target.value)
  const confirmPassChange = e => setConfirmPass(e.target.value)

  const onClick = () => {
    if (!isUser) {
      // 로그인
      if (email === '') {
        setErrorMessage('이메일을 입력해주세요')
        return
      } else if (!ValidateEmail(email)) {
        setErrorMessage('유효하지 않은 이메일주소입니다.')
        return
      } else setErrorMessage('')

      if (password === '') {
        setErrorMessage('비밀번호를 입력해주세요')
        return
      } else if (checkPassword(password)) {
        //로그인 통신
        //만약 유저가 없다면?
        setIsUser(true)
        return
      }
    } else {
      //회원가입
      if (email === '') {
        setErrorMessage('이메일을 입력해주세요')
        return
      } else if (!ValidateEmail(email)) {
        setErrorMessage('유효하지 않은 이메일입니다.')
        return
      }

      if (password === '') {
        setErrorMessage('비밀번호를 입력해주세요')
        return
      } else if (checkPassword(password)) {
        if (confirmPass === '') {
          setErrorMessage('비밀번호를 다시 한번 입력해주세요')
          return
        } else if (password === confirmPass) {
          setErrorMessage('')
          //회원가입 통신.
          setIsUser(false)
          setEmail('')
          setPassword('')
          setConfirmPass('')
          return
        } else {
          setErrorMessage('확인용 비밀번호를 정확하게 입력해주세요')
          return
        }
      }
    }
  }

  const ValidateEmail = mail => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      )
    ) {
      return true
    }
    return false
  }

  const checkPassword = upw => {
    if (!/^[a-zA-Z0-9]{8,20}$/.test(upw)) {
      setErrorMessage(
        '비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.',
      )
      return false
    }
    var chk_num = upw.search(/[0-9]/g)
    var chk_eng = upw.search(/[a-z]/gi)
    if (chk_num < 0 || chk_eng < 0) {
      setErrorMessage('비밀번호는 숫자와 영문자를 혼용하여야 합니다.')
      return false
    }
    if (/(\w)\1\1\1/.test(upw)) {
      setErrorMessage('비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.')
      return false
    } else return true
  }

  return (
    <div className={styles.outBox}>
      <div className={styles.signBox}>
        <div className={styles.sign_upper}>
          <h1 className={styles.sign_text}>
            {isUser ? '마이 라즈베리 가족이 되어주세요' : '안녕하세요 회원님!'}
          </h1>

          <ul className={styles.inputList_ul}>
            <li className={styles.inputList_li}>
              <input
                type="text"
                className={styles.input_item}
                value={email}
                placeholder="이메일을 입력해주세요"
                onChange={emailChange}
              ></input>
            </li>
            <li className={styles.inputList_li}>
              <input
                type="password"
                className={styles.input_item}
                value={password}
                placeholder="비밀번호를 입력해주세요"
                onChange={passwordChange}
              ></input>
            </li>
            <li className={isUser ? styles.inputList_li : styles.invisible}>
              <input
                type="password"
                className={styles.input_item}
                value={confirmPass}
                placeholder="비밀번호를 다시 입력해주세요"
                onChange={confirmPassChange}
              ></input>
            </li>
          </ul>
          <div className={styles.errMessage}>{errMessage}</div>
          <button className={styles.submitBtn} onClick={onClick}>
            <IoIosLogIn />
          </button>
        </div>
        <div className={styles.sign_down}>
          <ul className={styles.social_ul}>
            <li className={styles.social_kakao}>
              <a href="http://localhost:8080/auth/kakao">
                <SiKaios />
              </a>
            </li>
            <li className={styles.social_google}>
              <a href="http://localhost:8080/auth/google">
                <ImGoogle />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sign