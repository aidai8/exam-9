import {NavLink} from "react-router-dom";
import {useState} from "react";
import TransactionModal from "../TransactionModal/TransactionModal.tsx";

const Toolbar = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary-subtle">
                <div className="container">
                    <NavLink to='/' className="navbar-brand text-black">Finance Tracker</NavLink>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink to='/categories' className="nav-link text-black">Categories</NavLink>
                            </li>
                            <li className="nav-item align-items-center">
                                <button className="btn" onClick={() => setShowModal(true)}>Add</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <TransactionModal show={showModal} onHide={() => setShowModal(false)} />
        </>
    );
};

export default Toolbar;