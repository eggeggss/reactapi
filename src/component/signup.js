import React from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Signup = () => {
    const [hint, setHint] = useState('');
    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        mode:'onChange',
        reValidateMode: 'onChange',
    });
    const onSubmit=async(data)=>{

        console.log(data);
        alert('submit');

    }
    let validatePassword=(password1,password2)=>{
        //console.log(data+'/'+password2) test;
        if (password1!=password2)
            return false;

        return true;
    }

    return (
        <div id="signUpPage" className="bg-yellow">
            <div className="conatiner signUpPage vhContainer">
                <div className="side">
                    <a href="#"><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" /></a>
                    <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
                </div>
                <div>
                    <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="formControls_txt">註冊帳號</h2>
                        <label className="formControls_label" htmlFor="email">Email</label>
                        
                        <input className="formControls_input" type="text" 
                             id="email" name="email" placeholder="請輸入 email" 
                            {...register("email", {
                                required: true,
                                pattern: /^\S+@\S+$/i
                            })}
                              />
                        <div className="errorhint">{errors.email?.type === 'required' && <span>此欄位必填</span>}</div>
                        <div className="errorhint">{errors.email?.type === 'pattern' && <span>email格式錯誤</span>}</div>


                        <label className="formControls_label" htmlFor="name">您的暱稱</label>
                        <input className="formControls_input" type="text" name="name" id="name"
                         placeholder="請輸入您的暱稱" 
                        {...register("username", {
                            required: true,
                            maxLength: 80,
                        })}/>
                        <div className="errorhint">{errors.username?.type === 'required' && <span>此欄位必填</span>}</div>

                        
                        <label className="formControls_label" htmlFor="pwd">密碼</label>
                        <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" 
                            {...register("password1", {
                                required: true,
                                maxLength: 10,
                                minLength: 6,
                            })}
                         />
                        <div className="errorhint">{errors.password1?.type === 'required' && <span>此欄位必填</span>}</div>
                        <div className="errorhint">{errors.password1?.type === 'maxLength' && <span>請少於10個字</span>}</div>
                        <div className="errorhint">{errors.password1?.type === 'minLength' && <span>請大於6個字</span>}</div>

                        
                        <label className="formControls_label" htmlFor="pwd">再次輸入密碼</label>
                        <input className="formControls_input" type="password" name="pwd" id="pwd" 
                           placeholder="請再次輸入密碼"
                            {...register("password2", {
                                required: true,
                                maxLength: 10,
                                minLength: 6,
                                validate: {
                                    validatePassword: (password2) => validatePassword(getValues().password1, password2)
                                }
                            })}
                            />
                        <div className="errorhint">{errors.password2?.type === 'required' && <span>此欄位必填</span>}</div>
                        <div className="errorhint">{errors.password2?.type === 'maxLength' && <span>請少於10個字</span>}</div>
                        <div className="errorhint">{errors.password2?.type === 'minLength' && <span>請大於6個字</span>}</div>
                        <div className="errorhint">{errors.password2?.type === 'validatePassword' && <span>兩次密碼不一致</span>}</div>

                        <input className="formControls_btnSubmit" type="submit"  value="註冊帳號" />
                        <NavLink className="formControls_btnLink" to="/login">登入</NavLink>
                        {/* <a className="formControls_btnLink" href="#loginPage">登入</a> */}
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Signup;