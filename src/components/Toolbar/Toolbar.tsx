import {NavLink} from "react-router-dom";

const Toolbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary-subtle">
            <div className="container">
                <NavLink to='/' className="navbar-brand text-black">Finance Tracker</NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to='/categories' className="nav-link text-black">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link text-black">Add</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;