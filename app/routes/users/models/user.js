import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'
import validator from 'validator'
import crypto from 'crypto'

import config from 'config'
import ERRORS from 'constants/errors'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: ERRORS.REG.EMAIL_IS_REQUIRED,
        unique: ERRORS.REG.EMAIL_EXIST,
        validate: {
            validator: value => validator.isEmail(value),
            message: props => {
                //`Email ${props.value} указан неверно.`
                return ERRORS.REG.EMAIL_NOT_VALID
            }
        }
    },
    confirmToken: {
        type: String,
        index: true,
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false,
    },
    displayName: {
        type: String,
        required: ERRORS.REG.DISPLAY_NAME_IS_REQUIRED,
    },
    passwordHash:  {
        type: String,
    },
    salt:          {
        type: String,
    },
}, {
    timestamps: true,
})

UserSchema.virtual('password')
    .set(function(password) {
        if (!password || password.length < 4) {
            this.invalidate('password', ERRORS.REG.PASSWORD_TOO_SHORT)
        }

        this.salt = crypto.randomBytes(config.crypto.hash.length).toString('base64')
        this.passwordHash = crypto.pbkdf2Sync(
            password,
            this.salt,
            config.crypto.hash.iterations,
            config.crypto.hash.length,
            'sha512'
        ).toString('base64')
    })

UserSchema.methods.validPassword = function(password) {
    if (!password) return false
    if (!this.passwordHash) return false

    return crypto.pbkdf2Sync(
        password,
        this.salt,
        config.crypto.hash.iterations,
        config.crypto.hash.length,
        'sha512'
    ).toString('base64') === this.passwordHash
}

UserSchema.statics.publicFields = ['email', 'displayName']
UserSchema.statics.requiredFields = ['email', 'displayName', 'password']
UserSchema.statics.requiredVirtuals = ['password']

UserSchema.plugin(beautifyUnique)

const User = mongoose.model('User', UserSchema)

module.exports = User