
export enum ActionCommands {
    requestArticles = "googlenews.searchArticle",
    searchGeo = "googlenews.search.geo",
    searchQuery = "googlenews.search.query",
    searchTopic = "googlenews.search.topic",
    searchDetail = "googlenews.search.detail",
    refresh = "googlenews.search.refresh",
    viewSearchQuery = "googlenews.view.search.query",
    viewSearchGeo = "googlenews.view.search.geo",
    viewSearchTopic = "googlenews.view.search.topic",
}

export interface ActionContent {
    key?: string,// the unique key of the event origin
    commandName: ActionCommands,
    value?: any
}

/*
How to generate Action

event.emit(commandName,data)
event.on(commandName,(data)=>{})
*/