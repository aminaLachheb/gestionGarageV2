"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.CredentialsRequestBody = exports.NewUserRequest = void 0;
const tslib_1 = require("tslib");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const bcryptjs_1 = require("bcryptjs");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const uuid_1 = require("uuid");
const models_1 = require("../models");
const services_1 = require("../services");
var applyFilter = require('loopback-filters');
const filter = require('promise-filter');
let NewUserRequest = class NewUserRequest extends authentication_jwt_1.User {
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], NewUserRequest.prototype, "email", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], NewUserRequest.prototype, "password", void 0);
NewUserRequest = tslib_1.__decorate([
    repository_1.model()
], NewUserRequest);
exports.NewUserRequest = NewUserRequest;
const CredentialsSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
            uniqueItems: true,
        },
        password: {
            type: 'string',
            minLength: 4,
        },
    },
};
exports.CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': { schema: CredentialsSchema },
    },
};
let UserController = class UserController {
    constructor(jwtService, userService, user, userRepository, emailService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.user = user;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    async login(credentials) {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }
    //@authenticate('jwt')
    async whoAmI(currentUserProfile) {
        return currentUserProfile[security_1.securityId];
    }
    async signUp(newUserRequest) {
        const password = await bcryptjs_1.hash(newUserRequest.password, await bcryptjs_1.genSalt());
        const savedUser = await this.userRepository.create(lodash_1.default.omit(newUserRequest, 'password'));
        await this.userRepository.userCredentials(savedUser.id).create({ password });
        return savedUser;
    }
    //@authenticate('jwt')
    async find(filter) {
        return this.userRepository.find(filter);
    }
    async findEmail(email) {
        return this.userRepository.find({ where: { email: email } });
    }
    async findById(id, filter) {
        return this.userRepository.findById(id, filter);
    }
    //@authenticate('jwt')
    async deleteById(id) {
        await this.userRepository.deleteById(id);
    }
    //@authenticate('jwt')
    async replaceById(id, user) {
        await this.userRepository.replaceById(id, user);
    }
    async resetPasswordInit(resetPasswordInit) {
        // checks whether email is valid as per regex pattern provided
        const email = await this.validateEmail(resetPasswordInit.email);
        // At this point we are dealing with valid email.
        // Lets check whether there is an associated account
        const foundUser = await this.userRepository.findOne({
            where: { email },
        });
        console.log('foundUser', foundUser);
        console.log('email', email);
        // No account found
        if (!foundUser) {
            throw new rest_1.HttpErrors.NotFound('No account associated with the provided email address.');
        }
        // We generate unique reset key to associate with reset request
        foundUser.resetKey = uuid_1.v4();
        try {
            // Updates the user to store their reset key with error handling
            await this.userRepository.updateById(foundUser.id, foundUser);
        }
        catch (e) {
            if (typeof e === "string") {
                return e.toUpperCase(); // works, `e` narrowed to string
            }
            else if (e instanceof Error) {
                return e.message; // works, `e` narrowed to Error
            }
        }
        // Send an email to the user's email address
        const nodeMailer = await this.emailService.sendResetPasswordMail(foundUser);
        // Nodemailer has accepted the request. All good
        if (nodeMailer.accepted.length) {
            return foundUser.resetKey;
        }
        // Nodemailer did not complete the request alert the user
        throw new rest_1.HttpErrors.InternalServerError('Error sending reset password email');
    }
    async validateEmail(email) {
        const emailRegPattern = /\S+@\S+\.\S+/;
        if (!emailRegPattern.test(email)) {
            throw new rest_1.HttpErrors.UnprocessableEntity('Invalid email address');
        }
        return email;
    }
    async resetPasswordFinish(keyAndPassword) {
        // Checks whether password and reset key meet minimum security requirements
        const { resetKey, password } = await this.validateKeyPassword(keyAndPassword);
        // Search for a user using reset key
        const foundUser = await this.userRepository.findOne({
            where: { resetKey: resetKey },
        });
        // No user account found
        if (!foundUser) {
            throw new rest_1.HttpErrors.NotFound('No associated account for the provided reset key');
        }
        // Encrypt password to avoid storing it as plain text
        const passwordHash = await bcryptjs_1.hash(password, await bcryptjs_1.genSalt());
        try {
            // Update user password with the newly provided password
            await this.userRepository
                .userCredentials(foundUser.id)
                .patch({ password: passwordHash });
            // Remove reset key from database its no longer valid
            foundUser.resetKey = '';
            // Update the user removing the reset key
            await this.userRepository.updateById(foundUser.id, foundUser);
        }
        catch (e) {
            if (typeof e === "string") {
                return e.toUpperCase(); // works, `e` narrowed to string
            }
            else if (e instanceof Error) {
                return e.message; // works, `e` narrowed to Error
            }
        }
        return 'Password reset request completed successfully';
    }
    async validateKeyPassword(keyAndPassword) {
        if (!keyAndPassword.password || keyAndPassword.password.length < 8) {
            throw new rest_1.HttpErrors.UnprocessableEntity('Password must be minimum of 8 characters');
        }
        if (keyAndPassword.password !== keyAndPassword.confirmPassword) {
            throw new rest_1.HttpErrors.UnprocessableEntity('Password and confirmation password do not match');
        }
        if (keyAndPassword.resetKey.length === 0 ||
            keyAndPassword.resetKey.trim() === '') {
            throw new rest_1.HttpErrors.UnprocessableEntity('Reset key is mandatory');
        }
        return keyAndPassword;
    }
};
tslib_1.__decorate([
    rest_1.post('/users/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody(exports.CredentialsRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    rest_1.get('/whoAmI', {
        responses: {
            '200': {
                description: 'Return current user',
                content: {
                    'application/json': {
                        schema: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "whoAmI", null);
tslib_1.__decorate([
    rest_1.post('/users/signup', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': authentication_jwt_1.User,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(NewUserRequest, {
                    title: 'NewUser',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [NewUserRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
tslib_1.__decorate([
    rest_1.get('/users'),
    rest_1.response(200, {
        description: 'Array of Document model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(authentication_jwt_1.User, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(authentication_jwt_1.User)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.get('/users/{email}'),
    rest_1.response(200, {
        description: 'user model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(authentication_jwt_1.User, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findEmail", null);
tslib_1.__decorate([
    rest_1.get('/users/id/{id}'),
    rest_1.response(200, {
        description: 'users model instance',
        content: {
            'application/json': {
                type: 'array',
                schema: rest_1.getModelSchemaRef(authentication_jwt_1.User, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(authentication_jwt_1.User, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.del('/users/{id}'),
    rest_1.response(204, {
        description: 'User DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.put('/users/{id}'),
    rest_1.response(204, {
        description: 'User PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, authentication_jwt_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.post('/users/reset-password/init'),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.ResetPasswordInit]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "resetPasswordInit", null);
tslib_1.__decorate([
    rest_1.put('/users/reset-password/finish'),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.KeyAndPassword]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "resetPasswordFinish", null);
UserController = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__param(1, core_1.inject(authentication_jwt_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(2, core_1.inject(security_1.SecurityBindings.USER, { optional: true })),
    tslib_1.__param(3, repository_1.repository(authentication_jwt_1.UserRepository)),
    tslib_1.__param(4, core_1.inject('services.EmailService')),
    tslib_1.__metadata("design:paramtypes", [Object, authentication_jwt_1.MyUserService, Object, authentication_jwt_1.UserRepository,
        services_1.EmailService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map