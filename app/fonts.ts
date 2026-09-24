import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";

// All three are variable fonts: one file each covers every weight the design uses.
export const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded", display: "swap" });
export const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
export const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
