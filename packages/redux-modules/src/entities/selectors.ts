import getIn from "@eGroupAI/utils/getIn";

export const getEntities = (state) => getIn(state, ["entities"]);
