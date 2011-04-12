dojo.provide('editor.schemaEditor');

dojo.require('unc.FormGenerator');
dojo.require('editor.GridEditor');
dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require('dijit.form.Select');
dojo.require('dijit.form.Button');
dojo.require('dojox.grid.DataGrid');

dojo.declare('editor.schemaEditor', [ dijit._Widget, dijit._Templated ], {
    templatePath: dojo.moduleUrl('editor', 'schemaEditor.html'),
    widgetsInTemplate: true,
    
    gridLayout: {},
    store: {},
    
    //temp hack until we get some stuff in the dbs
    availableSchemas: [ { label:'Image Test Schema', value:{json:'ImageTestSchema.json', collection:'ImageTests'} },
                        { label:'Sound Test Schema', value:{json:'SoundTestSchema.json', collection:'SoundTests'} },
                        { label:'Naming Game Schema', value:{json:'NamingGameSchema.json', collection:'NamingGames'} } ],
    
    currentSchemaType: {},
    
    postCreate: function() {
        this.inherited(arguments);
        
        this.initSchemaSelect();
        
    },
    
    initSchemaSelect: function() {
        
        this.schemaSelect = new dijit.form.Select({
            options: this.availableSchemas
        });
        dojo.place(this.schemaSelect.domNode, this.at_select);
        
        this.connect(this.at_selectButton, 'onClick', this.selectSchema);
        
    },
    
    selectSchema: function() {
        //get selected from this.schemaSelect
        var schemaType = this.schemaSelect.getValue();
        console.log(schemaType);
        
        dojo.xhrGet({
            url: '../schemas/' + schemaType.json,
            handleAs: 'json', 
            load: dojo.hitch(this, function(schema) {
        
            this.currentSchemaType = schema;
            console.log(this.currentSchemaType);
        
            uow.getDatabase({database: 'harkGames', 
                collection: schemaType.collection}).addCallback(dojo.hitch(this, function(db) {
                        this.gridStore = db;
                        
                        //open new grid on schema type
                        this.gridGoesHere.innerHTML = '';
                        if(this.schemaGrid) this.schemaGrid.destroyRecursive();
                        
                        this.schemaGrid = new editor.GridEditor({store:this.gridStore, gridLayout:this.gridLayout});
                        dojo.place(this.schemaGrid.domNode, this.gridGoesHere);
                        this.schemaGrid.startup();
                        
                        this.connect(this.schemaGrid, 'editItem', this.openForm);
                        
                        this.schemaGrid.save = dojo.hitch(this, this.customSaveMethod);
            }));
        })
        });
        
    },
    
    openForm: function() {
        if(this.form) this.form.destroyRecursive();
        this.formGoesHere.innerHTML = '';

        console.log('current type', this.currentSchemaType);
        console.log('current', this.schemaGrid.current);

        this.form = new unc.FormGenerator({
            schema: this.currentSchemaType,
            initValue: this.schemaGrid.current
        });

        dojo.place(this.form.domNode, this.formGoesHere);
        console.log("open form...", this.form);
    },
    
    startup: function() {
        this.inherited(arguments);
    
        this.schemaSelect.startup();
    },
    
    customSaveMethod: function() {
        var value = this.form.attr('value');

        this.schemaGrid.store.changing(this.schemaGrid.current);
        dojo.mixin(this.schemaGrid.current, value);
        var a = this.schemaGrid.store.save({
            onComplete: function() {
                console.log('save complete, does grid update?');
                // apparently they don't trigger this when changing is used.
                this.schemaGrid.store.onSet(this.current);
            },
            scope: this
        });
        console.log('actions=', a);
    },
    

});
