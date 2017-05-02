/**
 * Created by trepachko on 29.4.17.
 */
import * as Vue from 'vue';
import Component from 'vue-class-component';
import Data from './data';

@Component({
    template:
        '<div class="container">' +
            '<h2>Todo List</h2>' +
            '<div class="form-group input-group">' +
                '<input v-model="newItem" @keyup.enter="addItem" class="form-control"/>' +
                '<div class="input-group-btn">' +
                    '<button @click="addItem" class="btn btn-primary">Add</button>' +
                '</div>' +
            '</div>' +
            '<div v-if="dataStorage.items.length" class="list-group">' +
                '<a @click="visibility=\'all\'" href="#" :class="[\'list-group-item\', { active: visibility == \'all\' }]" >All</a>' +
                '<a @click="visibility=\'active\'" href="#" :class="[\'list-group-item\', { active: visibility == \'active\' }]" >Active</a>' +
                '<a @click="visibility=\'completed\'" href="#" :class="[\'list-group-item\', { active: visibility == \'completed\' }]" >Completed</a>' +
            '</div>' +
            '<div class="table-responsive" v-if="dataStorage.items.length">' +
                '<table class="table">' +
                    '<thead>' +
                        '<tr>' +
                            '<th>' +
                                '<a v-if="sort==\'none\'" @click="sort=\'asc\'" href="#" >Title</a>' +
                                '<a v-if="sort==\'asc\'" @click="sort=\'desc\'" href="#" >Title (ASC)</a>' +
                                '<a v-if="sort==\'desc\'" @click="sort=\'asc\'" href="#" >Title (DESC)</a>' +
                            '</th>' +
                            '<th>is completed</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                        '<tr v-for="item in filteredItems">' +
                            '<td><p @dblclick="editItem(item)" v-if="item != editedItem" >{{item.title}}</p>' +
                            '<input @blur="editSave(item)" @keyup.enter="editSave(item)" @keyup.esc="editCancel(item)" type="text" v-model="editedItem.title" v-if="item == editedItem" class="form-control" /></td>' +
                            '<td>' +
                                '<input @change="saveCompleted" type="checkbox" v-model="item.completed" />' +
                            '</td>' +
                            '<td><a @click="removeItem(item)" href="#" >Remove</a></td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>' +
            '</div>' +
            '<p v-if="dataStorage.items.length"> * Please use double-click on item label for edit</p>' +
        '</div>'
})


export default class App extends Vue {

    public visibility: string = 'all';

    public sort: string = 'none';

    public newItem = null;

    public editedItem: string = '';

    public itemTitleCache: string = '';
    
    public dataStorage;

    public filters = {
        all: function (items) {
            return items
        },
        active: function (items) {
            return items.filter(function (item) {
                return !item.completed
            })
        },
        completed: function (items) {
            return items.filter(function (item) {
                return item.completed
            })
        }
    };

    public sorts = {
        none: function (items) {
            return items
        },
        asc: function (items) {
            return items.sort(function (a, b) {
                if(a.title == b.title) return 0;

                if(a.title < b.title) {
                    return -1;
                } else {
                    return 1;
                }
            })
        },
        desc: function (items) {
            return items.sort(function (a, b) {
                if(a.title == b.title) return 0;

                if(a.title > b.title) {
                    return -1;
                } else {
                    return 1;
                }
            })
        }
    };
    
    constructor() {
        super();
        this.dataStorage = new Data();
    }

    get filteredItems() {
        var sortedItems = this.dataStorage.items;
        if (!this.editedItem) {
            sortedItems = this.sorts[this.sort](this.dataStorage.items)
        }
        return this.filters[this.visibility](sortedItems);
    }

    addItem() {
        this.dataStorage.items.push({
            id: this.dataStorage.getId(),
            title: this.newItem,
            completed: false
        });
        this.dataStorage.save();
        this.newItem = '';
    }

    editItem(item) {
        this.itemTitleCache = item.title;
        this.editedItem = item;
    }

    editSave(item) {
        if (!this.editedItem) {
            return;
        }
        this.editedItem = null;
        if (!item.title) {
            this.removeItem(item);
        }
        this.dataStorage.save();
    }

    removeItem(item) {
        this.dataStorage.items.splice(this.dataStorage.items.indexOf(item), 1);
        this.dataStorage.save();
    }

    editCancel(item) {
        this.editedItem = null;
        item.title = this.itemTitleCache;
    }

    saveCompleted() {
        this.dataStorage.save();
    }
}