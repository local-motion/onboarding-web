import Workspace from "views/Workspace/Workspace.jsx";
import Onboarding from "views/Onboarding/Onboarding.jsx";

var indexRoutes = [
    {path: "/workspace", name: "Workspace", component: Workspace},
    {path: "/onboarding", name: "Onboarding", component: Onboarding},
    {path: "/", name: "LandingPage", component: Onboarding}
];

export default indexRoutes;
