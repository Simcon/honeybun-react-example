import * as React from "react";
import * as ReactDOM from "react-dom";

import { AuthProvider, useAuth } from "../src/.";

const oidcConfig = {
    authority: process.env.AUTHORITY,
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
};

function App() {
    const auth = useAuth();

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                Hello {auth.user?.profile.sub}{" "}
                <button onClick={() => void auth.removeUser()}>
                    Log out
                </button>
            </div>
        );
    }

    return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

ReactDOM.render(
    <AuthProvider {...oidcConfig}>
        <App />
    </AuthProvider>,
    document.getElementById("root"),
);
