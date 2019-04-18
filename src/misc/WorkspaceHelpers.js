export const playgroundStatuses = ['NOT_STARTED', 'IN_PROGRESS', 'FINISHED'];
export const playgroundLabels = ['Voorbereiden', 'Invoeren', 'Onderhouden'];

export function getActivePhaseUrl(playground) {
    const activePhase = getActivePhase(playground);

    return `/workspace/${playground.id}${activePhase.steps[0].link}`;
}

export function getOpenedPhase(phases, pathname) {
    const openedStepTitle = getOpenedStepTitle(phases, pathname);

    return openedStepTitle !== null
      ? openedStepTitle
      : 'none';
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
        firstPhase: {
            title: playgroundLabels[0],
            icon: require('assets/img/icon-cooperate@2x.png'),
            expandedIcon: require('assets/img/icon-cooperate@2x-active.png'),
            steps: [
                {
                    name: 'Mensen verzamelen',
                    link: '/add-team-member',
                },
                {
                    name: 'Flyers verspreiden',
                    link: '/flyer',
                },
                {
                    name: 'Meningen inventariseren',
                    link: '/meningen-inventariseren',
                },
                {
                    name: 'Contact leggen met bestuur',
                    link: '/involve-administrator',
                },
                {
                    name: 'Wij worden rookvrij',
                    link: '/commitment',
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
                },
                {
                    name: 'Communiceer over de rookvrije afspraak',
                    link: '/shout',
                },
                {
                    name: 'Laat zien dat de speeltuin rookvrij is',
                    link: '/signonfence',
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
                },
                {
                    name: 'Evalueren',
                    link: '/magnify',
                },
            ],
        },

        community: {
            title: 'Community',
            icon: require('assets/img/icon-community.svg'),
            expandedIcon: require('assets/img/icon-community-active.svg'),
            steps: [
                {
                    name: 'Team',
                    link: '/team',
                },
                {
                    name: 'Chat',
                    link: '/chat',
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
        title: '',
        stepLink: '',
    };

    Object.keys(phases).forEach((phaseName, phaseIndex, phasesKeys) => {
        phases[phaseName].steps.forEach((step, stepIndex) => {
            if (pathname.includes(step.link)) {
                if (stepIndex > 0) {
                    prev.stepLink = phases[phaseName].steps[stepIndex - 1].link;
                    prev.title = phases[phaseName].title;
                } else {
                    if (phaseIndex > 0) {
                        const phase = phases[phasesKeys[phaseIndex - 1]];

                        prev.stepLink = phase.steps[phase.steps.length - 1].link;
                        prev.title = phase.title;
                    } else {
                        prev.stepLink = null;
                        prev.title = null;
                    }
                }
            }
        });
    });

    return prev;
}

export function getNextStep(phases, pathname) {
    const next = {
        title: '',
        stepLink: '',
    };

    Object.keys(phases).forEach((phaseName, phaseIndex, phasesKeys) => {
        const phasesLength = phasesKeys.length;

        phases[phaseName].steps.forEach((step, stepIndex, steps) => {
            const stepsLength = steps.length;

            if (pathname.includes(step.link)) {
                if (stepIndex < (stepsLength - 1)) {
                    next.stepLink = phases[phaseName].steps[stepIndex + 1].link;
                    next.title = phases[phaseName].title;
                } else {
                    if (phaseIndex < (phasesLength - 1)) {
                        const phase = phases[phasesKeys[phaseIndex + 1]];

                        next.stepLink = phase.steps[0].link;
                        next.title = phase.title;
                    } else {
                        next.stepLink = null;
                        next.title = null;
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

export function shouldWorkspaceUpdate(props, nextProps) {
    const { playground: currentPlayground, user: currentUser }= props;
    const { playground: nextPlayground, user: nextUser } = nextProps;

    if (!currentPlayground && !nextPlayground) return false;

    if (!currentPlayground && nextPlayground) return true;

    if (!currentUser && nextUser) return true;

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
