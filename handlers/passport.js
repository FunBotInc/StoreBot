const passport = require('passport');
const mongoose = require('mongoose');
const Account = mongoose.model('Account');

// createStrategy is from passport-local-mongoose plugin on the Account model
passport.use(Account.createStrategy());

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
