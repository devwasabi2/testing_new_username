import {Outlet} from "react-router-dom";

import Header from "../../components/Header/Header.jsx"

const Main = () => {
    return (
        <div>
            <Header logoutButton={true} />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Main