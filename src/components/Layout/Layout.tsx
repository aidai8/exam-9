import Toolbar from "../Toolbar/Toolbar.tsx";
import React from "react";


const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <>
            <header className="mb-5">
                <Toolbar />
            </header>
            <main className="container">
                {children}
            </main>
        </>
    );
};

export default Layout;