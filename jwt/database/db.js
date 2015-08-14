var db = {
    users: [{ username: 'monse', password:  'test', id: 1 }],
    find: function(id) {
        for (var i = 0; i < db.users.length; i++) {
            var item = db.users[i];
            if (item.id === id) 
                return item;
        }
        return undefined;
    },
    findByUserName:  function(username) {
        for(var i = 0; i < db.users.length; i++) {
            var item = db.users[i];
            if(item.username === username)
                return item;
        }
        return undefined;
    }
};



module.exports = db;