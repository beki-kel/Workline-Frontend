import { useQuery } from '@tanstack/react-query'
import { OutlineRepositoryImpl } from '../../data/repositories/OutlineRepositoryImpl'
import { GetOutlinesUseCase } from '../usecases/GetOutlinesUseCase'

const outlineRepository = new OutlineRepositoryImpl()
const getOutlinesUseCase = new GetOutlinesUseCase(outlineRepository)

export const useOutlines = (organizationId?: string) => {
    const outlinesQuery = useQuery({
        queryKey: ['outlines', organizationId],
        queryFn: () => getOutlinesUseCase.execute(organizationId!),
        enabled: !!organizationId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    })

    return {
        outlines: outlinesQuery.data || [],
        isLoading: outlinesQuery.isLoading,
        error: outlinesQuery.error,
    }
}
