function ContactListApp() {
	this.state = {
		contacts   : [
			{
				id    : 0,
				name  : 'Sikiru Moshood',
				email : 'sikirumoshood@gmail.com',
				phone : '+2348166473504'
			}
		],
		groups     : [],
		favourites : []
	};

	//@Custom event names
	this.events = {
		newContact    : 'newContact',
		updateContact : 'updateContact',
		deleteContact : 'deleteContact'
	};
	//@UI api
	this.UI = {
		createContactComponent : function(data) {
			//@return:string html elements
		},
		showContacts           : function(contacts) {
			//@update ui with contacts items
		}
	};
	this.__init__ = function() {
		//@App initial configuration is done here
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
	};

	this.deleteContact = function(contactId) {
		//@Filter contacts by Id and get the index
		//@Use splice to remove the contact
	};

	//@Contact id and the data to update
	this.updateContact = function(data) {
		this.state.contacts[data.id] = data;
		return this.getContacts();
	};

	//@Emits a custom event
	this.emit = function(eventName, data) {
		return dispatchEvent(new CustomEvent(this.events[eventName], { bubbles: true, detail: data }));
	};
}

let ContactApp = new ContactListApp();
ContactApp.__init__();
window.addEventListener('updateContact', (e) => {
	console.log('Update contact event captured', e.detail);
	ContactApp.updateContact(e.detail);
});
alert('Welcome TEAM NAVIGATOR! Build the world!!!');
window.addEventListener('newContact', (e) => {
	console.log('New contact event captured', e.detail);
	ContactApp.addContact(e.detail);
});
window.addEventListener('deleteContact', (e) => {
	console.log('Delete contact event captured', e.detail);
});
