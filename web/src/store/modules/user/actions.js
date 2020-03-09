import * as types from '~/store/types';

export function changeTheme(theme) {
  return {
    type: types.CHANGE_THEME,
    payload: { theme },
  };
}
