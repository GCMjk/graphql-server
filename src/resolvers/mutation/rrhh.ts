import { IResolvers } from '@graphql-tools/utils';
import PermissionService from '../../services/rrhh/permission.service';
import ContactService from '../../services/rrhh/contact.service';
import JobService from '../../services/rrhh/job.service';
import VacantService from '../../services/rrhh/vacant.service';

const mutationRrhhResolvers: IResolvers = {
    Mutation: {

        addPermission(_, variables, context) {
            return new PermissionService(_, variables, context).insert();
        },
        updatePermission(_, variables, context) {
            return new PermissionService(_, variables, context).modify();
        },
        deletePermission(_, variables, context) {
            return new PermissionService(_, variables, context).delete();
        },
        addContact(_, variables, context) {
            return new ContactService(_, variables, context).insert();
        },
        addJob(_, variables, context) {
            return new JobService(_, variables, context).insert();
        },
        addVacant(_, variables, context) {
            return new VacantService(_, variables, context).insert();
        }

    }
};

export default mutationRrhhResolvers;