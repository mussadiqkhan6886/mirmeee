import {Roboto, Italianno} from "next/font/google"

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "400", "600", "800", "900"]
})

export const italiano = Italianno({
    subsets: ["latin"],
    weight: "400"
})