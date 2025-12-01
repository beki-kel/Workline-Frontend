import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrganizationsState {
    activeOrganizationId: string | null
}

const initialState: OrganizationsState = {
    activeOrganizationId: null,
}

export const organizationsSlice = createSlice({
    name: 'organizations',
    initialState,
    reducers: {
        setActiveOrganization: (state, action: PayloadAction<string>) => {
            state.activeOrganizationId = action.payload
        },
        clearActiveOrganization: (state) => {
            state.activeOrganizationId = null
        },
    },
})

export const { setActiveOrganization, clearActiveOrganization } = organizationsSlice.actions
export default organizationsSlice.reducer
