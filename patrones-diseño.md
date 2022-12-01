# Evaluación Técnica de Sistemas Creative Media -- Patrones de Diseño

## State
Este patron encapsula los estados de una aplicación para modificar su comportamiento.

Un patrón de este tipo de arquitectura de datos es REDUX.

Redux un store que contiene los datos de la aplicación y su estado. Estos datos se modifican cuando se lanzan acciones a través de un dispatcher, el cual se procesa a través de reducers y que hacen un cambio del estado en el Store que asu vez viaja hacia la vista que ve el usuario.

Lo utilicé en el mi proyecto de una SPA de países, en el cual se modificó el comportamiento de una API pública de países y le permitió agregar actividades a realizar en cada país.

Se planteó de la siguiente forma:

1. Se estableció un store donde se guardaban los datos:

        import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
        import { rootReducer } from '../reducer'
        import thunk from 'redux-thunk';

        const composeEnhancer = (typeof window !== 'undefined' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
            compose;

        const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

        export default store;

2. Se establecieron las acciones que realizaban los cambios en el store:

        import axios from "axios";
        import { FILTER_CONTINENT, SET_COUNTRIES, SET_COUNTRY_DETAIL, ORDER_COUNTRIES_BY_POPULATION_ASC, ORDER_COUNTRIES_BY_NAME_ASC, ORDER_COUNTRIES_BY_NAME_DESC, ORDER_COUNTRIES_BY_POPULATION_DESC, CREATE_ACTIVITY, FILTER_ACTIVITY, SET_ACTIVITIES } from "./types";
        const { REACT_APP_API_URL, REACT_APP_API_POST } = process.env

        export const setCountries = () => async (dispatch) => {
            try {
                const countries = await axios.get(REACT_APP_API_URL);
                return dispatch({
                    type: SET_COUNTRIES,
                    payload: countries.data,
                });
            } catch (err) {
                throw new Error(err.message);
            }
        }

        export const setActivities = () => async (dispatch) => {
            try {
                const activities = await axios.get(REACT_APP_API_POST);
                return dispatch({
                    type: SET_ACTIVITIES,
                    payload: activities.data,
                });
            } catch (err) {
                throw new Error(err.message);
            }
        }

        export const CountryDetailed = (id) => async (dispatch) => {
            try {
                const getDetail = await axios.get(`${REACT_APP_API_URL}/${id}`);
                return dispatch({
                    type: SET_COUNTRY_DETAIL,
                    payload: getDetail.data,
                });
            } catch (error) {
                throw new Error(error.message);
            }
        };

        export const orderByNameAsc = (payload) => {
            return {
                type: ORDER_COUNTRIES_BY_NAME_ASC,
                payload
            }
        }

        export const orderByNameDesc = (payload) => {
            return {
                type: ORDER_COUNTRIES_BY_NAME_DESC,
                payload
            }
        }

        export const orderByPopulationAsc = (payload) => {
            return {
                type: ORDER_COUNTRIES_BY_POPULATION_ASC,
                payload
            }
        }

        export const orderByPopulationDesc = (payload) => {
            return {
                type: ORDER_COUNTRIES_BY_POPULATION_DESC,
                payload
            }
        }

        export const filterByContinent = (payload) => {
            return {
                type: FILTER_CONTINENT,
                payload,
            }
        }

        export const filterByActivity = (payload) => {
            return {
                type: FILTER_ACTIVITY,
                payload,
            }
        }

        export const createActivity = (payload) => async (dispatch) => {
            console.log('payload', payload);
            try {
                await axios.post(REACT_APP_API_POST, payload);

                return dispatch({
                    type: CREATE_ACTIVITY,
                });
            } catch (error) {
                console.log(error)
                throw new Error(error.message);
            }
        };
3. A través de funciones puras llamadas Reducers se controlaban dichas acciones:

        import { CREATE_ACTIVITY, FILTER_ACTIVITY, FILTER_CONTINENT, IS_LOADING, ORDER_COUNTRIES_BY_NAME_ASC, ORDER_COUNTRIES_BY_NAME_DESC, ORDER_COUNTRIES_BY_POPULATION_ASC, ORDER_COUNTRIES_BY_POPULATION_DESC, SET_ACTIVITIES, SET_COUNTRIES, SET_COUNTRY_DETAIL } from "../actions/types"

        const initialState = {
            countries: [],
            filteredContinent: [],
            countryDetailed: [],
            activities: [],
            isLoading: false,
        }

        export const rootReducer = (state = initialState, action) => {
            switch (action.type) {

                case SET_COUNTRIES:
                    return {
                        ...state,
                        filteredContinent: action.payload,
                        countries: action.payload
                    };

                case SET_COUNTRY_DETAIL:
                    return {
                        ...state,
                        countryDetailed: action.payload
                    };

                case SET_ACTIVITIES:
                    return {
                        ...state,
                        activities: action.payload,
                    };

                case ORDER_COUNTRIES_BY_NAME_ASC:
                    let orderedName = [...state.countries].sort((a, b) => a.name.localeCompare(b.name))

                    return {
                        ...state,
                        countries: orderedName
                    };

                case ORDER_COUNTRIES_BY_NAME_DESC:
                    let countriesToInvert = [...state.countries].sort((a, b) => a.name.localeCompare(b.name))
                    let reversedName = [...countriesToInvert].reverse()

                    return {
                        ...state,
                        countries: reversedName
                    };

                case ORDER_COUNTRIES_BY_POPULATION_ASC:
                    let orderedPob = [...state.countries].sort((a, b) => a.population - b.population)

                    return {
                        ...state,
                        countries: orderedPob
                    }

                case ORDER_COUNTRIES_BY_POPULATION_DESC:
                    let populationOrdered = [...state.countries].sort((a, b) => a.population - b.population)
                    let reversedPob = [...populationOrdered].reverse()
                    return {
                        ...state,
                        countries: reversedPob
                    }

                case FILTER_CONTINENT:
                    let countriesToFilter = state.filteredContinent
                    let filteredContient = action.payload === 'Todos' ? countriesToFilter : state.countries.filter(country => country.continent === action.payload)
                    return {
                        ...state,
                        countries: filteredContient
                    }

                case FILTER_ACTIVITY:
                    let filteredByActivity = state.filteredContinent
                    let countryByActivity = filteredByActivity.filter(country => country.activities?.some(a => a.name === action.payload))

                    if (action.payload === 'Todas') return { ...state, countries: filteredByActivity }
                    return {
                        ...state,
                        countries: countryByActivity
                    }


                case CREATE_ACTIVITY:
                    return {
                        ...state,
                    }

                case IS_LOADING:
                    return {
                        ...state,
                        isLoading: true
                    }

                default:
                    return state;
            }
        };


El repo final se puede consultar **[aquí.](https://github.com/oxalc88/countries.git)**
