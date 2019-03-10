
/*
    Both grahpQL and REST queries are executed through this generic interface. Doing so result in a consistent handling of all kinds of queries.
    For now only queries that retrieve data are supported.
*/

// The queryOptions object is layed out as such:

/*
    {
        type: GRAPHQL|REST
        baseActionIdentifer: start of the action types that will be spawned along with the execution of the query
        fetchId: identifier of the entity that is being fetched (may be left undefined)
        query: graphQL query of REST url
        variables: will be sent along with the graphQL query, for rest query the variables will be available for callback
        auxParameters: parameters that will be supplied to the dispatched actions and the callbacks (as part of the entire query object), but are not used in the query itself
        invokeErrorHandlers: whether to invoke the default error handlers (default: true)

        onCompletionPrepublish: function that will be invoked on any result before the result action is dispatched
        onSuccessPrepublish: function that will be invoked when the result is successful before the result action is dispatched
        onFailPrepublish: function that will be invoked when the result is not successful before the result action is dispatched

        onCompletion: function that will be invoked on any result after the result action is dispatched
        onSuccess: function that will be invoked when the result is successful after the result action is dispatched
        onFail: function that will be invoked when the result is not successful after the result action is dispatched
    }


    The callback functions are invoked with these parameters:
    - result: payload for onSuccess error handlers | error (see below) for onError handlers | complete result object for onCompletion handlers
    - dispatch function
    - getState function
    - query object as passed to fetch function
    - complete result object

*/

// Errors are formatted as such:

/*
    {
        code: represents the type of error. Often provided by the server, but may be set client-side as well. This is the only mandatory field.
        serverMessage: error message provided by the server (always in English)
        httpResultCode: the usual response code obtained from the server
        response: protocol (and possibly error type) specific raw content
        queryOptions: the options describing the query that errored
        otherErrors: array of other errors that occurred (in case this error was the first in a list). Note that these other errors will not refer to each other as otherErrors.
    }
*/