import { prisma } from "@/lib/prisma";

describe("prisma singleton", () => {
  it("exports a Prisma client instance", () => {
    expect(prisma).toBeDefined();
  });
});
