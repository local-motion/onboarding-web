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
 * url{String}
 */
export function getCurrentStep(phases, url) {
    return Object.keys(phases)
      .find((phaseName) => !!phases[phaseName].steps.find(({ link }) => url.includes(link)));
}

export function getPrevStep(phases, url) {
    let prevStepLink = '';

    Object.keys(phases).forEach((phaseName, phaseIndex, phasesKeys) => {
        phases[phaseName].steps.forEach((step, stepIndex) => {
            if (url.includes(step.link)) {
                if (stepIndex > 0) {
                    prevStepLink = phases[phaseName].steps[stepIndex - 1].link;
                } else {
                    if (phaseIndex > 0) {
                        const phase = phases[phasesKeys[phaseIndex - 1]];

                        prevStepLink = phase.steps[phase.steps.length - 1].link;
                    } else {
                        prevStepLink = null;
                    }
                }
            }
        });
    });

    return prevStepLink;
}

export function getNextStep(phases, url) {
    let nextStepLink = '';

    Object.keys(phases).forEach((phaseName, phaseIndex, phasesKeys) => {
        const phasesLength = phasesKeys.length;

        phases[phaseName].steps.forEach((step, stepIndex, steps) => {
            const stepsLength = steps.length;

            if (url.includes(step.link)) {
                if (stepIndex < (stepsLength - 1)) {
                    nextStepLink = phases[phaseName].steps[stepIndex + 1].link;
                } else {
                    if (phaseIndex < (phasesLength - 1)) {
                        const phase = phases[phasesKeys[phaseIndex + 1]];

                        nextStepLink = phase.steps[0].link;
                    } else {
                        nextStepLink = null;
                    }
                }
            }
        });
    });

    return nextStepLink;
}

export function getOpenedStepTitle(phases, url) {
    const foundPhase = getCurrentStep(phases, url);

    return foundPhase
      ? phases[foundPhase].title
      : null;
}

export function shouldWorkspaceUpdate(currentPlayground, nextPlayground) {
    if (!currentPlayground && !nextPlayground) return false;

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
