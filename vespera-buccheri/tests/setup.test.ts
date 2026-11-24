import { describe, it, expect } from "vitest";
import { packageJson } from "./helpers.js";

// Smoke: seluruh dependensi inti PRD §14 terpasang.
describe("PRD stack", () => {
  it("has all core dependencies installed", () => {
    for (const dep of [
      "@supabase/supabase-js",
      "@supabase/ssr",
      "zod",
      "react-hook-form",
      "@tanstack/react-query",
      "zustand",
      "lucide-react",
      "motion",
      "midtrans-client",
      "cloudinary",
      "resend",
    ]) {
      expect(packageJson.dependencies, `missing: ${dep}`).toHaveProperty(dep);
    }
  });
});
