import { services } from 'ask-sdk-model'
import Client from './client'

import reminderManagement = services.reminderManagement

export class ReminderAPIClient extends Client {
    protected path = '/v1/alerts/reminders'
    public async deleteReminder (alertId: string): Promise<void> {
        return this.delete(alertId)
    }

    /**
     *
     * @param {string} alertId
     */
    public async getReminder (alertId: string): Promise<reminderManagement.GetReminderResponse> {
        return this.get(alertId)
    }

    /**
     *
     * @param {string} alertId
     * @param {reminderManagement.ReminderRequest} reminderRequest
     */
    public async updateReminder (alertId: string, reminderRequest: reminderManagement.ReminderRequest): Promise<reminderManagement.ReminderResponse> {
        return this.put(reminderRequest, alertId)
    }

    /**
     *
     */
    public async getReminders (): Promise<reminderManagement.GetRemindersResponse> {
        return this.get()
    }

    /**
     *
     * @param {reminderManagement.ReminderRequest} reminderRequest
     */
    public async createReminder (reminderRequest: reminderManagement.ReminderRequest): Promise<reminderManagement.ReminderResponse> {
        return this.post(reminderRequest)
    }
}
