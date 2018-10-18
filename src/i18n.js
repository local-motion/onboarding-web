import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    resources: {
        en: {
            translations: {
                "onboarding.playground.progress.smokefree.title": "{{percentage}}% smoke-free",
                "onboarding.playground.progress.smokefree.html": "<p>\n" +
                    "  Collaboratively administrate empowered markets via\n" +
                    "  plug-and-play networks. Dynamically procrastinate\n" +
                    "  B2C users after installed base benefits.\n" +
                    "</p>\n",
                "onboarding.playground.progress.workingonit.title": "{{percentage}}% working on it",
                "onboarding.playground.progress.workingonit.html": "<p>\n" +
                    "  Collaboratively administrate empowered markets via\n" +
                    "  plug-and-play networks. Dynamically procrastinate\n" +
                    "  B2C users after installed base benefits.\n" +
                    "</p>\n",
                "onboarding.playground.progress.smoking.title": "{{percentage}}% smoking",
                "onboarding.playground.progress.smoking.html": "<p>\n" +
                    "  Collaboratively administrate empowered markets via\n" +
                    "  plug-and-play networks. Dynamically procrastinate\n" +
                    "  B2C users after installed base benefits.\n" +
                    "</p>\n",
                "header.brand": "Smoke-free playground",
                "onboarding.playground.calltoaction.title": "{{cityArea}} smoke-free",
                "onboarding.playground.calltoaction.subtitle": "Help make a playground " +
                    "in {{cityArea}} smoke-free. Sign up for a playground in your area, and " +
                    "let's make this happen!",

                "onboarding.playground.details.title": "Playground {{playgroundName}}",
                "onboarding.playground.details.subtitle": "Details",
                "onboarding.playground.progress.title": "Progress",

                "onboarding.playground.search.title": "Results",
            }
        },
        nl: {
            translations: {
                "header.brand": "Rookvrije speeltuin",
                "onboarding.playground.calltoaction.title": "{{cityArea}} rookvrij",
                "onboarding.playground.calltoaction.subtitle": "Help een speeltuin " +
                    "in {{cityArea}} rookvrij te maken. Schrijf je in op een speeltuin in jouw buurt, en " +
                    "help mee!",
                "onboarding.playground.details.title": "Speeltuin",
                "onboarding.playground.details.subtitle": "Details",
                "onboarding.playground.progress.title": "Voortgang",
            }
        }
    },
    // lng: "nl",
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;
