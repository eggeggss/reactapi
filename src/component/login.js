import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect, React } from 'react';
import { ApiLogin, timeout } from '../common/api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { useApp } from '../context/AppContext';
import rhefZ3 from '../img/rhefZ3.png';
import tj3Bdk from '../img/tj3Bdk.png';

const MySwal = withReactContent(Swal)

const Login = () => {
    let navigate = useNavigate();
    const [hint, setHint] = useState('');
    let {isloading, setisLoading, snackmessage, setSnackmessage ,username} = useApp();
    const { register, handleSubmit,
        formState: { errors }, getValues, reset } = useForm({
            mode: 'onChange',
            reValidateMode: 'onChange',
        });

    const onSubmit = async (data) => {
        
            const {email,password}=data;

            setisLoading(true);

            let response=await ApiLogin({
                user: {
                    email: email,
                    password: password,
                }
            })

            setisLoading(false);

            if (response.result == false){
                MySwal.fire('帳號或密碼錯誤');
                reset();
            }else{
               
                const { nickname }= response.content;
                
                username = nickname;
                
                navigate('/',{replace:true});

                localStorage.setItem('token',response.token);
                localStorage.setItem('nickname', nickname);

                setSnackmessage("歡迎到ONLINE TODO LIST");
                await timeout(5000);
                setSnackmessage("");
            }

    }

    return (

        <div id="loginPage" className="bg-yellow">
            <div className="conatiner loginPage vhContainer ">
                <div className="side">
                    <a href="#"><img className="logoImg" src={rhefZ3} alt="" /></a>
                    <img className="d-m-n" src={tj3Bdk} alt="workImg" />
                </div>
                <div>
                    <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                        <label className="formControls_label" htmlFor="email">Email</label>
                        <input className="formControls_input" type="text" id="email" name="email" 
                               placeholder="請輸入 email" 
                                {...register("email", {
                                    required: true,
                                    pattern: /^\S+@\S+$/i
                                })} />

                        <div className="errorhint">{errors.email?.type === 'required' && <span>此欄位必填</span>}</div>
                        <div className="errorhint">{errors.email?.type === 'pattern' && <span>email格式錯誤</span>}</div>


                        <label className="formControls_label" htmlFor="pwd">密碼</label>
                        <input className="formControls_input" type="password" name="pwd" id="pwd" 
                          placeholder="請輸入密碼" 
                            {...register("password", {
                                required: true
                            })}
                           />

                        <div className="errorhint">{errors.password?.type === 'required' && <span>此欄位必填</span>}</div>

                        <input className="formControls_btnSubmit" type="submit" value="登入" />
                        <NavLink className="formControls_btnLink" to="/signup">註冊帳號</NavLink>
                        {/* <a className="formControls_btnLink" href="#signUpPage">註冊帳號</a> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;