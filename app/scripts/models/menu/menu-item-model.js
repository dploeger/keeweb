const Backbone = require('backbone');
const MenuOptionCollection = require('../../collections/menu/menu-option-collection');
let ItemCollection;

const MenuItemModel = Backbone.Model.extend({
    defaults: {
        title: '',
        icon: '',
        customIcon: null,
        active: false,
        expanded: true,
        items: null,
        shortcut: null,
        options: null,
        cls: null,
        disabled: false,
        visible: true,
        drag: false,
        drop: false,
        filterKey: null,
        filterValue: null,
        collapsible: false
    },

    initialize(model) {
        if (model && model.file) {
            this.listenTo(model.file, 'change:name', this.changeTitle, this);
        }
    },

    _loadItemCollectionType() {
        return require('../../collections/menu/menu-item-collection');
    },

    addItem(item) {
        if (!ItemCollection) {
            ItemCollection = this._loadItemCollectionType();
        }
        let items = this.get('items');
        if (!items) {
            items = new ItemCollection();
            this.set('items', items);
        }
        items.add(item);
    },

    addOption(option) {
        let options = this.get('options');
        if (!options) {
            options = new MenuOptionCollection();
            this.set('options', options);
        }
        options.add(option);
    },

    toggleExpanded() {
        const items = this.get('items');
        let expanded = !this.get('expanded');
        if (!items || !items.length) {
            expanded = true;
        }
        this.set('expanded', expanded);
    },

    changeTitle(model, newTitle) {
        this.set('title', newTitle);
    }
});

module.exports = MenuItemModel;
