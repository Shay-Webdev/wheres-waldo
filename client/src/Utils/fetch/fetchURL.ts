const serverURLOrigin = import.meta.env.VITE_SERVER_URL_ORIGIN;
const serverURL = {
  gameDetail: serverURLOrigin + "/:id",
  gameImage: serverURLOrigin + "/:id/img",
  characterLogo: serverURLOrigin + "/:id/character/:characterId/logo",
  characterDetail: serverURLOrigin + "/:id/character/:characterId",
};

const getServerURL = (id?: number | string, characterId?: string | number) => {
  return {
    game: serverURLOrigin,
    gameDetail: serverURLOrigin + `/${id}`,
    gameImage: serverURLOrigin + `/${id}/img`,
    characterLogo: serverURLOrigin + `/${id}/character/${characterId}/logo`,
    characterDetail: serverURLOrigin + `/${id}/character/${characterId}`,
    checkCoordinates:
      serverURLOrigin + `/${id}/character/${characterId}/check_coordinates`,
  };
};

export { serverURLOrigin, serverURL, getServerURL };
