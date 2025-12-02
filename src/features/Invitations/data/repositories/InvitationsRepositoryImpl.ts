import { IInvitationRepository } from "../../domain/repositories/IInvitationRepository";
import { Invitation } from "../../domain/entities/Invitation";
import { authClient } from "@/lib/auth-client";

export class InvitationsRepositoryImpl implements IInvitationRepository {
    async getReceivedInvitations(): Promise<Invitation[]> {
        console.log('🔔 Fetching received invitations for current user');

        try {
            const response = await fetch('/api/auth/invitation/list-user', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('📡 Response status:', response.status, response.statusText);

            if (!response.ok) {
                console.error('❌ Failed to fetch received invitations:', response.status);
                throw new Error('Failed to fetch received invitations');
            }

            const data = await response.json();
            console.log('✅ Received invitations fetched successfully:', data.length, 'invitations');
            console.log('📦 Invitations data:', JSON.stringify(data, null, 2));

            return data as Invitation[];
        } catch (error) {
            console.error('❌ Error fetching received invitations:', error);
            throw new Error(error instanceof Error ? error.message : "Failed to fetch received invitations");
        }
    }

    async getSentInvitations(organizationId: string): Promise<Invitation[]> {
        console.log('🔔 Fetching sent invitations for organization:', organizationId);

        try {
            const response = await fetch(`/api/auth/organization/list-invitations?organizationId=${organizationId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('📡 Response status:', response.status, response.statusText);

            if (!response.ok) {
                console.error('❌ Failed to fetch sent invitations:', response.status);
                throw new Error('Failed to fetch sent invitations');
            }

            const data = await response.json();
            console.log('✅ Sent invitations fetched successfully:', data.length, 'invitations');
            console.log('📦 Invitations data:', JSON.stringify(data, null, 2));

            return data as Invitation[];
        } catch (error) {
            console.error('❌ Error fetching sent invitations:', error);
            throw new Error(error instanceof Error ? error.message : "Failed to fetch sent invitations");
        }
    }

    async acceptInvitation(invitationId: string): Promise<void> {
        console.log('🔔 Accepting invitation:', invitationId);

        const { error } = await authClient.organization.acceptInvitation({
            invitationId
        });

        if (error) {
            console.error('❌ Failed to accept invitation:', error);
            throw new Error(error.message || "Failed to accept invitation");
        }

        console.log('✅ Invitation accepted successfully');
    }

    async rejectInvitation(invitationId: string): Promise<void> {
        console.log('🔔 Rejecting invitation:', invitationId);

        const { error } = await authClient.organization.rejectInvitation({
            invitationId
        });

        if (error) {
            console.error('❌ Failed to reject invitation:', error);
            throw new Error(error.message || "Failed to reject invitation");
        }

        console.log('✅ Invitation rejected successfully');
    }
}
