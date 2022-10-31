import React, {useCallback, useEffect, useMemo, useState} from "react";

interface Page {
    route: string;
    name: string;
}

const TopNavbar: React.FC = () => {

    const [pathName, setPathName] = useState<string|null>(null);

    useEffect(() => {
        setPathName(window.location.pathname);
    });

    const calculateActive = useCallback((route: string) => {
        if (route === pathName) {
            return "nav-item active";
        } else {
            return "nav-item";
        }
    }, [pathName]);

    const pages: Page[] = [
        {
            route: '/',
            name: 'Inventory'
        },
        {
            route: '/reset-password',
            name: 'Reset password'
        }
    ]


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Inventech</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    {pages.map((page) => (
                        <li className={calculateActive(page.route)} key={page.route}>
                            <a className="nav-link" href={page.route}>{page.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default TopNavbar;
