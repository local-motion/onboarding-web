import { slugifyPlaygroundName } from "../components/Playground/PlaygroundActions";
import { calculateStats } from "../views/Workspace/Cards/EvaluateCard";

export const playgroundStatuses = ['NOT_STARTED', 'IN_PROGRESS', 'FINISHED'];
export const playgroundLabels = ['Voorbereiden', 'Invoeren', 'Onderhouden'];

export function getWorkspaceStartLink(playground) {
    return playground ? `/actie/${slugifyPlaygroundName(playground)}` : '/actie';
}

export function checkBox({ playground, user, name, setCheckbox }) {
    const currentState = playground.jointChecklistItems.includes(name);

    setCheckbox(playground.id, name, !currentState, user);
}

export function getActivePhaseUrl(playground) {
    const activePhase = getActivePhase(playground);

    console.log(`active phase: ${getWorkspaceStartLink(playground)}${activePhase.steps[0].link}`)
    return `${getWorkspaceStartLink(playground)}${activePhase.steps[0].link}`;
}

export function getActivePhase(playground) {
    const status = getStatus(playground);
    const phases = getPhases();

    const foundPhase = Object.keys(phases)
      .find((phaseName) => !!(phases[phaseName].title === status));

    return foundPhase ? phases[foundPhase] : null;
}

export function getStatus(playground) {
    const playgroundStatus = playground ? playground.status : null;
    const result = playgroundStatuses.find(element => element === playgroundStatus);

    return result ? playgroundLabels[playgroundStatuses.indexOf(result)] : null;
}

export function getHrefToSendMail(playground) {
    const hrefArray = window.location.href.split('/');
    const shareUrl = window.location.href.replace(hrefArray[hrefArray.length - 1], '');
    const name = playground.name;
    const phase = getStatus(playground);

    const subject = `Help ${name} rookvrij te maken`;
    const body = `
Beste,%0A%0A

Wie wil z’n kinderen nou niet rookvrij laten opgroeien%3F Ik in ieder geval wel. Wij samen kunnen voorkomen dat spelende kinderen meeroken of sterker nog, dat ze later zelf gaan roken.%0A
Een eerste stap is snel gezet. Te beginnen bij alle speelplekken in jouw plaats. Doe mee aan mijn actie om de speelplek ${name} rookvrij te maken. De actie bevindt zich in de fase ${phase}.%0A%0A
Hoe meer mensen mee doen aan de actie, hoe makkelijker het wordt om de bestuurders te overtuigen van een helder rookvrij-beleid. En dat is nodig om kinderen gezond en ook echt rookvrij te laten spelen.%0A
Klik op onderstaande link om mee te doen aan mijn actie om  ${name} rookvrij te maken.%0A%0A

${shareUrl}%0A%0A

Alvast bedankt!
`;

    return `mailto:?subject=${subject}&body=${body}`;
}

