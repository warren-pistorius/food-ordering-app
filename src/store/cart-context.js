import React from 'react';

const CardContext = React.createContext({
    id: null, 
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    refreshChoices: () => {},
    choices: 0,
    clear: () => {}
});

export default CardContext;