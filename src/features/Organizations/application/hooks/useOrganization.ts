import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { OrganizationRepositoryImpl } from '../../data/repositories/OrganizationRepositoryImpl'
import { GetOrganizationsUseCase } from '../usecases/GetOrganizationsUseCase'
import { CreateOrganizationUseCase } from '../usecases/CreateOrganizationUseCase'
import { SetActiveOrganizationUseCase } from '../usecases/SetActiveOrganizationUseCase'
import { authClient } from '@/lib/auth-client'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { setActiveOrganization as setActiveOrgRedux } from '@/lib/features/organizations/organizationsSlice'
import { useEffect } from 'react'

// Initialize repository and use cases
const organizationRepository = new OrganizationRepositoryImpl()
const getOrganizationsUseCase = new GetOrganizationsUseCase(organizationRepository)
const createOrganizationUseCase = new CreateOrganizationUseCase(organizationRepository)
const setActiveOrganizationUseCase = new SetActiveOrganizationUseCase(organizationRepository)

export const useOrganization = () => {
    const queryClient = useQueryClient()
    const { data: session } = authClient.useSession()
    const dispatch = useAppDispatch()
    const activeOrganizationId = useAppSelector((state) => state.organizations.activeOrganizationId)

    const organizationsQuery = useQuery({
        queryKey: ['organizations'],
        queryFn: () => getOrganizationsUseCase.execute(),
        enabled: !!session,
    })

    const createOrganizationMutation = useMutation({
        mutationFn: (params: { name: string; slug: string }) =>
            createOrganizationUseCase.execute(params.name, params.slug),
        onSuccess: async (newOrg) => {
            await queryClient.invalidateQueries({ queryKey: ['organizations'] })
            // Auto-switch to the newly created organization
            if (newOrg?.id) {
                dispatch(setActiveOrgRedux(newOrg.id))
            }
        },
    })

    const setActiveOrganizationMutation = useMutation({
        mutationFn: (organizationId: string) =>
            setActiveOrganizationUseCase.execute(organizationId),
        onSuccess: async (_, organizationId) => {
            await queryClient.invalidateQueries({ queryKey: ['session'] })
            await queryClient.invalidateQueries({ queryKey: ['organizations'] })
            dispatch(setActiveOrgRedux(organizationId))
            authClient.getSession()
        },
    })

    // Sync Redux with session on mount
    useEffect(() => {
        if (session?.session?.activeOrganizationId && !activeOrganizationId) {
            dispatch(setActiveOrgRedux(session.session.activeOrganizationId))
        }
    }, [session?.session?.activeOrganizationId, activeOrganizationId, dispatch])

    // Auto-select first organization if user has orgs but no active org
    useEffect(() => {
        const organizations = organizationsQuery.data || []
        if (organizations.length > 0 && !activeOrganizationId && !organizationsQuery.isLoading) {
            const firstOrg = organizations[0]
            if (firstOrg?.id) {
                setActiveOrganizationMutation.mutate(firstOrg.id)
            }
        }
    }, [organizationsQuery.data, activeOrganizationId, organizationsQuery.isLoading, setActiveOrganizationMutation])

    // Derived active organization ID: prefer Redux state, fallback to first org
    const derivedActiveOrganizationId = activeOrganizationId || (organizationsQuery.data?.[0]?.id ?? null)

    // Sync Redux with derived state if needed
    useEffect(() => {
        if (!activeOrganizationId && derivedActiveOrganizationId) {
            dispatch(setActiveOrgRedux(derivedActiveOrganizationId))
        }
    }, [activeOrganizationId, derivedActiveOrganizationId, dispatch])

    return {
        organizations: organizationsQuery.data || [],
        isLoading: organizationsQuery.isLoading || !session,
        error: organizationsQuery.error,
        createOrganization: createOrganizationMutation.mutateAsync,
        setActiveOrganization: setActiveOrganizationMutation.mutateAsync,
        activeOrganizationId: derivedActiveOrganizationId,
    }
}
