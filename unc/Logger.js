dojo.provide('unc.Logger');

dojo.require('dijit._Widget');

dojo.declare('unc.Logger', [ dijit._Widget ], {
    
    logDB: null,
    backupLogs: [],
    userName: '',
    
    lastIdle: null,
    
    //default delay for logging idle time is 1 minute
    IDLE_THRESHOLD: 60000, //1 minute in milliseconds
    
    postCreate: function() {
        this.lastIdle = (new Date()).getTime();
        dojo.connect(window, 'onclick', this, 'idleTick');
        dojo.connect(window, 'onkeypress', this, 'idleTick');
    },
    
    idleTick: function() {
        var date = new Date();
        var newTime = date.getTime();

        if((newTime - this.lastIdle) >= this.IDLE_THRESHOLD) {
            this.log({logType:'idleTime', idleFor:(newTime - this.lastIdle)});
        }
        
        this.lastIdle = newTime;
    },
    
    log: function(logObj) {
        logObj.date = (new Date()).toUTCString(); 
        logObj.user = this.userName;
        
        console.log('Logging message', logObj);
        
        //if the db hasn't async'ly been created, store logs in array
        if(!this.logDB) {
            this.backupLogs.push(logObj);
        } else {
            //if the db HAS been created, empty any existing backed up logs and then log new ones
            while(this.backupLogs.length > 1) {
                this.logDB.newItem(this.backupLogs.pop());
            }
            
            this.logDB.newItem(logObj);
            this.logDB.save();
        }
    }
    
});
