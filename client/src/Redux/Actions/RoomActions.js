export const setUpRoomAction = (username, room, socket) => async (dispatch) => {
	dispatch({ type: 'SET_UP_ROOM_REQUEST' });
	try {
		dispatch({
			type: 'SET_UP_ROOM_SUCCESS',
			payload: { username, room, socket },
		});
	} catch (error) {
		dispatch({
			type: 'SET_UP_ROOM_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
