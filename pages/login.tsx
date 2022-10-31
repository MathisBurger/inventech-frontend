import {NextPage} from "next";
import useApiService from "../hooks/useApiService";
import {FormEvent} from "react";
import {useRouter} from "next/router";


const Login: NextPage = () => {

    const api = useApiService();
    const router = useRouter();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const mail = (e.nativeEvent.target as any)[0].value;
        const password = (e.nativeEvent.target as any)[1].value;
        try {
            const result = await api.login(mail, password);
            if (parseInt(`${result.status}`) === 1) {
                localStorage.setItem("token", result.token ?? '');
                await router.push("/");
            } else {
                alert("Login failed");
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="page-container">
            <div className="container-fluid ">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-7 col-lg-5 col-xl-4">
                        <img src="logo.png"
                             className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-9 col-lg-7 col-xl-5 offset-xl-1">
                        <form onSubmit={onSubmit}>
                            <div className="form-outline mb-4">
                                <input type="text" id="form3Example3" className="form-control form-control-lg"
                                       placeholder="Enter your username"/>
                                <label className="form-label" htmlFor="form3Example3">Username</label>
                            </div>

                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                       placeholder="Enter password"/>
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <button className="btn btn-lg btn-primary w-100">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
