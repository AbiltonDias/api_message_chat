import { Request, Response} from 'express'
import { MessagesServices} from '../services/MessageService';

export class MessageController{
    async create(request: Request, response:Response):Promise<Response>{
        const { admin_id, text, user_id} = request.body;
        const messagesService = new MessagesServices();

        try {
            const message = messagesService.create({
                admin_id,
                text,
                user_id,
            });
    
            return response.status(201).json(message);
        } catch (error) {
            return response.status(400).json({
                message: error.message,
            })
        }
       
    }

    async showByUser(request: Request, response: Response):Promise<Response>{
        const { id } = request.params;

        const messageService = new MessagesServices();
        const list = messageService.listByUser(id);

        return response.status(200).json(list);
    }
}