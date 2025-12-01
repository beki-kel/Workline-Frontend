import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Invitation } from "../../domain/entities/Invitation"
import { Check, X, Building2, Calendar } from "lucide-react"

interface InvitationsListProps {
    invitations: Invitation[]
    onAccept: (invitationId: string) => Promise<void>
    onReject: (invitationId: string) => Promise<void>
}

export function InvitationsList({ invitations, onAccept, onReject }: InvitationsListProps) {
    if (invitations.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                        No invitations at the moment.
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {invitations.map((invitation) => (
                <Card key={invitation.id}>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                {invitation.organization.logo ? (
                                    <img
                                        src={invitation.organization.logo}
                                        alt={invitation.organization.name}
                                        className="h-10 w-10 rounded-md object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                                        <Building2 className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                )}
                                <div>
                                    <CardTitle className="text-lg">
                                        {invitation.organization.name}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {invitation.email}
                                    </p>
                                </div>
                            </div>
                            <Badge variant="secondary" className="capitalize">
                                {invitation.role}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    Expires: {new Date(invitation.expiresAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onReject(invitation.id)}
                                >
                                    <X className="h-4 w-4 mr-1" />
                                    Decline
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => onAccept(invitation.id)}
                                >
                                    <Check className="h-4 w-4 mr-1" />
                                    Accept
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
