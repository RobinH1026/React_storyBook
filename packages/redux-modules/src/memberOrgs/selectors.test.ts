import { getSelectedOrg, getSelectedOrgId } from "./selectors";

describe("memberOrgs selectors", () => {
  it("should get selected organization", () => {
    const organization = {
      organizationId: "55688",
    };
    const state = {
      memberOrgs: {
        selectedOrg: organization,
      },
    };
    expect(getSelectedOrg(state)).toEqual(organization);
    expect(getSelectedOrgId(state)).toEqual(organization.organizationId);
  });

  it("should not get selected organization", () => {
    const state = {
      memberOrgs: {},
    };
    expect(getSelectedOrg(state)).toEqual(undefined);
    expect(getSelectedOrgId(state)).toEqual(undefined);
  });
});
