import { TokenService } from '@loopback/authentication';
import { Credentials, MyUserService, User, UserRepository } from '@loopback/authentication-jwt';
import { Filter, FilterExcludingWhere } from '@loopback/repository';
import { SchemaObject } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { KeyAndPassword, ResetPasswordInit } from '../models';
import { EmailService } from '../services';
export declare class NewUserRequest extends User {
    email: string;
    password: string;
}
export declare const CredentialsRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
        };
    };
};
export declare class UserController {
    jwtService: TokenService;
    userService: MyUserService;
    user: UserProfile;
    protected userRepository: UserRepository;
    emailService: EmailService;
    constructor(jwtService: TokenService, userService: MyUserService, user: UserProfile, userRepository: UserRepository, emailService: EmailService);
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    whoAmI(currentUserProfile: UserProfile): Promise<string>;
    signUp(newUserRequest: NewUserRequest): Promise<User>;
    find(filter?: Filter<User>): Promise<User[]>;
    findEmail(email: string): Promise<User[]>;
    findById(id: string, filter?: FilterExcludingWhere<User>): Promise<User>;
    deleteById(id: string): Promise<void>;
    replaceById(id: string, user: User): Promise<void>;
    resetPasswordInit(resetPasswordInit: ResetPasswordInit): Promise<any>;
    validateEmail(email: string): Promise<string>;
    resetPasswordFinish(keyAndPassword: KeyAndPassword): Promise<string>;
    validateKeyPassword(keyAndPassword: KeyAndPassword): Promise<KeyAndPassword>;
}
