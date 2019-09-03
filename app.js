function ContactListApp() {
	this.state = {
		contacts   : [
			{
				id    : 0,
				name  : 'Sikiru Moshood',
				email : 'sikirumoshood@gmail.com',
				phone : '+2348166473504',
				pic   : 'img/pic-1.jpg' //DEFAULT IMAGE IF NO IMAGE IS SELECTED
			},
            {
				id    : 1,
				name  : 'Miss Ogechi',
				email : 'sikirumoshood@gmail.com',
				phone : '+2348166473504',
				pic   : 'img/pic-1.jpg' //DEFAULT IMAGE IF NO IMAGE IS SELECTED
			},
            {
				id    : 2,
				name  : 'Mr Ifeanyi',
				email : 'sikirumoshood@gmail.com',
				phone : '+2348166473504',
				pic   : 'img/pic-1.jpg' //DEFAULT IMAGE IF NO IMAGE IS SELECTED
			},
            {
				id    : 3,
				name  : 'Engineer Joseph',
				email : 'sikirumoshood@gmail.com',
				phone : '+2348166473504',
				pic   : 'img/pic-1.jpg' //DEFAULT IMAGE IF NO IMAGE IS SELECTED
			},
            {
				id    : 4,
				name  : 'Miss Maria',
				email : 'sikirumoshood@gmail.com',
				phone : '+2348166473504',
				pic   : 'img/pic-1.jpg' //DEFAULT IMAGE IF NO IMAGE IS SELECTED
			},
            {
				id    : 5,
				name  : 'Samuel Adeyemo Salako',
				email : 'sikirumoshood@gmail.com',
				phone : '+2348166473504',
				pic   : 'img/pic-1.jpg' //DEFAULT IMAGE IF NO IMAGE IS SELECTED
			},
            {
				id    : 6,
				name  : 'Catherine Angel',
				email : 'sikirumoshood@gmail.com',
				phone : '+2348166473504',
				pic   : 'img/pic-1.jpg' //DEFAULT IMAGE IF NO IMAGE IS SELECTED
			},
            {
				id    : 7,
				name  : 'Anabel Simon',
				email : 'sikirumoshood@gmail.com',
				phone : '+2348166473504',
				pic   : 'img/pic-1.jpg' //DEFAULT IMAGE IF NO IMAGE IS SELECTED
			},
            {
				id    : 8,
				name  : 'Damilola David',
				email : 'sikirumoshood@gmail.com',
				phone : '+2348166473504',
				pic   : 'img/pic-1.jpg' //DEFAULT IMAGE IF NO IMAGE IS SELECTED
			},
            {
				id    : 9,
				name  : 'Rashidat Mahmud',
				email : 'sikirumoshood@gmail.com',
				phone : '+2348166473504',
				pic   : 'img/pic-1.jpg' //DEFAULT IMAGE IF NO IMAGE IS SELECTED
			},
		],
		groups     : [ 'Company', 'Family', 'Friends' ],
		phoneTypes : [ 'Mobile', 'Work', 'home' ],
		favourites : [ 0 ],
		selected   : []
	};

	const parent = this;

	this.__init__ = function() {
		//@App initial configuration is done here
		this.UI.showContactsView();

		//@Bind events
		window.addEventListener('updateContact', (e) => {
			this.updateContact(e.detail);
		});

		window.addEventListener('newContact', (e) => {
			this.addContact(e.detail);
		});
		window.addEventListener('deleteContact', (e) => {
			this.deleteContact(e.detail);
		});

		window.addEventListener('favouriteContactSelected', (e) => {
			console.log('Event captured');
			this.addOrRemoveFromSelected(e.detail.id, 'ADD');
			this.UI.updateSelectedStatus();
		});
		window.addEventListener('favouriteContactUnSelected', (e) => {
			console.log('Event captured-REMOVE');
			this.addOrRemoveFromSelected(e.detail.id, 'REMOVE');
			this.UI.updateSelectedStatus();
		});
        window.addEventListener('deleteContactSelected', (e) => {
			console.log('Event captured');
			this.addOrRemoveFromSelected(e.detail.id, 'ADD');
			this.UI.updateDeleteSelectedStatus();
		});
		window.addEventListener('deleteContactUnSelected', (e) => {
			console.log('Event captured-REMOVE');
			this.addOrRemoveFromSelected(e.detail.id, 'REMOVE');
			this.UI.updateDeleteSelectedStatus();
		});

		//@Bind Contacts and favourite btn click events;
        let saveSelectedFavBtn = document.querySelector('#faourite__select__save__btn');
        saveSelectedFavBtn.addEventListener('click', ()=> {
            //Save the contacts  selected as favourites
            this.saveSelectedFavourites();
            this.clearSelected();
            this.UI.showFavouritesView();
        });
        
        let deleteSelectedBtn = document.querySelector('#delete__selected__contacts__btn');
        deleteSelectedBtn.addEventListener('click',()=>{
            this.deleteSelectedContacts();
            this.clearSelected();
            this.UI.showUpdatedContactsView();
        })
        
        
		let allCheckbox = document.querySelector('#favourite__all__checkbox');
		allCheckbox.addEventListener('change', (e) => {
			let favContacts = document.querySelectorAll('[favourite-contact-id]');
			if (e.target.checked) {
				favContacts.forEach(checkBox => {
                    checkBox.checked = true;
                    this.emit('favouriteContactSelected', 
                         {
				                id : checkBox.getAttribute('favourite-contact-id')
				            });
                });
			} else {
				favContacts.forEach(checkBox => { 
                    checkBox.checked = false;
                    this.emit('favouriteContactUnSelected', {
								id : checkBox.getAttribute('favourite-contact-id')
							});
                });
			}
		});
        let deleteAllCheckbox = document.querySelector('#all__checkbox');
		deleteAllCheckbox.addEventListener('change', (e) => {
			let deleteContacts = document.querySelectorAll('[delete-contact-id]');
			if (e.target.checked) {
				deleteContacts.forEach(checkBox => {
                    checkBox.checked = true;
                    this.emit('deleteContactSelected', 
                         {
				                id : checkBox.getAttribute('delete-contact-id')
				            });
                });
			} else {
				deleteContacts.forEach(checkBox => { 
                    checkBox.checked = false;
                    this.emit('deleteContactUnSelected', {
								id : checkBox.getAttribute('delete-contact-id')
							});
                });
			}
		});
		let favouriteButton = document.querySelector('#favourites__btn');
		favouriteButton.addEventListener('click', () => {
			this.UI.showFavouritesView();
		});

		let contactsButton = document.querySelector('#contacts__btn');
		contactsButton.addEventListener('click', () => {
			this.UI.showUpdatedContactsView();
		});

		let returnToFavBtn = document.querySelector('#return__to__fav__btn');
		returnToFavBtn.addEventListener('click', () => {
			this.UI.showFavouritesView();
            this.clearSelected();
            this.UI.updateSelectedStatus();
		});

		document.querySelector('#add__fav__bar').addEventListener('click', () => {
			this.UI.showFavouriteSelectContactsView();
		});

		let cancelEditBtn = document.querySelector('#cancel__edit__btn');
		cancelEditBtn.addEventListener('click', () => {
			this.UI.hideEditComponentView();
		});

		let backDeleteBtn = document.querySelector('#back__delete__btn');
		backDeleteBtn.addEventListener('click', () => {
			this.UI.showUpdatedContactsView();
            this.clearSelected();
            this.UI.updateDeleteSelectedStatus();
            
		});

		document.querySelector('#contact__item__search').addEventListener('keyup', (e) => {
			let matchedContacts = this.filterContacts(e.target.value);
			this.UI.showUpdatedContactsViewWithData(matchedContacts);
		});
		document.querySelector('#favourite__contact__search').addEventListener('keyup', (e) => {
			let matchedContacts = this.filterContacts(e.target.value);
			this.UI.showFavouriteSelectContactsViewWithData(matchedContacts);
		});
        document.querySelector('#delete__contact__search').addEventListener('keyup', (e) => {
			let matchedContacts = this.filterContacts(e.target.value);
			this.UI.showDeleteContactsViewWithData(matchedContacts);
		});
		document.querySelector('#profile__contact__image').addEventListener('click', () => {
			this.UI.showImageMenu();
		});

		document.querySelector('#add__new__contact__btn').addEventListener('click', () => {
			this.UI.showEditComponentView('Create new contact');
		});
		//@Bind search input events
		let searchInput = document.querySelector('.search__input');
		searchInput.addEventListener('focus', () => {
			document.querySelector('.input-icon').style.visibility = 'hidden';
		});
		searchInput.addEventListener('blur', () => {
			document.querySelector('.input-icon').style.visibility = 'visible';
		});
	};
	//@Custom event names

	this.events = {
		newContact                 : 'newContact' /*@: Signal to create new contact*/,
		updateContact              : 'updateContact' /*@: Signal to update contact*/,
		deleteContact              : 'deleteContact' /*@: Signal to delete contact*/,
		favouriteContactSelected   : 'favouriteContactSelected',
		deleteContactSelected      : 'deleteContactSelected',
		favouriteContactUnSelected : 'favouriteContactUnSelected',
		deleteContactUnSelected    : 'deleteContactUnSelected',
		populateEditView           : 'populateEditView'
	};
	//@UI api
	this.UI = {
		updateSelectedStatus                    : function() {
			document.querySelector('.favourite__selected__details').textContent = `(${parent.state.selected
				.length}) Selected`;
		},
        updateDeleteSelectedStatus                    : function() {
			document.querySelector('.delete__selected__details').textContent = `(${parent.state.selected
				.length}) Selected`;
		},

		createContactComponentAndBindToView     : function(data) {
			//@creates a contact component and append to contact list view
			let parentDiv = document.createElement('div');

			parentDiv.setAttribute('class', 'contact__item');
			let childImg = document.createElement('img');
			childImg.src = data.pic; //@UPDATE IMAGE PROPERTY
			childImg.alt = 'Pic.png';
			childImg.class = 'contact__image';
			let childNameDiv = document.createElement('div');
			childNameDiv.setAttribute('class', 'contact__name');
			childNameDiv.innerText = data.name;
			parentDiv.append(childImg, childNameDiv);

			document.querySelector('#contact__list').appendChild(parentDiv);
		},

		// TO BE REFACTORED BY IFEANYI
		// createContactComponentAndBindToSelectView : function(data) {
		// 	//@creates a contact component and append to contact list view
		// 	let parentDiv = document.createElement('div');
		// 	parentDiv.setAttribute('class', 'contact__item');
		// 	let childImg = document.createElement('img');
		// 	childImg.src = data.pic; //@UPDATE IMAGE PROPERTY
		// 	childImg.alt = 'Pic.png';
		// 	childImg.class = 'contact__image';
		// 	let childNameDiv = document.createElement('div');
		// 	childNameDiv.setAttribute('class', 'contact__name');
		// 	childNameDiv.innerText = data.name;
		// 	let childCheckBoxDiv = document.createElement('div');
		// 	let selectBox = document.createElement('input');
		// 	selectBox.setAttribute('type', 'checkbox');
		// 	selectBox.setAttribute('contact-id', data.id);
		// 	childCheckBoxDiv.appendChild(selectBox);
		// 	parentDiv.append(childImg, childNameDiv, childCheckBoxDiv);

		// 	document.querySelector('#select__contact__list').appendChild(parentDiv);
		// },
		createContactComponent                  : function(data) {
			//@creates a contact component and append to contact list view
			//@For update purpose

			let parentDiv = document.createElement('div');
			parentDiv.setAttribute('class', 'contact__item');
			let childImg = document.createElement('img');
			childImg.src = data.pic; //@UPDATE IMAGE PROPERTY
			childImg.alt = 'Pic.png';
			childImg.class = 'contact__image';
			let childNameDiv = document.createElement('div');
			childNameDiv.setAttribute('class', 'contact__name');
			childNameDiv.innerText = data.name;
			parentDiv.append(childImg, childNameDiv);
			return parentDiv;
		},
		createFavouriteListComponents           : function(data) {
			//@creates a contact component and append to contact list view
			//@For update purpose

			let parentDiv = document.createElement('div');
			parentDiv.setAttribute('class', 'fav__list__contact__item');
			parentDiv.setAttribute('id', 'fav__list__contact__id');
			let childImg = document.createElement('img');
			childImg.src = data.pic; //@UPDATE IMAGE PROPERTY
			childImg.alt = 'Pic.png';
			childImg.class = 'fav__list__contact__image';
			let childNameDiv = document.createElement('div');
			childNameDiv.setAttribute('class', 'fav__list__contact__name');
			childNameDiv.innerText = data.name;
			parentDiv.append(childImg, childNameDiv);
			return parentDiv;
		},
		createSelectContactDeleteComponent      : function(data) {
			//@creates a contact component and append to contact list view
			//@For update purpose

			let parentDiv = document.createElement('div');
			parentDiv.setAttribute('class', 'contact__item');
			let childImg = document.createElement('img');
			childImg.src = data.pic; //@UPDATE IMAGE PROPERTY
			childImg.alt = 'Pic.png';
			childImg.class = 'contact__image';
			let childNameDiv = document.createElement('div');
			childNameDiv.setAttribute('class', 'contact__name');
			childNameDiv.innerText = data.name;
			let childCheckBoxDiv = document.createElement('div');
			let selectBox = document.createElement('input');
			selectBox.setAttribute('type', 'checkbox');
			selectBox.setAttribute('delete-contact-id', data.id);
			childCheckBoxDiv.appendChild(selectBox);
			parentDiv.append(childImg, childNameDiv, childCheckBoxDiv);
			return parentDiv;
		},
		createSelectContactFavouriteComponent   : function(data) {
			//@creates a contact component and append to contact list view
			//@For update purpose

			let parentDiv = document.createElement('div');
			parentDiv.setAttribute('class', 'favourite__select__contact__item');
			let childImg = document.createElement('img');
			childImg.src = data.pic; //@UPDATE IMAGE PROPERTY
			childImg.alt = 'Pic.png';
			childImg.class = 'contact__image';
			let childNameDiv = document.createElement('div');
			childNameDiv.setAttribute('class', 'contact__name');
			childNameDiv.innerText = data.name;
			let childCheckBoxDiv = document.createElement('div');
			let selectBox = document.createElement('input');
			selectBox.setAttribute('type', 'checkbox');
			selectBox.setAttribute('favourite-contact-id', data.id);
			childCheckBoxDiv.appendChild(selectBox);
			parentDiv.append(childImg, childNameDiv, childCheckBoxDiv);
			return parentDiv;
		},
		showContactsBall                        : function() {
			let ball = document.querySelector('.status__balls__pane > .contact__status__ball');
			ball.style = 'opacity:1';
		},
		hideContactsBall                        : function() {
			let ball = document.querySelector('.status__balls__pane > .contact__status__ball');
			ball.style = 'opacity:0';
		},

		hideFavouritesBottomBar                 : function() {
			document.querySelector('.favourites__footer').style = 'opacity:0';
		},
		showFavouritesBottomBar                 : function() {
			document.querySelector('.favourites__footer').style = 'opacity:1';
		},
		hideContactsBottomBar                   : function() {
			document.querySelector('.contacts__footer').style = 'opacity:0';
		},
		hideDeleteContactsBottomBar             : function() {
			document.querySelector('.delete__select__footer').style = 'opacity:0';
		},
		hideSelectFavouriteContactsBottomBar    : function() {
			document.querySelector('.favourite__select__footer').style = 'opacity:0';
		},
		showSelectFavouriteContactsBottomBar    : function() {
			document.querySelector('.favourite__select__footer').style = 'opacity:1';
		},
		showDeleteContactsBottomBar             : function() {
			document.querySelector('.delete__select__footer').style = 'opacity:1';
		},
		showContactsBottomBar                   : function() {
			document.querySelector('.contacts__footer').style = 'opacity:1';
		},
		showLeftAndRightBars                    : function() {
			document.querySelector('.left__bar').style.display = '';
			document.querySelector('.right__bar').style.display = '';
		},
		showFavouritesBall                      : function() {
			let ball = document.querySelector('.status__balls__pane > .favourite__status__ball');
			ball.style = 'opacity:1';
		},
		hideFavouritesBall                      : function() {
			let ball = document.querySelector('.status__balls__pane > .favourite__status__ball');
			ball.style = 'opacity:0';
		},
		hideLeftAndRightBars                    : function() {
			document.querySelector('.left__bar').style.display = 'none';
			document.querySelector('.right__bar').style.display = 'none';
		},
		showRightBar                            : function() {
			document.querySelector('.right__bar').style = 'display: ;';
		},
		hideContactsView                        : function() {
			this.hideContactsBall();
			this.hideContactsBottomBar();
			let contactsView = document.querySelector('#contact__view__component');
			contactsView.style = 'display:none';
			document.querySelector('#contacts__btn').style.color = ' #b3b3b3';
		},
		hideFavouritesView                      : function() {
			this.hideFavouritesBall();
			this.hideFavouritesBottomBar();
			let favView = document.querySelector('#favourites__view__component');
			favView.style = 'display:none';
			document.querySelector('#favourites__btn').style.color = '#b3b3b3';
		},
		showFavouritesView                      : function() {
			this.hideLeftAndRightBars();
			this.hideFavouriteSelectContactsView();
			this.hideDeleteContactsView();
			this.hideContactsView();
			this.showFavouritesBall();
			this.showFavouritesBottomBar();
            this.showFavouriteList();
			document.querySelector('#favourites__btn').style.color = 'skyblue';
			let contactsView = document.querySelector('#favourites__view__component');
			contactsView.style = 'display:';
		},
		showContactsView                        : function() {
			//@Makes contacts view visible.
			this.hideFavouriteSelectContactsView();
			this.hideEditComponentView();
			this.hideDeleteContactsView();
			this.hideFavouritesView();
			this.showContactsBall();
			this.showContactsBottomBar();
			let contactsView = document.querySelector('#contact__view__component');
			contactsView.style = 'display:';
			document.querySelector('#contacts__btn').style.color = 'skyblue';
			//@Bind contacts data with view
			const contacts = parent.getContacts();
			for (let index = 0; index < parent.getContactCount(); ++index) {
				this.createContactComponentAndBindToView(contacts[index]);
			}
		},
		updateTotalContactsInSearchInput        : function(count) {
			document
				.querySelector('#contact__item__search')
				.setAttribute('placeholder', `Search total contacts (${count})`);
		},
		// showContactSelectListView            : function() {
		// 	this.showRightBar();
		// 	const contacts = parent.getContacts();
		// 	for (let index = 0; index < parent.getContactCount(); ++index) {
		// 		this.createContactComponentAndBindToSelectView(contacts[index]);
		// 	}
		// },
		showUpdatedContactsView                 : function() {
			//@Makes contacts view visible.

			this.updateTotalContactsInSearchInput(parent.getContactCount());
			let contactsViewComponent = document.querySelector('#contact__view__component');
			contactsViewComponent.style = 'display:;z-index:7';
			document.querySelector('#contacts__btn').style.color = 'skyblue';
            this.hideEditComponentView();
            this.hideDeleteContactsView();
			this.hideFavouritesView();
			this.showContactsBall();
			this.showContactsBottomBar();
			this.showLeftAndRightBars();
			let contactsView = document.createElement('div');
			contactsView.setAttribute('class', 'contact__list');
			contactsView.setAttribute('id', 'contact__list');
			contactsView.setAttribute('style', 'display:');

			//@Bind contacts data with view
			const contacts = parent.getContacts();

			for (let index = 0; index < parent.getContactCount(); ++index) {
				contactsView.appendChild(this.createContactComponent(contacts[index]));
			}

			//@replace old view
			let contactContainer = document.querySelector('.contacts__container');
			let oldView = document.querySelector('#contact__list');
			contactContainer.replaceChild(contactsView, oldView);
		},
		showUpdatedContactsViewWithData         : function(data) {
			//@Makes contacts view visible.
			this.updateTotalContactsInSearchInput(parent.getContactCount());
			let contactsViewComponent = document.querySelector('#contact__view__component');
			contactsViewComponent.style = 'display:;z-index:7';
			document.querySelector('#contacts__btn').style.color = 'skyblue';
			this.hideFavouritesView();
			this.showContactsBall();
			this.showContactsBottomBar();
			this.showLeftAndRightBars();
			let contactsView = document.createElement('div');
			contactsView.setAttribute('class', 'contact__list');
			contactsView.setAttribute('id', 'contact__list');
			contactsView.setAttribute('style', 'display:');

			//@Bind contacts data with view
			const contacts = data;

			for (let index = 0; index < data.length; ++index) {
				contactsView.appendChild(this.createContactComponent(contacts[index]));
			}

			//@replace old view
			let contactContainer = document.querySelector('.contacts__container');
			let oldView = document.querySelector('#contact__list');
			contactContainer.replaceChild(contactsView, oldView);
		},
		hideFavouriteSelectContactsView         : function() {
			document.querySelector('.select__favourite__contact__component').style = 'display:none';
			this.hideSelectFavouriteContactsBottomBar();
		},
		hideEditComponentView                   : function() {
			document.querySelector('.edit__contact__component').style = 'display:none';
		},
		showImageMenu                           : function() {
			document.querySelector('.image__menu').style = 'display:';
		},
		hideImageMenu                           : function() {
			document.querySelector('.image__menu').style = 'display:none';
		},

		showEditComponentView                   : function(title) {
			document.querySelector('#title').innerText = title;
			this.hideEditComponentView();
			this.hideFavouritesView();
			this.hideDeleteContactsView();
			this.hideFavouriteSelectContactsView();
			this.hideImageMenu();
			document.querySelector('.edit__contact__component').style = 'display:; z-index:7';
		},
		hideDeleteContactsView                  : function() {
			document.querySelector('.delete__contact__component').style = 'display:none';
			this.hideDeleteContactsBottomBar();
		},
		showDeleteContactsView                  : function() {
			//@Makes select-contacts-view visible.
			document.querySelector('.delete__contact__component').style = 'display:;z-index:7';

			this.hideEditComponentView();
			this.hideFavouritesView();
			this.hideFavouriteSelectContactsView();
			this.showDeleteContactsBottomBar();
			let contactsView = document.createElement('div');
			contactsView.setAttribute('class', 'select__contact__list');
			contactsView.setAttribute('id', 'select__contact__list');
			contactsView.setAttribute('style', 'display:');

			//@Bind contacts data with view
			const contacts = parent.getContacts();

			for (let index = 0; index < parent.getContactCount(); ++index) {
				contactsView.appendChild(this.createSelectContactDeleteComponent(contacts[index]));
			}

			//@replace old view
			let contactContainer = document.querySelector('.delete__container');
			let oldView = document.querySelector('#select__contact__list');
			contactContainer.replaceChild(contactsView, oldView);
            
            const deleteContacts = document.querySelectorAll('[delete-contact-id]');
			deleteContacts.forEach((input) =>
				input.addEventListener('change', (e) => {
					switch (e.target.checked) {
						case true:
							parent.emit('deleteContactSelected', {
								id : e.target.getAttribute('delete-contact-id')
							});
							break;
						case false:
							parent.emit('deleteContactUnSelected', {
								id : e.target.getAttribute('delete-contact-id')
							});
							break;
					}
				})
			);
		},
        showDeleteContactsViewWithData                  : function(data) {
			//@Makes select-contacts-view visible.
			document.querySelector('.delete__contact__component').style = 'display:;z-index:7';

			this.hideEditComponentView();
			this.hideFavouritesView();
			this.hideFavouriteSelectContactsView();
			this.showDeleteContactsBottomBar();
			let contactsView = document.createElement('div');
			contactsView.setAttribute('class', 'select__contact__list');
			contactsView.setAttribute('id', 'select__contact__list');
			contactsView.setAttribute('style', 'display:');

			//@Bind contacts data with view
			const contacts = data;

			for (let index = 0; index < data.length; ++index) {
				contactsView.appendChild(this.createSelectContactDeleteComponent(contacts[index]));
			}

			//@replace old view
			let contactContainer = document.querySelector('.delete__container');
			let oldView = document.querySelector('#select__contact__list');
			contactContainer.replaceChild(contactsView, oldView);
            const deleteContacts = document.querySelectorAll('[delete-contact-id]');
			deleteContacts.forEach((input) =>
				input.addEventListener('change', (e) => {
					switch (e.target.checked) {
						case true:
							parent.emit('deleteContactSelected', {
								id : e.target.getAttribute('delete-contact-id')
							});
							break;
						case false:
							parent.emit('deleteContactUnSelected', {
								id : e.target.getAttribute('delete-contact-id')
							});
							break;
					}
				})
			);
		},
		showFavouriteSelectContactsViewWithData : function(data) {
			//@Makes select-contacts-view visible.
			document.querySelector('.select__favourite__contact__component').style = 'display:;z-index:7';
			this.hideDeleteContactsView();
			this.hideEditComponentView();
			this.hideFavouritesView();
			this.showSelectFavouriteContactsBottomBar();
			let contactsView = document.createElement('div');
			contactsView.setAttribute('class', 'select__fav__contact__list');
			contactsView.setAttribute('id', 'select__fav__contact__list');
			contactsView.setAttribute('style', 'display:');

			//@Bind contacts data with view
			const contacts = data;

			for (let index = 0; index < data.length; ++index) {
				contactsView.appendChild(this.createSelectContactFavouriteComponent(contacts[index]));
			}

			//@replace old view
			let contactContainer = document.querySelector('.select__favourite__container');
			let oldView = document.querySelector('#select__fav__contact__list');
			contactContainer.replaceChild(contactsView, oldView);
            const favContacts = document.querySelectorAll('[favourite-contact-id]');
			favContacts.forEach((input) =>
				input.addEventListener('change', (e) => {
					switch (e.target.checked) {
						case true:
							parent.emit('favouriteContactSelected', {
								id : e.target.getAttribute('favourite-contact-id')
							});
							break;
						case false:
							parent.emit('favouriteContactUnSelected', {
								id : e.target.getAttribute('favourite-contact-id')
							});
							break;
					}
				})
			);
		},
		showFavouriteSelectContactsView         : function() {
			//@Makes select-contacts-view visible.
			document.querySelector('.select__favourite__contact__component').style = 'display:;z-index:7';
			this.hideDeleteContactsView();
			this.hideEditComponentView();
			this.hideFavouritesView();
			this.showSelectFavouriteContactsBottomBar();
			let contactsView = document.createElement('div');
			contactsView.setAttribute('class', 'select__fav__contact__list');
			contactsView.setAttribute('id', 'select__fav__contact__list');
			contactsView.setAttribute('style', 'display:');

			//@Bind contacts data with view
			const contacts = parent.getContacts();

			for (let index = 0; index < parent.getContactCount(); ++index) {
				contactsView.appendChild(this.createSelectContactFavouriteComponent(contacts[index]));
			}

			//@replace old view
			let contactContainer = document.querySelector('.select__favourite__container');
			let oldView = document.querySelector('#select__fav__contact__list');
			contactContainer.replaceChild(contactsView, oldView);
			// Attach events
			const favContacts = document.querySelectorAll('[favourite-contact-id]');
			favContacts.forEach((input) =>
				input.addEventListener('change', (e) => {
					switch (e.target.checked) {
						case true:
							parent.emit('favouriteContactSelected', {
								id : e.target.getAttribute('favourite-contact-id')
							});
							break;
						case false:
							parent.emit('favouriteContactUnSelected', {
								id : e.target.getAttribute('favourite-contact-id')
							});
							break;
					}
				})
			);
		},
		showFavouriteList                       : function() {
			//@Makes select-contacts-view visible.

			this.hideDeleteContactsView();
			this.hideEditComponentView();
			this.hideFavouriteSelectContactsView();
			let contactsView = document.createElement('div');
			contactsView.setAttribute('class', 'favourite__list');
			contactsView.setAttribute('id', 'favourite__list');
			contactsView.setAttribute('style', 'display:');

			//@Bind contacts data with view
			const contacts = parent.getFavourites();

			for (let index = 0; index < contacts.length; ++index) {
				contactsView.appendChild(this.createFavouriteListComponents(contacts[index]));
			}

			//@replace old view
			let contactContainer = document.querySelector('.favourites__container');
			let oldView = document.querySelector('#favourite__list');
			contactContainer.replaceChild(contactsView, oldView);
		},
		renderView                              : function() {
			//@Shows contact view with a new contact updated into the view.
			//Without repitition;
			this.hideFavouritesBall();
			this.showContactsBall();
			let contactsView = document.querySelector('#contact__view__component');
			contactsView.style = 'display:';
		}
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
	this.getFavourites = function() {
		return this.state.contacts.filter((contact) => this.state.favourites.includes(contact.id));
	};
	this.filterContacts = function(filter) {
		filter = filter.toLowerCase();
		return this.state.contacts.filter((contact) => contact.name.toLowerCase().indexOf(filter) > -1);
	};

	//@Contact is an object  whose id is its index in the array.
	this.addContact = function(contact) {
		this.state.contacts.push(contact);
		this.UI.showUpdatedContactsView(contact);
		//this.UI.renderView();
	};
    this.getSelected = function(){
        return this.state.selected;
    }
    this.clearSelected = function(){
        this.state.selected = [];
    }
    this.saveSelectedFavourites = function(){
        const selected = this.getSelected();
        for(let i=0; i< selected.length; ++i){
            if(!this.state.favourites.includes(selected[i])){
                this.state.favourites.push(selected[i]);
            }
        }
    }
    this.deleteSelectedContacts = function(){
        const selected = this.getSelected();
        for(let i=0; i< selected.length; ++i){
            const newContacts = this.state.contacts.filter((contact) => contact.id != selected[i]);
            this.state.contacts = newContacts;           
        }
    }
	this.addOrRemoveFromSelected = function(contactId, operation) {
		const contact = this.state.selected.filter((id) => id == contactId);
		if (contact.length > 0) {
			//Contact exists
			if (operation === 'REMOVE') {
				const newSelected = this.state.selected.filter((id) => id != contactId);
				this.state.selected = newSelected;
			}
		} else {
			if (operation === 'ADD') {
				this.state.selected.push(parseInt(contactId));
			}
		}
	};

	this.deleteContact = function(contactDetails) {
		//@Filter contacts by Id and get the index
		let newContacts = this.getContacts().filter((contact) => contact.id !== contactDetails.id);
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
