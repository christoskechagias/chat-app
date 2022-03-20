export const roomReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_UP_ROOM_REQUEST':
			return { loading: true };
		case 'SET_UP_ROOM_SUCCESS':
			return { loading: false, data: action.payload };
		case 'SET_UP_ROOM_FAIL':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
