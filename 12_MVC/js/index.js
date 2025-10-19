/* __________________vew___________________________ */

const view = {
  showNumber(n) {
    const elem = document.getElementById('root');
    elem.innerHTML = n;
  },
};
/* __________________model_________________________ */

const model = {
  number: 0,
  caunt(a, b) {
    this.number = a * b;
    const result = this.number;
    view.showNumber(result);
  },
};

/* __________________controler_____________________ */

const controller = {
  handle() {
    model.caunt(3, 4);
  },
};

/* __________________anunymous function___________________________ */
(function appt() {
  const app = {
    init() {
      this.main();
      this.event();
    },
    main() {
      console.log('main');
    },
    event() {
      const elem2 = document.getElementById('btn');
      elem2.onclick = controller.handle;
    },
  };
  app.init(); // npm start
})();

app.get('/hotels', controller.handle(hotels), (req, res) => {
  res.send(controller);
});
