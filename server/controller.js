const axios = require("axios");
const bcrypt = require("bcryptjs");
const users = [];
const randomNumber = (array) => {
  return Math.floor(Math.random() * array.length);
};

module.exports = {
  compliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    let randomIndex = randomNumber(compliments);
    let randomCompliment = compliments[randomIndex];
    res.status(200).send(randomCompliment);
  },
  fortune: (req, res) => {
    const fortunes = [
      "A beautiful, smart, and loving person will be coming into your life.",
      "A dubious friend may be an enemy in camouflage.",
      "A faithful friend is a strong defense.",
      "A golden egg of opportunity falls into your lap this month.",
      "An acquaintance of the past will affect you in the near future.",
    ];

    let randomIndex = randomNumber(fortunes);
    let randomFortune = fortunes[randomIndex];
    res.status(200).send(randomFortune);
  },

  getWeather: (req, res) => {
    let city = req.params.city;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b825a4c3bc1dad5c4c633a3c8d45bdee`
      )
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log({ error: err });
        res.status(400).send("Could not find the data you were looking for");
      });
  },

  motivationEntry: (req, res) => {
    const newEntry = req.body.entry;
    res.status(200).send(newEntry);
    console.log(newEntry);
  },
  login: (req, res) => {
    console.log("Logging In User");
    console.log(req.body);
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        const authenticId = bcrypt.compareSync(password, users[i].passwordHash);
        if (authenticId) {
          let userToReturn = { ...users[i] };
          delete userToReturn.passwordHash;
          res.status(200).send(userToReturn);
          return;
          // If no return statement the code will move on to execute the next line (res.status(400).)
          //because it is a for loop we are using (and they are within the same block), after it finishes
          // it usually executes the next line,but since we use 'return' statement it stops
          // itexcecuting codes, because 'return' statment stops the following codes from beong
          // run/exceuted within the same block.
        }
      }
    }
    res.status(400).send("User not found.");
  },
  register: (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;
    const salt = bcrypt.genSaltSync(5);
    const passwordHash = bcrypt.hashSync(password, salt);
    let userObj = {
      username,
      email,
      firstName,
      lastName,
      passwordHash,
    };
    users.push(userObj);
    let userToReturn = { ...userObj };
    delete userToReturn.passwordHash;
    res.status(200).send(userToReturn);
    console.log("Registering User");
    //console.log(users);
    console.log(userObj);
  },
};
