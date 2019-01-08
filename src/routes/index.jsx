import Workspace from "views/Workspace/Workspace.jsx";
import Onboarding from "views/Onboarding/Onboarding.jsx";
import About from "views/About/About.jsx";
import Contact from "views/About/Contact.jsx";
import FAQ from "views/About/FAQ.jsx";
import Terms from "views/Legal/Terms.jsx";
import Privacy from "views/Legal/Privacy.jsx";

export default [

    {path: "/about", name: "Who are we", component: About},
    {path: "/contact", name: "Contact us", component: Contact},
    {path: "/privacy", name: "Privacy Statement", component: Privacy},
    {path: "/faq", name: "Frequently Asked Questions", component: FAQ},
    {path: "/terms", name: "Terms of Use", component: Terms},

    {path: "/workspace", name: "Workspace", component: Workspace},

    {path: "/", name: "Onboarding", component: Onboarding},

];
