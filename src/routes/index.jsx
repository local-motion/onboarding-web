import Workspace from "views/Workspace/Workspace.jsx";
import Onboarding from "views/Onboarding/Onboarding.jsx";
import About from "views/about/About.jsx";
import Contact from "views/about/Contact.jsx";
import Terms from "views/legal/Terms.jsx";
import Privacy from "views/legal/Privacy.jsx";

export default [

    {path: "/about", name: "Who are we", component: About},
    {path: "/contact", name: "Contact us", component: Contact},
    {path: "/privacy", name: "Privacy Statement", component: Privacy},
    {path: "/terms", name: "Terms of Use", component: Terms},

    {path: "/workspace", name: "Workspace", component: Workspace},

    {path: "/", name: "Onboarding", component: Onboarding},

];
