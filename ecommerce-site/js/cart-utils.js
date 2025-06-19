// Utility functions for managing cart, wishlist, and compare functionality
const CartUtils = {
    // Add an item to a list (cart, wishlist, or compare)
    addItem: function(listName, item) {
        const list = this.getList(listName);
        if (!this.isInList(listName, item.id)) {
            list.push(item);
            this.saveList(listName, list);
        }
    },

    // Remove an item from a list
    removeItem: function(listName, itemId) {
        const list = this.getList(listName);
        const updatedList = list.filter(item => item.id !== itemId);
        this.saveList(listName, updatedList);
    },

    // Check if an item is in a list
    isInList: function(listName, itemId) {
        const list = this.getList(listName);
        return list.some(item => item.id === itemId);
    },

    // Get the count of items in a list
    getCount: function(listName) {
        return this.getList(listName).length;
    },

    // Get all items in a list
    getList: function(listName) {
        const list = localStorage.getItem(listName);
        return list ? JSON.parse(list) : [];
    },

    // Save a list to localStorage
    saveList: function(listName, list) {
        localStorage.setItem(listName, JSON.stringify(list));
    },

    // Clear a list
    clearList: function(listName) {
        localStorage.removeItem(listName);
    }
};

// Export the CartUtils object
window.CartUtils = CartUtils; 