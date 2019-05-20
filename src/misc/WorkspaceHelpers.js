import { slugifyPlaygroundName } from "../components/Playground/PlaygroundActions";

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

export function getPhases() {
    return {
        community: {
            title: 'Community',
            icon: require('assets/img/icon-community.svg'),
            expandedIcon: require('assets/img/icon-community-active.svg'),
            steps: [
                {
                    name: 'Inloggen',
                    link: '/login',
                    visible: ({ user }) => !user,
                },
                {
                    name: 'Actie starten',
                    link: '/zoeken',
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
                    link: '/add-team-member',
                    visible: ({ playground }) => !!playground,
                },
                {
                    name: 'Flyers verspreiden',
                    link: '/flyer',
                    visible: ({ playground }) => !!playground,
                },
                {
                    name: 'Meningen inventariseren',
                    link: '/meningen-inventariseren',
                    visible: ({ playground }) => !!playground,
                },
                {
                    name: 'Contact leggen met bestuur',
                    link: '/involve-administrator',
                    visible: ({ playground }) => !!playground,
                },
                {
                    name: 'Wij worden rookvrij',
                    link: '/commitment',
                    visible: ({ playground }) => !!playground,
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
                    link: '/pick-date',
                    visible: ({ playground }) => !!playground,
                },
                {
                    name: 'Communiceer over de rookvrije afspraak',
                    link: '/shout',
                    visible: ({ playground }) => !!playground,
                },
                {
                    name: 'Laat zien dat de speeltuin rookvrij is',
                    link: '/signonfence',
                    visible: ({ playground }) => !!playground,
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
                    link: '/celebrate',
                    visible: ({ playground }) => !!playground,
                },
                {
                    name: 'Evalueren',
                    link: '/magnify',
                    visible: ({ playground }) => !!playground,
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
