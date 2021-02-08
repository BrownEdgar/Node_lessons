/* __________________vew___________________________ */

const view ={
	showNumber: function(n){
		let elem = document.getElementById("root");
		elem.innerHTML = n;
	}
};
/* __________________model_________________________ */

const model ={
	number:0,
caunt: function(a, b) {
		this.number = a * b;
		let result = this.number;
		view.showNumber(result);
	}
};


/* __________________controler_____________________ */

const controller = {
	handle: function() {
		model.caunt(3, 4);
	}
};

/* __________________anunymous function___________________________ */
(function appt(){
	const app = {
		init: function () {
			this.main();
			this.event();
		},
		main: function(){
			console.log("main")
		},
		event: function () {
			let elem2 = document.getElementById("btn");
			elem2.onclick = controller.handle;
		}
	};	
	app.init();//npm start
}());


app.get("/hotels", controller.handle(hotels), function(req,res){
	res.send(controller)
})
