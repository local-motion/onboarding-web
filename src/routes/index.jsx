import Components from "views/Components/Components.jsx";
import Workspace from "views/Workspace/Workspace.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";

var indexRoutes = [
    {path: "/profile-page", name: "ProfilePage", component: ProfilePage},
    {path: "/login-page", name: "LoginPage", component: LoginPage},
    {path: "/components-page", name: "Components", component: Components},
    {path: "/workspace", name: "Workspace", component: Workspace},
    {path: "/", name: "LandingPage", component: LandingPage}
];

export default indexRoutes;
