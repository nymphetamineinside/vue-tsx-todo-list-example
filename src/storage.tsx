/**
 * Created by trepachko on 29.4.17.
 */

export default class Storage {

    public lastItemId: number;
    
    protected _storageKey = 'todo-storage-key';

    public load() {
        var items = JSON.parse(localStorage.getItem(this._storageKey) || '[]');
        items.forEach(function (item, id) {
            item.id = id;
        });
        this.lastItemId = items.length;
        return items;
    }

    public save(items: any) {
        localStorage.setItem(this._storageKey, JSON.stringify(items));
        this.lastItemId = items.length;
    }
}