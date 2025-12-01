import { apiClient } from "@/lib/api-client";
import { Member } from "../../domain/entities/Member";
import { IMemberRepository } from "../../domain/repositories/IMemberRepository";
import { MemberRole } from "@/features/Organizations/domain/entities/Organization";

export class MembersRepositoryImpl implements IMemberRepository {
    async getMembers(organizationId: string): Promise<Member[]> {
        const data = await apiClient.get(`/api/organizations/${organizationId}/members`);
        return data as Member[];
    }

    async removeMember(organizationId: string, userId: string): Promise<void> {
        await apiClient.delete(`/api/organizations/${organizationId}/members/${userId}`);
    }

    async updateRole(organizationId: string, userId: string, role: MemberRole): Promise<void> {
        await apiClient.put(`/api/organizations/${organizationId}/members/${userId}`, { role });
    }

    async inviteMember(email: string, role: MemberRole, organizationId: string): Promise<void> {
        await apiClient.post('/api/auth/organization/invite-member', {
            email,
            role,
            organizationId
        });
    }
}
