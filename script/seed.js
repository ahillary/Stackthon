const {green, red} = require('chalk');
const {User, Product, Order, Cart} = require('../server/db/models');
const db = require('../server/db/');
const {Op} = require('sequelize');

const firstNames = [
  'Alice',
  'Bruno',
  'Cathy',
  'David',
  'Ellie',
  'Fanny',
  'George',
  'Hank',
  'Iris',
  'Jess',
  'Kelly',
  'Lor',
  'Manford',
  'Nigel',
  'Octavius',
  'Pickle',
  'Q',
  'Remmy',
  'Sal',
  'Tank',
  'Ursula',
  'Violet',
  'Wade',
  'Xena',
  'Yas',
  'Zoro',
  'Amos',
  'Dash',
  'Beam',
  'Jian',
  'Keen',
  'Boone',
  'Fox',
  'Sai',
  'Viotto',
];
const lastNames = [
  'Johnson',
  'Abernathy',
  'Confluence',
  'Rivers',
  'Cornelius',
  'Horn',
  'Crawford',
  'Crowfoot',
  'Cunningham',
  'Driscoll',
  'Ellis',
  'Benevolent',
  'Finch',
  'Swindle',
  'Menken',
  'Comforter',
  'Ninomae',
  'Simmons',
  'Victorious',
  'Undergrove',
  'Shrubs',
  'Tree',
  'Vandenberg',
  'Mountain',
  'Webb',
  'Abednego',
  'Cyprus',
  'Dagon',
  'Festus',
  'Griffin',
  'Lightfoot',
  'Luna',
  'Albertine',
  'Godfrey',
  'Royal',
  'Luz',
  'Greathouse',
  'Alastair',
  'Aphelion',
  'Callisto',
  'Gibbethon',
  'Nadir',
  'Sapphirus',
  'Omega',
  'Umbra',
];

const itemAdjective = [
  'fullness',
  'stickiness',
  'beauty',
  'rad!',
  'bodaciousness',
  'brightness',
  'charm',
  'friends',
  'generosity',
  'sincerity',
  'imagination',
  'luck',
  'assistance',
  'sense',
  'romance',
  'power',
  'manners',
  'being plucky',
  'being marvelous',
  'engagement',
  'mirth',
  'spectacularity',
  'glitz',
  'glistening',
  'dazzle',
  'twinkling',
  'lustor',
  'vibrance',
  'vivacity',
  'glow',
  'gleaming',
  'sparkles',
  'brilliance',
  'elegance',
  'enchantment',
  'ravishing',
  'magnificence',
  'captivation',
  'love',
  'charisma',
];

const emailHost = ['gmail', 'hotmail', 'yahoo'];
const userCount = 200;
const productCount = 200;

// const images = [`images from either urls or csv files`]
let bowlImage = `https://i.etsystatic.com/16976526/d/il/7d4b54/2344187124/il_340x270.2344187124_rxpb.jpg?version=0`;
let earringImage = `https://cdn.shopify.com/s/files/1/0736/8211/products/Tear_Drop_Earring_Large_422x.png?v=1568803221`;

// const adminUsers = async () => {
//   let num = 1
//   while (num < 11) {
//     let adminUser = await User.findByPk(num);
//     adminUser.dataValues.isAdmin = true
//     num++
//   }
// }

const users = async () => {
  for (let i = 0; i < 10; i++) {
    let first =
      firstNames[Math.floor(Math.random() * 1000) % firstNames.length];
    let last = lastNames[Math.floor(Math.random() * 1000) % lastNames.length];
    let host = emailHost[Math.floor(Math.random() * 1000) % emailHost.length];
    let email = `${first}.${last}@${host}.com`;
    try {
      await Promise.all([
        User.create({
          firstName: first,
          lastName: last,
          email: email,
          isAdmin: true,
          password: 'password',
        }),
      ]);
    } catch (error) {
      console.log('User Oops!', red(error));
    }
  }
  for (let i = 10; i < userCount; i++) {
    let first =
      firstNames[Math.floor(Math.random() * 1000) % firstNames.length];
    let last = lastNames[Math.floor(Math.random() * 1000) % lastNames.length];
    let host = emailHost[Math.floor(Math.random() * 1000) % emailHost.length];
    let email = `${first}.${last}@${host}.com`;
    try {
      await Promise.all([
        User.create({
          firstName: first,
          lastName: last,
          email: email,
          password: 'password',
        }),
      ]);
    } catch (error) {
      console.log('User Oops!', red(error));
    }
  }
};

const productEarrings = async () => {
  for (let i = 0; i < productCount; i++) {
    let adjective =
      itemAdjective[Math.floor(Math.random() * 1000) % itemAdjective.length];
    let name = `Earrings of ${adjective}`;
    let description = 'This is the next thing you need to own!';
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.random() * 100;
    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: earringImage,
        }),
      ]);
    } catch (error) {
      console.log('Earring Oops!', red(error));
    }
  }
};

const productBowls = async () => {
  for (let i = 0; i < productCount; i++) {
    let adjective =
      itemAdjective[Math.floor(Math.random() * 1000) % itemAdjective.length];
    let name = `Bowls of ${adjective}`;
    let description = 'This is the next thing you need to own!';
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.random() * 100;

    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: bowlImage,
        }),
      ]);
    } catch (error) {
      console.log('Bowl Oops!', red(error));
    }
  }
};

const orders = async () => {
  let order = 1;
  while (order < 100) {
    try {
      for (let i = 1; i < 100; i++) {
        await Promise.all([
          Order.create({
            totalPrice: i,
          }),
        ]);
        order++;
      }
    } catch (error) {
      console.log('Order Oops!', red(error));
    }
  }
};

// this function is first finding some items already in the database, then associating them
async function associations() {
  // gives an array of objects that are newly created orders that meet the where condition
  let ordersToAssoc = await Order.findAll({
    where: {
      totalPrice: {
        [Op.or]: {
          [Op.between]: [50, 90],
        },
      },
    },
  });

  // gives an array of objects that are newly created products that meet the where condition
  // condition: where the name of the Product has this word in the string
  let productsToAssoc = await Product.findAll({
    where: {
      name: {
        [Op.or]: {
          [Op.like]: '%vivacity%',
          [Op.like]: '%generosity%',
          [Op.like]: '%being plucky%',
          [Op.like]: '%imagination%',
          [Op.like]: '%luck%',
        },
      },
    },
  });

  // associations loop
  let productIndex = 0;
  for (let i = 0; i < productsToAssoc.length; i++) {
    await ordersToAssoc[i].addProducts([productsToAssoc[productIndex]]);
    productIndex++;
  }
}

const seed = async () => {
  await db.sync({force: true});
  console.log(green('db synced!'));
  await Promise.all([users(), productEarrings(), productBowls(), orders()]);
  await associations();
};

async function runSeed() {
  console.log(green('seeding...'));
  try {
    await seed();
  } catch (error) {
    console.log('error seeding: ', red(error));
  }
}

// We've separated the `seed` function from the `runSeed` function. This way we can isolate the error handling and exit trapping. The `seed` function is concerned only with modifying the database.

// Execute the `seed` function, IF we ran this module directly (`node seed`).
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
