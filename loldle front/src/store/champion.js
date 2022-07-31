import { createSlice } from '@reduxjs/toolkit';

const initialChampionState = {
    champion: {
        id: null,
        name: null,
        image: null,
        gender: null,
        position: null,
        rangeType: null,
        region: null,
        releaseYear: 0,
        resource: null,
        species: null
    }
}

const championSlice = createSlice({
    name: 'champion',
    initialState: initialChampionState,
    reducers: {
        setChampion(state, action) {
            state.champion.id = action.payload.id;
            state.champion.name = action.payload.name;
            state.champion.image = action.payload.image;
            state.champion.gender = action.payload.gender;
            state.champion.position = action.payload.position;
            state.champion.rangeType = action.payload.rangeType;
            state.champion.region = action.payload.region;
            state.champion.releaseYear = action.payload.releaseYear;
            state.champion.resource = action.payload.resource;
            state.champion.species = action.payload.species;
        },
    }
});

export const championActions = championSlice.actions;

export default championSlice.reducer;