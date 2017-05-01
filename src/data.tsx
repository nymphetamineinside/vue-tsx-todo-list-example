/**
 * Created by trepachko on 29.4.17.
 */
import Storage from './storage';

export default class Data{

    public items = [];
    
    protected _storage: Storage;
    
    constructor() {
        this._storage = new Storage();
        this.items = this._storage.load();
    }

    public getId() {
        return this._storage.lastItemId++;
    }

    public save() {
        this._storage.save(this.items);
    }
}

