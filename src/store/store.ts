
import Dispatch from '../dispatcher/dispatch'

export default class Store{
    dispatcher:Dispatch;
    constructor(dispatcher:Dispatch){
        this.dispatcher = dispatcher;
    }
}