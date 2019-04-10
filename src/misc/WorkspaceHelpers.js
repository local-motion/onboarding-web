export const playgroundStatuses = ['NOT_STARTED', 'IN_PROGRESS', 'FINISHED'];
export const playgroundLabels = ['Voorbereiden', 'Invoeren', 'Naleven en Evalueren'];

export function getActivePhaseUrl(playground) {
    return `/workspace/${playground.id}/flyer`;
}

export function getPhases(startPathUrl) {
    return {
        firstPhase: {
            title: playgroundLabels[0],
            icon: require('assets/img/icon-cooperate@2x.png'),
            expandedIcon: require('assets/img/icon-cooperate@2x-active.png'),
            steps: [
                {
                    name: 'Flyers verspreiden',
                    link: startPathUrl + '/flyer',
                },
                {
                    name: 'Betrek de beheerder',
                    link: startPathUrl + '/involve-administrator',
                },
                {
                    name: 'Wij worden rookvrij!',
                    link: startPathUrl + '/commitment',
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
                    link: startPathUrl + '/pick-date',
                },
                {
                    name: 'Deel het besluit',
                    link: startPathUrl + '/shout',
                },
                {
                    name: 'Laat het zien',
                    link: startPathUrl + '/signonfence',
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
                    link: startPathUrl + '/celebrate',
                },
                {
                    name: 'Volhouden',
                    link: startPathUrl + '/magnify',
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
                    link: startPathUrl + '/add-team-member',
                },
                {
                    name: 'Chat',
                    link: startPathUrl + '/team',
                },
            ],
        },
    };
}

/**
 * phases{Object}
 * url{String}
 */
export function getOpenedStepTitle(phases, url) {
    const foundPhase = Object.keys(phases)
      .find((phaseName) => !!phases[phaseName].steps.find(({ link }) => link.includes(url)));

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
