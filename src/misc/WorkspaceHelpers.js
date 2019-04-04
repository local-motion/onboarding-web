export const playgroundStatuses = ['NOT_STARTED', 'IN_PROGRESS', 'FINISHED'];

export function getActivePhaseUrl(playground) {
    const result = playgroundStatuses.find(element => element === playground.status);
    const index = result ? playgroundStatuses.indexOf(result) : 0;

    return `/workspace/${playground.id}/phase/${index + 1}`;
}