/**
 * Created by trepachko on 29.4.17.
 */
import Storage from './storage';

export default class Data{

    protected static _entity: Data;

    static getEntity() {
        if(!Data._entity) {
            Data._entity = new Data();
        }
        return Data._entity;
    }

    public items = [];
    
    protected _storage: Storage;
    
    protected constructor() {
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

