import { setSelectedOrg } from "./actions";
import { memberOrgs as reducer } from "./memberOrgs";

describe("memberOrgs reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "", payload: {} })).toEqual({});
  });

  it("should handle SET_SELECTED_ORG", () => {
    const organization = {
      organizationId: "55688",
      organizationCreateDateString: "88888",
      organizationName: "5566",
      creator: {
        loginId: "55688",
        memberName: "5566",
      },
    };
    const state = {
      selectedOrg: undefined,
    };
    expect(reducer(state, setSelectedOrg(organization))).toEqual({
      selectedOrg: organization,
    });
  });
});
