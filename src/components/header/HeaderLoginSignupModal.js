import './headerLoginSignupModal.css'

import { Modal } from 'bootstrap';
import Login from './Login';
import Signup from './Signup';

export const HeaderLoginSignupModal = () => {
    const closeDialog = () => {
        const modalElement = document.getElementById('loginModal');
        const modalInstance = Modal.getInstance(modalElement);
        const backdrop = document.querySelector('.modal-backdrop');
        modalInstance.hide();
        if (backdrop) {
            backdrop.remove();
            document.body.classList.remove('modal-open');
        }
    }
    return (
        <>
            <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#loginModal">
                Login
            </button>
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loginModalLabel">SwiftKart</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="nav nav-tabs" id="loginSignupTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login-tab-pane" type="button" role="tab" aria-controls="login-tab-pane" aria-selected="true">Login</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup-tab-pane" type="button" role="tab" aria-controls="signup-tab-pane" aria-selected="false">Signup</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="loginSignupContent">
                                <div className="tab-pane fade show active" id="login-tab-pane" role="tabpanel" aria-labelledby="login-tab" tabIndex="0">
                                    <Login closeDialog={closeDialog}/>
                                </div>
                                <div className="tab-pane fade" id="signup-tab-pane" role="tabpanel" aria-labelledby="signup-tab" tabIndex="0">
                                    <Signup closeDialog={closeDialog} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderLoginSignupModal
