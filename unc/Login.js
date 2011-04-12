dojo.provide('unc.Login');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require('dijit.form.Button');

dojo.declare('unc.Login', [ dijit._Widget, dijit._Templated ], {
    templatePath: dojo.moduleUrl('unc', 'Login.html'),
    widgetsInTemplate: true,
    
    roles: [ 'superuser', 'developer', 'admin', 'author' ],
    
    beforeMsg: 'You must login to use this page.',
    afterMsg: 'Welcome {name}.',
    
    postCreate: function() {
        this.inherited(arguments);
        console.log('create');
        var self = this;
        self.connect(self.login, 'onClick', function() {
            uow.triggerLogin().then(function() { self.checkRole(); });
        });
        self.connect(self.logout, 'onClick', function() {
            uow.logout();
        });
        self.connect(self.help, 'onClick', function() {
            dojo.toggleClass(self.explanation, 'loginHidden');
        });
        console.log('create done');
        self.checkRole();
    },
    
    checkRole: function() {
        var self = this;
        
        uow.getUser().then(function(user) {
            if (self.roles.indexOf(user.role) >= 0) {
                self.msg.innerHTML = dojo.replace(self.afterMsg, user);
                dojo.addClass(self.login.domNode, 'loginHidden');
                dojo.addClass(self.help.domNode, 'loginHidden');
                dojo.removeClass(self.logout.domNode, 'loginHidden');
                self.onLogin(user);
            } else {
                self.msg.innerHTML = self.beforeMsg;
                dojo.removeClass(self.login.domNode, 'loginHidden');
                dojo.removeClass(self.help.domNode, 'loginHidden');
                dojo.addClass(self.logout.domNode, 'loginHidden');
            }
        });
    },
    
    onLogin: function(user) {
        console.log('login complete');
    }
});
