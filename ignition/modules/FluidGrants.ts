import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FluidGrantsModule = buildModule("FluidGrants", (m) => {
  const fluidGrants = m.contract("FluidGrants", []);

  return { fluidGrants };
});

export default FluidGrantsModule;
