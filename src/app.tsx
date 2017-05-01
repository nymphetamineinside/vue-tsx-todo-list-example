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
            '<input v-model="newItem" @keyup.enter="addItem"/>' +
            '<button @click="addItem">Add</button>' +
            '<ul v-if="items.length">' +
                '<li><a @click="visibility=\'all\'" href="#" >All</a></li>' +
                '<li><a @click="visibility=\'active\'" href="#" >Active</a></li>' +
                '<li><a @click="visibility=\'completed\'" href="#" >Completed</a></li>' +
            '</ul>' +
            '<div class="table-responsive">' +
                '<table class="table" v-if="items.length">' +
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
                            '<input @keyup.enter="editSave(item)" @keyup.esc="editCancel(item)" type="text" v-model="editedItem.title"v-if="item == editedItem"></td>' +
                            '<td><input @change="saveCompleted" type="checkbox" v-model="item.completed"></td>' +
                            '<td><a @click="removeItem(item)" href="#" >Remove</a></td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>' +
            '</div>' +
            '<p v-if="items.length"> * Please use double-click on item label for edit</p>' +
        '</div>'
})


export default class App extends Vue {

    public visibility: string = 'all';

    public sort: string = 'none';

    public newItem = null;

    public editedItem: string = '';

    public itemTitleCache: string = '';

    public items = Data.getEntity().items;

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
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
                return 0;
            })
        },
        desc: function (items) {
            return items.sort(function (a, b) {
                if(a.title > b.title) return -1;
                if(a.title < b.title) return 1;
                return 0;
            })
        }
    };

    get filteredItems() {
        var sortedItems = this.items;
        if (!this.editedItem) {
            sortedItems = this.sorts[this.sort](this.items)
        }
        return this.filters[this.visibility](sortedItems);
    }

    addItem() {
        this.items.push({
            id: Data.getEntity().getId(),
            title: this.newItem,
            completed: false
        });
        Data.getEntity().save();
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
        Data.getEntity().save();
    }

    removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
        Data.getEntity().save();
    }

    editCancel(item) {
        this.editedItem = null;
        item.title = this.itemTitleCache;
    }

    saveCompleted() {
        Data.getEntity().save();
    }
}