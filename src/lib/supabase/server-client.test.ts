import { createClient } from "@supabase/supabase-js";

import { createServerSupabaseClient } from "./server-client";

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

describe("createServerSupabaseClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  });

  it("returns null when the URL is missing", () => {
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";
    expect(createServerSupabaseClient()).toBeNull();
    expect(createClient).not.toHaveBeenCalled();
  });

  it("returns null when the anon key is missing", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://project.supabase.co";
    expect(createServerSupabaseClient()).toBeNull();
    expect(createClient).not.toHaveBeenCalled();
  });

  it("creates a Supabase client when both variables are set", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";
    const fakeClient = { from: jest.fn() };
    jest.mocked(createClient).mockReturnValue(fakeClient as never);
    const result = createServerSupabaseClient();
    expect(createClient).toHaveBeenCalledWith("https://project.supabase.co", "anon-key");
    expect(result).toBe(fakeClient);
  });
});
