const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Note = require('./models/Note');

const resolvers = {
  Query: {
    getNotes: async (_, args, { user }) => {
      if (!user) throw new Error('Not Authenticated');
      return Note.find({ user: user._id });
    }
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const user = new User({ username, email, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, 'your_secret_key');
      return { token };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');
      const token = jwt.sign({ userId: user._id }, 'your_secret_key');
      return { token };
    },
    addNote: async (_, { title, content }, { user }) => {
      if (!user) throw new Error('Not Authenticated');
      const note = new Note({ title, content, user: user._id });
      await note.save();
      return note;
    },
    deleteNote: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not Authenticated');
      await Note.deleteOne({ _id: id, user: user._id });
      return 'Note deleted';
    }
  }
};

module.exports = resolvers;
