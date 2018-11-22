import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translations: {
        "header.brand": "Smoke-free playground",
        "footer.attribution":
          "Smoke-free playground is an initiative of het Longfonds and ABN AMRO",

        "onboarding.playground.progress.smokefree.title":
          "{{percentage}}% smoke-free",
        "onboarding.playground.progress.smokefree.html":
          "<p>\n" +
          "  Collaboratively administrate empowered markets via\n" +
          "  plug-and-play networks. Dynamically procrastinate\n" +
          "  B2C users after installed base benefits.\n" +
          "</p>\n",
        "onboarding.playground.progress.workingonit.title":
          "{{percentage}}% working on it",
        "onboarding.playground.progress.workingonit.html":
          "<p>\n" +
          "  Collaboratively administrate empowered markets via\n" +
          "  plug-and-play networks. Dynamically procrastinate\n" +
          "  B2C users after installed base benefits.\n" +
          "</p>\n",
        "onboarding.playground.progress.smoking.title":
          "{{percentage}}% smoking",
        "onboarding.playground.progress.smoking.html":
          "<p>\n" +
          "  Collaboratively administrate empowered markets via\n" +
          "  plug-and-play networks. Dynamically procrastinate\n" +
          "  B2C users after installed base benefits.\n" +
          "</p>\n",
        "onboarding.playground.calltoaction.title": "{{cityArea}} smoke-free",
        "onboarding.playground.calltoaction.subtitle":
          "Help make a playground " +
          "in {{cityArea}} smoke-free. Sign up for a playground in your area, and " +
          "let's make this happen!",
        "onboarding.playground.calltoaction.button": "Join this initiative!",

        "onboarding.playground.details.title": "Playground {{playgroundName}}",
        "onboarding.playground.details.subtitle": "Details",
        "onboarding.playground.progress.title": "Progress",

        "onboarding.playground.search.title": "Find a playground"
      }
    },
    nl: {
        translations: {
            "playground.default.area": "Nederland",
            "header.brand": "Rookvrije speeltuin",
            "footer.attribution":
                "Rookvrije speeltuinen is een initiatief van het Longfonds en ABN AMRO",
            "onboarding.playground.calltoaction.button": "Doe mee",

            "onboarding.playground.calltoaction.smokefree": "rookvrij",
            "onboarding.playground.calltoaction.title.name": "Maak {{playgroundName}}",
            "onboarding.playground.calltoaction.subtitle":
                "Help " +
                "{{playgroundName}} rookvrij te maken.",
            "onboarding.playground.calltoaction.subtitle.cta.default":
                " Kies of schrijf een speeltuin in via de kaart.",
            "onboarding.playground.calltoaction.subtitle.cta.specific":
                " Bekijk wat je kunt doen om bij te dragen aan de speeltuin.",
            "onboarding.playground.details.title":
                "Speeltuin {{playgroundName}}",
            "onboarding.playground.details.title.default":
                "Nederland",
            "onboarding.playground.details.subtitle":
                "Details",
            "onboarding.playground.progress.title":
                "Voortgang",
            "onboarding.playground.progress.intro.default":
                "Het is tijd om" +
                " {{cityArea}} rookvrij te maken," +
                " om dit voor elkaar te krijgen moeten we nog" +
                " {{playgroundCount}} speeltuinen rookvrij maken.",
            "onboarding.playground.progress.intro.specific":
                "Wil jij helpen met {{playgroundName}} rookvrij te maken? " +
                "Doe dan gerust mee, we hebben je hulp nodig.",
            "onboarding.playground.progress.smokefree.title":
                "{{percentage}}% Rookvrij",
            "onboarding.playground.progress.smokefree.html":
                "<p>\n" +
                "  Collaboratively administrate empowered markets via\n" +
                "  plug-and-play networks. Dynamically procrastinate\n" +
                "  B2C users after installed base benefits.\n" +
                "</p>\n",
            "onboarding.playground.progress.workingonit.title":
                "{{percentage}}% Richting rookvrij",
            "onboarding.playground.progress.workingonit.html":
                "<p>\n" +
                "  Collaboratively administrate empowered markets via\n" +
                "  plug-and-play networks. Dynamically procrastinate\n" +
                "  B2C users after installed base benefits.\n" +
                "</p>\n",
            "onboarding.playground.progress.smoking.title":
                "{{percentage}} Speeltuinen niet rookvrij",
            "onboarding.playground.progress.smoking.html":
                "<p>\n" +
                "  Collaboratively administrate empowered markets via\n" +
                "  plug-and-play networks. Dynamically procrastinate\n" +
                "  B2C users after installed base benefits.\n" +
                "</p>\n"
        }
    }
  },
// lng: "nl",
    fallbackLng: "nl",
    debug:
        true,

    // have a common namespace used around the full app
    ns:
        ["translations"],
    defaultNS:
        "translations",

    keySeparator:
        false, // we use content as keys

    interpolation:
        {
            escapeValue: false, // not needed for react!!
            formatSeparator:
                ","
        }
    ,

    react: {
        wait: true
    }
})
;

export default i18n;
