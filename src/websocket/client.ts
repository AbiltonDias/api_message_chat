import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersServices } from '../services/UsersServices';
import { MessagesServices } from '../services/MessageService';

interface IParams {
    text: string;
    email: string;
}

io.on("connect", (socket) => {
    const connectService = new ConnectionsService();
    const usersService = new UsersServices();
    const messagesService = new MessagesServices();

    socket.on("client_first_acess", async (params) => {
        const socket_id = socket.id;
        const { email, text } = params as IParams;
        let user_id = null;

        const userExists = await usersService.findByEmail(email);

        if (!userExists) {
            const user = await usersService.create(email);
            await connectService.create({
                socket_id,
                user_id: user.id,
            });

            user_id = user.id
        } else {
            user_id = userExists.id
            const connection = await connectService.findByUserId(userExists.id);

            if (!connection) {
                await connectService.create({
                    socket_id,
                    user_id: userExists.id,
                })
            } else {
                connection.socket_id = socket_id;
                await connectService.create(connection);
            }
        }

        await messagesService.create({
            text,
            user_id: user_id,
        })

    })
})