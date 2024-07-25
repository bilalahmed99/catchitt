import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GeoState = {
    country_name: string | null;
    country_calling_code: string | null;
    country_code: string | null;
};

const initialState: GeoState = {
    country_name: null,
    country_calling_code: null,
    country_code: null,
};

const geoSlice = createSlice({
    name: 'geo',
    initialState,
    reducers: {
        setGeoData: (state, action: PayloadAction<GeoState>) => {
            state.country_name = action.payload.country_name;
            state.country_calling_code = action.payload.country_calling_code;
            state.country_code = action.payload.country_code;
        },
    },
});

export const { setGeoData } = geoSlice.actions;

export default geoSlice.reducer;
