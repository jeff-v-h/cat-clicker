initialCats = [
	{
		id: 1,
		name: "Snowball",
		imgSrc: "img/kitten_1.jpg",
		clicks: 0,
		admin: false,
		nicknames: ["Snowy", "Whitey", "S-Ball", "Ball"]
	},
	{
		id: 2,
		name: "Simba",
		imgSrc: "img/kitten_2.jpg",
		clicks: 0,
		admin: false,
		nicknames: ["Lion", "Sim", "Simmy"]
	},
	{
		id: 3,
		name: "Ari",
		imgSrc: "img/kitten_3.jpg",
		clicks: 0,
		admin: false,
		nicknames: ["A", "Ri-ri"]
	},
	{
		id: 4,
		name: "Grumpy",
		imgSrc: "img/kitten_4.jpg",
		clicks: 0,
		admin: false,
		nicknames: ["Grumps", "Rumps", "G",]
	},
	{
		id: 5,
		name: "Misty",
		imgSrc: "img/kitten_5.jpg",
		clicks: 0,
		admin: false,
		nicknames: ["Mist", "M-Ball", "Master", "Fluffy"]
	}
];

var Cat = function(data) {
	var self = this;
	self.clickCount = ko.observable(data.clicks);
	self.name = ko.observable(data.name);
	self.imgSrc = ko.observable(data.imgSrc);
	self.nicknames = ko.observable(data.nicknames);

	self.level = ko.computed(function() {
		if (self.clickCount() < 10) {
			return "Newborn"
		} else if (self.clickCount() < 20) {
			return "Infant";
		} else if (self.clickCount() < 30) {
			return "Teen";
		} else if (self.clickCount() < 40) {
			return "Adult";
		};
	});
}

var ViewModel = function() {
	var self = this;
	
	this.catList = ko.observableArray([]);

	initialCats.forEach(function(catItem) {
		self.catList.push( new Cat(catItem) );
	});
	
	self.currentCat = ko.observable(self.catList()[0]);
	
	self.incrementCounter = function() {
		self.currentCat().clickCount(self.currentCat().clickCount()+1);
	};
};

ko.applyBindings(new ViewModel());

/*
$(function() {

	var model = {
		currentCat: null,
		cats: [
			{
				id: 1,
				name: "Snowball",
				imgSrc: "img/kitten_1.jpg",
				clicks: 0,
				admin: false
			},
			{
				id: 2,
				name: "Simba",
				imgSrc: "img/kitten_2.jpg",
				clicks: 0,
				admin: false
			},
			{
				id: 3,
				name: "Ari",
				imgSrc: "img/kitten_3.jpg",
				clicks: 0,
				admin: false
			},
			{
				id: 4,
				name: "Grumpy",
				imgSrc: "img/kitten_4.jpg",
				clicks: 0,
				admin: false
			},
			{
				id: 5,
				name: "Misty",
				imgSrc: "img/kitten_5.jpg",
				clicks: 0,
				admin: false
			}
		]
	};

	var octopus = {
		init: function() {
			model.currentCat = model.cats[0];
			viewMain.init();
			viewList.init();
			viewAdmin.init();
		},

		setCurrentCat: function(cat) {
			model.currentCat = cat;
		},

		getCat: function() {
			return model.currentCat;
		},

		getAllCats: function() {
			return model.cats;
		},

		countClick: function() {
			model.currentCat.clicks++;
			viewMain.render();
		},

		showForm: function() {
			viewAdmin.$inputForm.css('display', 'block');
		},
		
		hideForm: function() {
			viewAdmin.$inputForm.css('display', 'none');
		},

		setAdminValues: function(cat) {
			viewAdmin.$nameInput.val(cat.name);
			viewAdmin.$urlInput.val(cat.imgSrc);
			viewAdmin.$clicksInput.val(cat.clicks);
		}
	};
	// each view with own render methods
	var viewMain = {
		init: function() {
			// grab elements and html for using in the render function
			this.$catContainer = $('#cat-container');
			this.$catDiv = $('#cat-div');
			this.$header = $('#name');
			this.$catImg = $('#img');
			this.$clicks = $('#clicks');

			// Delegate event to listen for clicks
			this.$catImg.click(function() {
				octopus.countClick();
				var cat = octopus.getCat();
				octopus.setAdminValues(cat);
			});

			this.render();
		},

		render: function() {
			// render the cat object into the DOM
			var cat = octopus.getCat();
			this.$header.text(cat.name);
			this.$catImg.attr('src', cat.imgSrc);
			this.$clicks.text('Clicks: ' + cat.clicks);
		}
	};

	var viewList = {
		init: function() {
			this.catList = $('#cat-list');
			this.render();
		},

		render: function() {
			// get cats to be rendered from octopus
			var catArray = octopus.getAllCats();

			this.catList.html('');

			// Add cat's names to the side bar using loop
			for (i=0; i<catArray.length; i++) {
				var cat = catArray[i];

				var $listItem = $(document.createElement('li'));
				$listItem.text(cat.name);

				// Closure to add specific cat at the point in time of the loop to each list item
				$listItem.click((function(cat) {
					return function() {
						octopus.setCurrentCat(cat);
						octopus.setAdminValues(cat);

						viewMain.render();
						viewAdmin.render();
					}	
				})(cat));

				this.catList.append($listItem);
			}

		}
	};

	var viewAdmin = {
		init: function() {
			this.$inputForm = $('#input-container');
			this.$adminBtn = $('#admin-btn');
			this.$nameInput = $('#name-input');
			this.$urlInput = $('#url-input');
			this.$clicksInput = $('#clicks-input');
			this.$saveBtn = $('#save-btn');
			this.$cancelBtn = $('#cancel-btn');

			this.$adminBtn.click(function() {
				octopus.showForm();
				var currentCat = octopus.getCat();
				currentCat.admin = true;
				octopus.setAdminValues(currentCat);
			});

			this.$cancelBtn.click(function() {
				octopus.hideForm();
				var currentCat = octopus.getCat();
				currentCat.admin = false;
			});

			this.$saveBtn.click(function() {
				// get values from input boxes
				var name = viewAdmin.$nameInput.val();
				var url = viewAdmin.$urlInput.val();
				var clicks = viewAdmin.$clicksInput.val();

				var currentCat = octopus.getCat();

				// set and change the values for the cat object
				if (name.length != 0) {
					currentCat.name = name;
				}
				if (url.length != 0) {
					currentCat.imgSrc = url;
				}

				// Check if input is a number and is not empty
				if (isNaN(clicks) === false && clicks.length != 0) {
					currentCat.clicks = clicks;
				};

				viewList.render();
				viewMain.render();
				viewAdmin.render();

				octopus.hideForm();
				currentCat.admin = false;
			});

			this.render();
		},

		render: function() {
			var currentCat = octopus.getCat();
			if (currentCat.admin == true) {
				octopus.showForm();
			} else {
				octopus.hideForm();
			};

		}
	};

	octopus.init();
});
*/
