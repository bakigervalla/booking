import {
  SET_STEP,
  GET_VEHICLES,
  GET_WORKSHOPS,
  GET_SERVICES,
  SET_SERVICE,
  ADD_SERVICE,
  REMOVE_SERVICE,
  SERVICE_AGREEMENT,
  FIND_PERSON,
  SET_PERSON,
  SUBMIT_ORDER,
  CLEAR_FILTER,
  VEHICLE_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
  SEARCH_VEHICLE,
  SET_EUKONTROLL,
} from "./types";

const vehicleReducer = (state, action) => {
  switch (action.type) {
    case SET_STEP:
      return {
        ...state,
        step: action.payload,
      };
    case GET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
      };
    case GET_WORKSHOPS:
      return {
        ...state,
        workshop: action.payload,
      };
    case GET_SERVICES:
      let services = action.payload.data
          .filter((x) => x.type === "service")
          .sort(function (a, b) {
            return a.id - b.id || a.name.localeCompare(b.name);
          }),
        filtered = action.payload.isEUKontroll
          ? services.filter((x) => {
              return x.code === "EUK";
            })
          : [];
      /* eslint-disable */
      if (action.payload.isEUKontroll)
        services.map((s) => {
          if (s.code === "EUK") s.selected = true;
        });
      /* eslint-enable */
      return {
        ...state,
        categories: action.payload.data
          .filter((x) => x.type === "category")
          .sort(function (a, b) {
            return a.id - b.id || a.name.localeCompare(b.name);
          }),
        services: services,
        filtered: filtered, //action.payload.isEUKontroll ? services.filter((x) => { return x.code === 'EUK' }) : null
      };
    case SET_SERVICE:
      return {
        ...state,
        defaultService: action.payload,
      };
    case ADD_SERVICE:
      let exists = state.filtered.includes(action.payload);
      return {
        ...state,
        services: exists
          ? state.services.map((x) =>
              x.id === action.payload.id ? { ...x, selected: false } : x
            )
          : state.services,
        filtered: exists
          ? state.filtered.filter((s) => s !== action.payload)
          : [...state.filtered, action.payload],
      };
    case REMOVE_SERVICE:
      return {
        ...state,
        filtered: state.filtered.filter((service) => {
          return service.id !== action.payload.id;
        }),
      };
    case SERVICE_AGREEMENT:
      return {
        ...state,
        serviceAgreement: action.payload,
      };
    case FIND_PERSON:
      return {
        ...state,
        person: action.payload,
      };
    case SET_PERSON:
      return {
        ...state,
        person: action.payload,
      };
    case SUBMIT_ORDER:
      return {
        ...state,
        person: action.payload,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        person: {},
        filtered: [],
      };
    case SEARCH_VEHICLE:
      return {
        ...state,
        vehicle: action.payload,
      };
    case SET_EUKONTROLL:
      return {
        ...state,
        isEUKontroll: action.payload.isEUKontroll,
        plateNo: action.payload.plateNo,
      };
    case VEHICLE_ERROR:
      return {
        ...state,
        error: JSON.stringify(action.payload.message), //action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default vehicleReducer;
