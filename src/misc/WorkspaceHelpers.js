export const playgroundStatuses = ['NOT_STARTED', 'IN_PROGRESS', 'FINISHED'];
export const playgroundLabels = ['Voorbereiden', 'Uitvoeren', 'Onderhouden'];

export function getActivePhaseUrl(playground) {
    return `/workspace/${playground.id}/`;
}

export function getPhases({ startPathUrl }) {
    return {
        firstPhase: {
            title: 'Voorbereiden',
            icon: require('assets/img/icon-cooperate@2x.png'),
            expandedIcon: require('assets/img/icon-cooperate@2x-active.png'),
            steps: [
                {
                    name: 'Vorm een team',
                    link: startPathUrl + '/add-team-member',

                },
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
            title: 'Uitvoeren',
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
            title: 'Onderhouden',
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
    };
}