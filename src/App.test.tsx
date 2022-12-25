import React from "react"
import { render, screen } from "@testing-library/react"
import { Saga } from "./types"
import App from "./App"
import userEvent from "@testing-library/user-event"

const sagas = [
  Saga.DEATH,
  Saga.MOIST_VON_LIPWIG,
  Saga.STANDALONES,
  Saga.THE_CITY_WATCH,
  Saga.THE_WITCHES,
  Saga.THE_WIZARDS_RINCEWIND,
  Saga.TIFFANY_ACHING_AND_NAC_MAC_FEEGLEs,
]

describe("tests the application", () => {
  test("tests expected books are in the doc", async () => {
    render(<App />)
    expect(screen.getByText("The Colour of Magic")).toBeInTheDocument()
    expect(screen.getByText("The Light Fantastic")).toBeInTheDocument()
    expect(screen.getByText("Mort")).toBeInTheDocument()
    expect(screen.getByText("Sourcery")).toBeInTheDocument()
    expect(screen.getByText("The Fifth Elephant")).toBeInTheDocument()
    expect(screen.getByText("Going Postal")).toBeInTheDocument()
    expect(screen.getByText("Wintersmith")).toBeInTheDocument()
    expect(screen.getByText("Making Money")).toBeInTheDocument()
    expect(screen.getByText("Raising Steam")).toBeInTheDocument()
    // tests publication orders 1 -> 41 are present
    for (let i = 1; i <= 41; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument()
    }
  })

  test("tests the sagas are listed in the side panel and the filtering works", async () => {
    render(<App />)
    sagas.forEach((s) => {
      expect(screen.getByTestId(`${s}-filter`)).toBeInTheDocument()
    })
    await userEvent.click(screen.getByTestId("Death-filter"))
    expect(screen.getByText("Mort")).toBeInTheDocument()
    expect(screen.getByText("Reaper Man")).toBeInTheDocument()
    expect(screen.getByText("Soul Music")).toBeInTheDocument()
    expect(screen.getByText("Hogfather")).toBeInTheDocument()
    expect(screen.getByText("Thief of Time")).toBeInTheDocument()
    await userEvent.click(screen.getByTestId("Moist Von Lipwig-filter"))
    expect(screen.getByText("Going Postal")).toBeInTheDocument()
    expect(screen.getByText("Making Money")).toBeInTheDocument()
    expect(screen.getByText("Raising Steam")).toBeInTheDocument()

    expect(screen.getByTestId("view-by-publication-date")).toBeInTheDocument()
    await userEvent.click(screen.getByTestId("view-by-publication-date"))
    expect(screen.getAllByText("Saga:").length).toStrictEqual(41)
  })
})
