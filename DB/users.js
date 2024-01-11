const userMock = {
  name: "name",
  email: "email@email.com",
  dailyCalories: 2200,
  dailyActivity: 110,
  settings: {
    height: 180, // number; minimum 150(cm); required
    currentWeight: 70, // number; minimum 35(kg); required
    desiredWeight: 60, // number; minimum 35(kg); required
    birthday: "2005-01-11T00:00:00.000Z", // - date; must be older than 18 years;  required
    blood: 1, // number; allowed values 1, 2, 3, 4; required
    sex: "male", // string; allowed values "male", "female"; required
    levelActivity: 3, // - number; allowed values 1, 2, 3, 4, 5; required
  },
};

module.exports = userMock;
