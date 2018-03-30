
const Chance = require("chance");
const Bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 10;
const chance = new Chance();

const md5 = require('md5');

module.exports = {

  generateRandomUser: (inputFirstName, inputLastName, email, password) => {
    const gender    = chance.gender();
    const firstName = inputFirstName;
    const lastName  = inputLastName;
    const userName  = firstName + " " + lastName;


    let userHandle = "@";

    userHandle += lastName;

    if (Math.random() > 0.5) {
      const suffix = Math.round(Math.random() * 100);
      userHandle += suffix;
    }

    const avatarUrlPrefix = `https://vanillicon.com/${md5(userHandle)}`;
    const avatars = {
      small:   `${avatarUrlPrefix}_50.png`,
      regular: `${avatarUrlPrefix}.png`,
      large:   `${avatarUrlPrefix}_200.png`
    };

    return {
      name: userName,
      handle: userHandle,
      avatars: avatars,
      email: email,
      passwordHash: Bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS)
    };
  }
};
