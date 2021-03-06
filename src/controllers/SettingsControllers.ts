import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

export class SettingsController {

    async create(request: Request, response: Response) {
        const { chat, username } = request.body;
        console.log('Usuario no Controller: ' + username)
        const settingsService = new SettingsService();

        try {
            const settings = await settingsService.create({ chat, username });
            return response.status(201).json(settings);

        } catch (error) {
            return response.status(400).json({
                message: error.message,
            })
        }
    }

    async findByUsername(request: Request, response: Response) {
        const { username } = request.params;

        const settingsService = new SettingsService();

        console.log("Find by username SettingsController: " + username);
        const settings = await settingsService.findByUserName(username);

        return response.json(settings);

    }

    async update(request: Request, response: Response) {
        const { username } = request.params;
        const { chat } = request.body;

        const settingsService = new SettingsService();

        const settings = await settingsService.update(username, chat);

        return response.json(settings);

    }

}