export function getPhases() {
    return {
        community: {
            title: 'Community',
            icon: require('assets/img/icon-community.svg'),
            expandedIcon: require('assets/img/icon-community-active.svg'),
            steps: [
                {
                    name: 'Inloggen',
                    link: '/inloggen',
                    visible: ({ user }) => !user,
                },
                {
                    name: 'Actie starten',
                    link: '/starten',
                    visible: ({ playground }) => !playground,
                },
                {
                    name: 'Team',
                    link: '/team',
                    visible: ({ playground }) => !!playground,
                },
                {
                    name: 'Chat',
                    link: '/chat',
                    visible: ({ playground }) => !!playground,
                },
            ],
        },

        firstPhase: {
            title: playgroundLabels[0],
            icon: require('assets/img/icon-cooperate@2x.png'),
            expandedIcon: require('assets/img/icon-cooperate@2x-active.png'),
            steps: [
                {
                    name: 'Mensen verzamelen',
                    link: '/mensen-verzamelen',
                    visible: ({ playground }) => !!playground,
                    done: ({ playground }) => playground.volunteerCount >= 2,
                },
                {
                    name: 'Flyers verspreiden',
                    link: '/flyers-verspreiden',
                    visible: ({ playground }) => !!playground,
                    done: ({ playground }) => !!playground.jointChecklistItems.includes('distribute_flyers'),
                },
                {
                    name: 'Meningen inventariseren',
                    link: '/meningen-inventariseren',
                    visible: ({ playground }) => !!playground,
                },
                {
                    name: 'Contact leggen met bestuur',
                    link: '/contact-leggen-met-bestuur',
                    visible: ({ playground }) => !!playground,
                    done: ({ playground }) => playground.managers.length > 0,
                },
                {
                    name: 'Wij worden rookvrij',
                    link: '/wij-worden-rookvrij',
                    visible: ({ playground }) => !!playground,
                    done: ({ playground }) => playground.status === 'IN_PROGRESS'
                      || playground.status === 'FINISHED',
                },
            ],
        },

        secondPhase: {
            title: playgroundLabels[1],
            icon: require('assets/img/icon-checklist@2x.png'),
            expandedIcon: require('assets/img/icon-checklist@2x-active.png'),
            steps: [
                {
                    name: 'Kies moment van invoering',
                    link: '/kies-moment-van-invoering',
                    visible: ({ playground }) => !!playground,
                    done: ({ playground }) => !!playground.smokeFreeDate,
                },
                {
                    name: 'Communiceer over de rookvrije afspraak',
                    link: '/communiceer-over-de-rookvrije-afspraak',
                    visible: ({ playground }) => !!playground,
                    done: ({ playground }) => playground.jointChecklistItems.includes("press_announcement") &&
                      playground.jointChecklistItems.includes("newsletter_announcement") &&
                      playground.jointChecklistItems.includes("website_announcement"),
                },
                {
                    name: 'Laat zien dat de speeltuin rookvrij is',
                    link: '/laat-zien-dat-de-speeltuin-rookvrij-is',
                    visible: ({ playground }) => !!playground,
                    done: ({ playground }) => playground.jointChecklistItems.includes("order_sign")
                      && playground.jointChecklistItems.includes("place_sign")
                      && playground.jointChecklistItems.includes("adjust_regulations")
                      && playground.jointChecklistItems.includes("publish_regulations"),
                },
            ],
        },

        thirdPhase: {
            title: playgroundLabels[2],
            icon: require('assets/img/icon-positivity@2x.png'),
            expandedIcon: require('assets/img/icon-positivity@2x-active.png'),
            steps: [
                {
                    name: 'We zijn rookvrij',
                    link: '/we-zijn-rookvrij',
                    visible: ({ playground }) => !!playground,
                    done: ({ playground }) => !!playground.jointChecklistItems.includes("press_announcement_smokefree"),
                },
                {
                    name: 'Evalueren',
                    link: '/evalueren',
                    visible: ({ playground }) => !!playground,
                    done: ({ playground }) => calculateStats(playground).streak >= 10,
                },
            ],
        },
    };
}

/**
 * phases{Object}
 * pathname{String}
 */
export function getCurrentPhaseByStep(phases, pathname) {
    return Object.keys(phases)
      .find((phaseName) => !!phases[phaseName].steps.find(({ link }) => pathname.includes(link)));
}

export function getPrevStep(phases, pathname) {
    const prev = {
        title: null,
        stepLink: null,
        visible: null,
    };

    Object.keys(phases).forEach((phaseName, phaseIndex, phasesKeys) => {
        phases[phaseName].steps.forEach((step, stepIndex) => {
            if (pathname.includes(step.link)) {
                if (stepIndex > 0) {
                    prev.stepLink = phases[phaseName].steps[stepIndex - 1].link;
                    prev.visible = phases[phaseName].steps[stepIndex - 1].visible;
                    prev.title = phases[phaseName].title;
                } else {
                    if (phaseIndex > 0) {
                        const phase = phases[phasesKeys[phaseIndex - 1]];

                        prev.stepLink = phase.steps[phase.steps.length - 1].link;
                        prev.visible = phase.steps[phase.steps.length - 1].visible;
                        prev.title = phase.title;
                    }
                }
            }
        });
    });

    return prev;
}

