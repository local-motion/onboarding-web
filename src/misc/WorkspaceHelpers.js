export const playgroundStatuses = ['NOT_STARTED', 'IN_PROGRESS', 'FINISHED'];
export const playgroundLabels = ['Voorbereiden', 'Invoeren', 'Naleven en Evalueren'];

export function getActivePhaseUrl(playground) {
    return `/workspace/${playground.id}/flyer`;
}

export function getPhases() {
    return {
        firstPhase: {
            title: playgroundLabels[0],
            icon: require('assets/img/icon-cooperate@2x.png'),
            expandedIcon: require('assets/img/icon-cooperate@2x-active.png'),
            steps: [
                {
                    name: 'Flyers verspreiden',
                    link: '/flyer',
                },
                {
                    name: 'Betrek de beheerder',
                    link: '/involve-administrator',
                },
                {
                    name: 'Wij worden rookvrij!',
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
                    name: 'Zet in de agenda',
                    link: '/pick-date',
                },
                {
                    name: 'Deel het besluit',
                    link: '/shout',
                },
                {
                    name: 'Laat het zien',
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
                    name: 'We zijn rookvrij!',
                    link: '/celebrate',
                },
                {
                    name: 'Volhouden',
                    link: '/magnify',
                },
            ],
        },

        community: {
            title: 'Community',
            icon: '',
            expandedIcon: '',
            steps: [
                {
                    name: 'Mensen verzamelen',
                    link: '/add-team-member',
                },
                {
                    name: 'Chat',
                    link: '/team',
                },
            ],
        },
    };
}

/**
 * phases{Object}
 * pathname{String}
 */
export function getCurrentStep(phases, pathname) {
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
    const foundPhase = getCurrentStep(phases, pathname);

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
