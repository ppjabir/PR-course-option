import React, {useState, useContext} from 'react';
import {Row, Col, Container } from 'react-bootstrap';
import { useHistory } from "react-router"
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import {SiteContext} from './SiteContext';
import 'react-phone-input-2/lib/style.css';

export const UserLogin = () => {
    var contextData = useContext(SiteContext);
    const {apiURL} = contextData;
    const history = useHistory();
    const [loginPhoneWithoutDiailCode, setLoginPhoneWithoutDiailCode]= useState('');
    const [loginPhoneWithDiailCode, setLoginPhoneWithDiailCode]= useState('');
    const [registerPhoneWithoutDiailCode, setRegisterPhoneWithoutDiailCode]= useState('');
    const [registerPhoneWithDiailCode, setRegisterPhoneWithDiailCode]= useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    //const [loginData, setLoginData] = useState(null);

    //const [registerData, setRegisterData] = useState(null);

    //const [phoneData, setPhoneData] = useState({});

    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const { register, handleSubmit, control } = useForm(); // initialise the hook
    const onSubmit = (data) => {
        var formdata = new FormData();
        formdata.append("userId", window.myToken);
        formdata.append("mobile", loginPhoneWithoutDiailCode);
        formdata.append("password", "annoor10001");
        formdata.append("internationalNumber", loginPhoneWithDiailCode);
        formdata.append("smsFlag", "N");

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };
        const endpoint = `${apiURL}dbUserLogin.php`;
        fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result[0].success === 'Y' &&
                result[0].errorMessege === ''
            ) {
                contextData.setIsLoggedIn(true);
                contextData.setExistingUser(result[0]);
                history.push("/")
            }
        })
    }
    
    
    

    const showLoginFunc = () => {
        setShowLogin(true);
        setShowRegister(false);
    }
    const showRegisterFunc = () => {
        setShowLogin(false);
        setShowRegister(true);
    }
    const onRegisterSubmit = (data) => {
        console.log('formData',data);
        var formdata = new FormData();
        formdata.append("userId", window.myToken);
        formdata.append("mobile", registerPhoneWithoutDiailCode);
        formdata.append("candiName", data.firstName);
        formdata.append("internationalNumber", registerPhoneWithDiailCode);
        formdata.append("smsFlag", "N");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        const endpoint = `${apiURL}dbRegisterCandidate.php`;
        fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => {
            //setRegisterData(result[0])
            setAlreadyRegistered(result[0].errorMessege === 'Mobile Number Already Registered' ? true : false);
            if(result[0].success === 'Y' &&
                result[0].errorMessege === 'Registration success'
            ) {
                contextData.setIsLoggedIn(true);
                contextData.setExistingUser(result[0]);
                history.push("/")
            }
            console.log('registered', result[0])
        })
    }

    const loginPhoneChange =(data) => {
        console.log('phone',data);
        setLoginPhoneWithDiailCode(`+${data[0]}`)
        setLoginPhoneWithoutDiailCode(data[0].slice(data[1].dialCode.length))
    }
    const registerPhoneChange =(data) => {
        console.log('phone',data);
        
        setRegisterPhoneWithDiailCode(`+${data[0]}`)
        setRegisterPhoneWithoutDiailCode(data[0].slice(data[1].dialCode.length))
    }

    // useEffect(()=>{
        
    // },['registerData'])

    // const handlePhoneNumberInput = (value,event) =>{ 
    //     console.log(value)
    // }
    
    return (
        
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div class="panel panel-login">
                        <div class="panel-heading">
                            <Row>
                                <Col xs={6}><p onClick={() => showLoginFunc()}>Login</p></Col>
                                <Col xs={6}><p onClick={() => showRegisterFunc()}>Register</p></Col>
                            </Row>
                        </div>
                        <div class="panel-body">
                            <Row>
                                
                                <Col lg={12}>
                                    {showLogin &&
                                        (<form onSubmit={handleSubmit(onSubmit)}>
                                            <Controller
                                                as={PhoneInput}
                                                name="PhoneInput"
                                                control={control}
                                                country={'in'}
                                                defaultValue=""
                                                enableSearch={true}
                                                onChange={phone => loginPhoneChange(phone)}
                                            />
                                            <label for="studenName" class="text-info">Student Name:</label><br/>
                                            <input
                                                
                                                name="password"
                                                placeholder="Password"
                                                ref={register}
                                            /><br/>
                                            <input type="submit" />

                                        </form>
                                    )}
                                    {showRegister &&
                                        (<form onSubmit={handleSubmit(onRegisterSubmit)}>
                                            <label for="studenName" class="text-info">Student Name:</label><br/>
                                            <input
                                                
                                                name="firstName"
                                                placeholder="Enter Your Name"
                                                ref={register}
                                            /><br/>
                                            <label for="mobileNumber" class="text-info">Mobile Number(Select Country Code)</label><br/>
                                            <Controller
                                                as={PhoneInput}
                                                name="PhoneInput"
                                                control={control}
                                                country={'in'}
                                                defaultValue=""
                                                enableSearch={true}
                                                onChange={(phone) => registerPhoneChange(phone)}
                                            /><br/>
                                            
                                            <input type="submit" />

                                        </form>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
            {alreadyRegistered && <h2>Mobile number already registered</h2>}
        </Container>
    )
}
