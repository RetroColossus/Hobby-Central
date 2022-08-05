const User = require('./User');
const Hobby = require('./Hobby');
const Comment = require('./Comment');

User.hasMany(Hobby, {
	foreignKey : 'user_id'
});

Hobby.belongsTo(User, {
	foreignKey : 'user_id'
});

Comment.belongsTo(User, {
	foreignKey : 'user_id'
});

Comment.belongsTo(Hobby, {
	foreignKey : 'hobby_id'
});

User.hasMany(Comment, {
	foreignKey : 'user_id'
});

Hobby.hasMany(Comment, {
	foreignKey : 'hobby_id'
});

module.exports = { User, Hobby, Comment };