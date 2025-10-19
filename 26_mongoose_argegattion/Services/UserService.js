class UserService {
  constructor(models) {
    this.models = models;
  }

  async testMethods() {
    const result = this.models.users.aggregate([{ $match: {} }]);
    return result;
  }

  async addUsers() {
    console.log(this.models);
    const users = this.models.users.insertMany([
      {
        name: 'Sebastian',
        age: 32,
        skills: ['js', 'react', 'next', 'node'],
        points: [21, 48, 52, 3],
        email: 'sebastian@gmail.com',
        salary: 540_000,
        address: { street: 'Kievyan', house: 5 },
        eyeColor: 'black',
      },
      {
        name: 'Jhon',
        age: 25,
        skills: ['html', 'css', 'js', 'react', 'next'],
        points: [33, 41, 8, 70],
        email: 'jhon@gmail.com',
        salary: 810_000,
        address: { street: 'Halabyan', house: 54 },
        eyeColor: 'blue',
      },
      {
        name: 'Emma',
        age: 52,
        skills: ['mysql', 'node', 'modgodb', 'devops'],
        points: [60, 9, 41, 23],
        email: 'emma@gmail.com',
        salary: 1_150_000,
        address: { street: 'Halabyan', house: 54 },
        eyeColor: 'blue',
      },
      {
        name: 'Jackson',
        age: 34,
        skills: ['js', 'react', 'node'],
        points: [33, 52, 10, 72],
        email: 'jackson2000@gmail.com',
        salary: 290_000,
        address: { street: 'Halabyan', house: 54 },
        eyeColor: 'black',
      },
      {
        name: 'Jack',
        age: 29,
        skills: ['js', 'react', 'next'],
        points: [28, 28, 40, 65],
        email: 'jack@gmail.com',
        salary: 540_000,
        address: { street: 'Halabyan', house: 54 },
        eyeColor: 'green',
      },
      {
        name: 'Carter',
        age: 41,
        skills: ['java', 'php', 'mongodb', 'mysql'],
        points: [12, 54, 96, 120],
        email: 'carter@gmail.com',
        salary: 680_000,
        address: { street: 'Halabyan', house: 54 },
        eyeColor: 'brown',
      },
    ]);

    return 'saved';
  }
}

module.exports = UserService;
