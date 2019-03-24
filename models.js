const Sequelize = require('sequelize');
let sequelize;
if (process.env.DATABASE_URL) {
  console.log('called');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    logging:  true,
    operatorsAliases: false,
    define: {
      underscored: true
    }
  });
} else {
  sequelize = new Sequelize({
  database: 'everybody_eats_db',
  dialect: 'postgresql',
  operatorAliases: false,
  define: {
    underscored: true,
  },
});
}
const User = sequelize.define( 'user', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true, // checks if email is already being used
    allowNull: false,
    validate: {
      isEmail: { // checks if input is in email form
        msg: 'please enter a valid email address'
      },
      notNull: { // message given if null
        msg: 'please enter an email address'
      }
    }
  },
  username: {
    type: Sequelize.STRING,
    unique: true, // checks if username is already being used
    allowNull: false,
    validate: {
      notNull: { // message given if null
        msg: 'please enter a username'
      }
    }
  },
  password_digest: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: { // message given if null
        msg: 'please enter a password'
      }
    }
  },
});

const Event = sequelize.define( 'Event', {
  event_name: Sequelize.STRING,
  event_location: Sequelize.STRING,
  event_date: Sequelize.DATE,
  event_details: Sequelize.STRING,
}, {
  timestamps: false
});

// many to many
User.belongsToMany(Event, { through: 'event_users' });
Event.belongsToMany(User, { through: 'event_users' });

module.exports = {
  User,
  Event,
  sequelize
}
