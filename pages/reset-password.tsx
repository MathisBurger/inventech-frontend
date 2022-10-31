import {NextPage} from "next";
import {FormEvent} from "react";
import useApiService from "../hooks/useApiService";


const ResetPasswordPage: NextPage = () => {

    const api = useApiService();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const oldPassword = (e.nativeEvent.target as any)[0].value;
        const newPassword = (e.nativeEvent.target as any)[1].value;
        const token = localStorage.getItem("token");
        try {
            const result = await api.changePassword(token ?? '', oldPassword, newPassword);
            if (parseInt(`${result.status}`) === 1) {
                localStorage.setItem("token", result.token ?? '');
                alert("Password changed");
            } else {
                alert("Failed to change password");
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="page-container">
            <div className="container-fluid ">
                <div className="row d-flex justify-content-center align-items-center h-100">
                        <form onSubmit={onSubmit}>
                            <div className="form-outline mb-3">
                                <input type="password" id="oldpw" className="form-control form-control-lg"
                                       placeholder="Old password"/>
                                <label className="form-label" htmlFor="oldpw">Old password</label>
                            </div>
                            <div className="form-outline mb-3">
                                <input type="password" id="pw" className="form-control form-control-lg"
                                       placeholder="Enter password"/>
                                <label className="form-label" htmlFor="pw">New password</label>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <button className="btn btn-lg btn-primary w-100">
                                    Change password
                                </button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    );
};


export default ResetPasswordPage;
