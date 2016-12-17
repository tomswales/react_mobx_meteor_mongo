import {extendObservable} from 'mobx';

export default class AppState {
    constructor() {
        extendObservable(this, {
            text: "Test"
        })
    }
}
