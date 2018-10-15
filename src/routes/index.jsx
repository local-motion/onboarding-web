import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import Workspace from "views/Workspace/Workspace.jsx";
import Onboarding from "views/Onboarding/Onboarding.jsx";

var indexRoutes = [
    {path: "/profile-page", name: "ProfilePage", component: ProfilePage},
    {path: "/login-page", name: "LoginPage", component: LoginPage},
    {path: "/components-page", name: "Components", component: Components},
    {path: "/landing-page", name: "LandingPage", component: LandingPage},


    {path: "/workspace", name: "Workspace", component: Workspace},
    {path: "/onboarding", name: "Onboarding", component: Onboarding},
    {path: "/", name: "LandingPage", component: LandingPage}
];

export default indexRoutes;
