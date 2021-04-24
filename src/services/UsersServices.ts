import { UserRepository } from '../repositories/UsersRepository';
import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UsersServices {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UserRepository);
    }

    async create(email: string) {
        const name = 'IGNORE NAME!'

        const userAlreadyExists = await this.usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            return userAlreadyExists;
        }

        const user = await this.usersRepository.create({
            name,
            email,
        });

        await this.usersRepository.save(user);
        return user;
    }

    async findByEmail(email: string) {
        const userAlreadyExists = await this.usersRepository.findOne({
            email
        });
        return userAlreadyExists;
    }
}