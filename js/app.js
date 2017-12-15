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
	
	self.catList = ko.observableArray([]);

	initialCats.forEach(function(catItem) {
		self.catList.push( new Cat(catItem) );
	});

	self.currentCat = ko.observable(self.catList()[0]);
	
	self.incrementCounter = function() {
		self.currentCat().clickCount(self.currentCat().clickCount()+1);
	};

	self.changeCat = function() {
		self.currentCat(this);
	};

	self.formVisible = ko.observable(false);
	self.toggleForm = function() {
		self.formVisible(!self.formVisible());
	};

	self.saveForm = function() {
		self.currentCat().name(this.value);
		self.currentCat().imgSrc(this.value);
		self.currentCat().clickCount(this.value);
	}
};

ko.applyBindings(new ViewModel());