export function getNextStep(phases, pathname) {
    const next = {
        title: null,
        stepLink: null,
        visible: null,
    };

    Object.keys(phases).forEach((phaseName, phaseIndex, phasesKeys) => {
        const phasesLength = phasesKeys.length;

        phases[phaseName].steps.forEach((step, stepIndex, steps) => {
            const stepsLength = steps.length;

            if (pathname.includes(step.link)) {
                if (stepIndex < (stepsLength - 1)) {
                    next.stepLink = phases[phaseName].steps[stepIndex + 1].link;
                    next.visible = phases[phaseName].steps[stepIndex + 1].visible;
                    next.title = phases[phaseName].title;
                } else {
                    if (phaseIndex < (phasesLength - 1)) {
                        const phase = phases[phasesKeys[phaseIndex + 1]];

                        next.stepLink = phase.steps[0].link;
                        next.title = phase.title;
                        next.visible = phase.steps[0].visible;
                    }
                }
            }
        });
    });

    return next;
}

export function getOpenedStepTitle(phases, pathname) {
    const foundPhase = getCurrentPhaseByStep(phases, pathname);

    return foundPhase
      ? phases[foundPhase].title
      : null;
}

export function getFirstStepLinkOfPhase(phase, phases, playground, user) {
    const phaseObjectName = Object.keys(phases).find((phaseName) => phases[phaseName].title === phase);
    const phaseObject = phases[phaseObjectName];

    const step = phaseObject.steps.find((step) => {
        return !(step.visible && !step.visible({ playground, user }));
    });

    return phaseObject ? `/actie${playground ? `/${slugifyPlaygroundName(playground)}` : ''}${step ? step.link : ''}` : null;
}

export function shouldWorkspaceUpdate(props, nextProps) {
    const { playground: currentPlayground, user: currentUser }= props;
    const { playground: nextPlayground, user: nextUser } = nextProps;

    if (!currentUser && nextUser) return true;
    if (currentUser && !nextUser) return true;

    if (!currentPlayground && !nextPlayground) return false;

    if (currentPlayground && !nextPlayground) return true;
    if (!currentPlayground && nextPlayground) return true;

    const {
        id,
        name,
        lat,
        lng,
        volunteerCount,
        votes,
        status,
        smokeFreeDate,
        managers,
        volunteers,
        jointChecklistItems,
        ownChecklistItems,
        playgroundObservations,
    } = currentPlayground;

    return (
      id !== nextPlayground.id
          || volunteerCount !== nextPlayground.volunteerCount
          || name !== nextPlayground.name
          || lat !== nextPlayground.lat
          || lng !== nextPlayground.lng
          || votes !== nextPlayground.votes
          || status !== nextPlayground.status
          || smokeFreeDate !== nextPlayground.smokeFreeDate
          || jointChecklistItems.length !== nextPlayground.jointChecklistItems.length
          || ownChecklistItems.length !== nextPlayground.ownChecklistItems.length
          || managers.length !== nextPlayground.managers.length
          || volunteers.length !== nextPlayground.volunteers.length
          || playgroundObservations.length !== nextPlayground.playgroundObservations.length
    );
}

export const titlePrefix = 'Rookvrij Spelen';

export function getPhaseIcon(playground) {
    const status = getStatus(playground);

    return playgroundIcons.find(({ title }) => title === status);
}

export function getSmokeFreeDate(smokeFreeDate) {
    return smokeFreeDate
      ? new Date(smokeFreeDate).toLocaleDateString()
      : 'Onbekend';
}

export const playgroundIcons = [
    {
        bg: require("assets/img/texture-1@2x.png"),
        icon: require("assets/img/icon-cooperate@2x-active.png"),
        title: playgroundLabels[0],
        text: 'Zorg voor een goede voorbereiding. Hoe meer mensen de speeltuin rookvrij willen hebben, hoe beter. Een belangrijke stap om het onderwerp op de agenda van het bestuur te krijgen.',
    },
    {
        bg: require("assets/img/texture-2@2x.png"),
        icon: require("assets/img/icon-checklist@2x-active.png"),
        title: playgroundLabels[1],
        text: 'De speeltuin wordt rookvrij! Ga samen met het bestuur aan de slag om iedereen over de nieuwe rookvrije afspraak te informeren.',
    },
    {
        bg: require("assets/img/texture-3@2x.png"),
        icon: require("assets/img/icon-positivity@2x-active.png"),
        title: playgroundLabels[2],
        text: 'Wat gebeurt er als mensen toch roken in de speeltuin? Bepaal samen hoe bezoekers zich aan de rookvrije afspraak kunnen houden.',
    }
];
