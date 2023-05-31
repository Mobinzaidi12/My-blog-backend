const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

userSchema.pre('user', async (next) => {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})


module.exports = mongoose.model('User', userSchema);
