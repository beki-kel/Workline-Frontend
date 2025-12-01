import { apiClient } from '@/lib/api-client'
import { Outline } from '../../domain/entities/Outline'
import { IOutlineRepository } from '../../domain/repositories/IOutlineRepository'

export class OutlineRepositoryImpl implements IOutlineRepository {
    async getOutlines(organizationId: string): Promise<Outline[]> {
        const data = await apiClient.get(`/api/organizations/${organizationId}/outlines`)
        return data as Outline[]
    }

    async createOutline(organizationId: string, outline: Omit<Outline, 'id' | 'createdAt' | 'updatedAt' | 'organizationId'>): Promise<Outline> {
        const data = await apiClient.post(`/api/organizations/${organizationId}/outlines`, outline)
        return data as Outline
    }
}
