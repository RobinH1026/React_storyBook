import { setSelectedOrg } from "./actions";

describe("memberOrgs actions", () => {
  it("should create an action to set selected organization", () => {
    const organization = {
      organizationId: "55688",
      organizationCreateDateString: "88888",
      organizationName: "5566",
      creator: {
        loginId: "55688",
        memberName: "5566",
      },
    };
    const expectedAction = {
      type: setSelectedOrg.type,
      payload: organization,
    };
    expect(setSelectedOrg(organization)).toEqual(expectedAction);
  });
});
