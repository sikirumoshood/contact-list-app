function ContactListApp() {
	this.state = {
		contacts   : [
			{
				id    : 0,
				name  : 'Sikiru Moshood',
				email : 'sikirumoshood@gmail.com',
				phone : '+2348166473504',
                pic:"img/pic-1.jpg" //DEFAULT IMAGE IF NO IMAGE IS SELECTED
			}
		],
		groups     : [],
		favourites : []
	};

    const parent = this;
	this.__init__ = function() {
		//@App initial configuration is done here
        this.UI.showContactsView();
        
        //@Bind events 
        window.addEventListener('updateContact', (e) => {
            console.log('Update contact event captured', e.detail);
            this.updateContact(e.detail);


        });

        window.addEventListener('newContact', (e) => {
            console.log('New contact event captured', e.detail);
            this.addContact(e.detail);


        });
        window.addEventListener('deleteContact', (e) => {
            console.log('Delete contact event captured', e.detail);
            this.deleteContact(e.detail);
        });

        
	};
	//@Custom event names
	this.events = {
		newContact    : 'newContact',
		updateContact : 'updateContact',
		deleteContact : 'deleteContact'
	};
	//@UI api
	this.UI = {
        
		createContactComponentAndBindToView : function(data) {
			//@creates a contact component and append to contact list view
			let parentDiv = document.createElement('div');
            
			parentDiv.setAttribute("class", "contact__item");
			let childImg = document.createElement('img');
			childImg.src = data.pic;//@UPDATE IMAGE PROPERTY
			childImg.alt = 'Pic.png';
			childImg.class = 'contact__image';
			let childNameDiv = document.createElement('div');
			childNameDiv.setAttribute('class', 'contact__name');
			childNameDiv.innerText = data.name;
			parentDiv.append(childImg, childNameDiv);
            
            document.querySelector("#contact__list").appendChild(parentDiv);
		},
        createContactComponent: function(data) {
			//@creates a contact component and append to contact list view
            
            let parentDiv = document.createElement('div');       
			parentDiv.setAttribute("class", "contact__item");
			let childImg = document.createElement('img');
			childImg.src = data.pic;//@UPDATE IMAGE PROPERTY
			childImg.alt = 'Pic.png';
			childImg.class = 'contact__image';
			let childNameDiv = document.createElement('div');
			childNameDiv.setAttribute('class', 'contact__name');
			childNameDiv.innerText = data.name;
			parentDiv.append(childImg, childNameDiv);
            return parentDiv;
            
		},
		showContactsBall       : function() {
			let ball = document.querySelector('.status__balls__pane > .contact__status__ball');
			ball.style = 'opacity:1';
		},
		hideContactsBall       : function() {
			let ball = document.querySelector('.status__balls__pane > .contact__status__ball');
			ball.style = 'opacity:0';
		},
		showFavouritesBall     : function() {
			let ball = document.querySelector('.status__balls__pane > .favourite__status__ball');
			ball.style = 'opacity:1';
		},
		hideFavouritesBall     : function() {
			let ball = document.querySelector('.status__balls__pane > .favourite__status__ball');
			ball.style = 'opacity:0';
		},
		showContactsView       : function() {
			//@Makes contacts view visible.
            this.hideFavouritesBall();
			this.showContactsBall();
			let contactsView = document.querySelector('#contact__view__component');
			contactsView.style = 'display:';
			//@Bind contacts data with view
            const contacts = parent.getContacts();
            for(let index=0; index < parent.getContactCount() ; ++index){
                this.createContactComponentAndBindToView(contacts[index]);
            }
             
            
		},
        showUpdatedContactsView       : function() {
			//@Makes contacts view visible.
            this.hideFavouritesBall();
			this.showContactsBall();
            let contactsView = document.createElement('div');
            contactsView.setAttribute('class',"contact__list");
            contactsView.setAttribute('id',"contact__list");
            contactsView.setAttribute('style','display:');
            
			//@Bind contacts data with view
            const contacts = parent.getContacts();
            
            for(let index=0; index < parent.getContactCount() ; ++index){
                contactsView.appendChild(this.createContactComponent(contacts[index]));
            }
            
            
			
            //@replace old view
            let contactContainer = document.querySelector(".contacts__container");
            let oldView = document.querySelector("#contact__list");
            contactContainer.replaceChild(contactsView, oldView);
			
			
             
            
		},
        renderView       : function() {
			//@Shows contact view with a new contact updated into the view.
            //Without repitition;
            this.hideFavouritesBall();
			this.showContactsBall();
			let contactsView = document.querySelector('#contact__view__component');
			contactsView.style = 'display:';
			
            
		},
        
		hideContactsView       : function() {},
		showFavouritesView     : function() {
			//@Makes contacts view visible.
		},
		hideFavouritesView     : function() {}
	};
	
	this.getState = function() {
		return this.state;
	};
	this.getContactCount = function() {
		return this.state.contacts.length;
	};
	this.getContacts = function() {
		return this.state.contacts;
	};
	//@Contact is an object  whose id is its index in the array.
	this.addContact = function(contact) {
		this.state.contacts.push(contact);
        this.UI.createContactComponentAndBindToView(contact);
        this.UI.renderView();
	};

	this.deleteContact = function(contactDetails) {
		//@Filter contacts by Id and get the index
        let newContacts = this.getContacts().filter(contact => contact.id !== contactDetails.id);
        this.state.contacts = newContacts;
        this.UI.showUpdatedContactsView();
        
	};

	//@Contact id and the data to update
	this.updateContact = function(data) {
		this.state.contacts[data.id] = data;
		this.UI.showUpdatedContactsView();
	};

	//@Emits a custom event
	this.emit = function(eventName, data) {
		return dispatchEvent(new CustomEvent(this.events[eventName], { bubbles: true, detail: data }));
	};
}

let ContactApp = new ContactListApp();
ContactApp.__init__();
