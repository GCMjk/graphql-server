import { IResolvers } from '@graphql-tools/utils';
import UsersService from './../../services/users.service';

const queryUserResolvers: IResolvers = {
    Query: {

        async users(_, variables, context) {
            return new UsersService(_, {
                pagination: variables
            }, context).items();
        },
        async login(_, { email, password }, context) {
            return new UsersService(_, { user: { email, password }}, context).login();
        },
        async me(_, __, { token }) {
            return new UsersService(_, __, { token }).auth();
        }

    }
};

export default queryUserResolvers;