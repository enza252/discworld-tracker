enum Saga {
    THE_CITY_WATCH = "The City Watch",
    THE_WIZARDS_RINCEWIND = "The Wizards / Rincewind",
    THE_WITCHES = "The Witches",
    DEATH = "Death",
    TIFFANY_ACHING_AND_NAC_MAC_FEEGLEs = "Tiffany Aching & The Nac Mac Feegles",
    MOIST_VON_LIPWIG = "Moist Von Lipwig",
    STANDALONES = "Standalones"
}

type Book = {
    id: string,
    title: string,
    // authors: string[]
    saga: Saga,
    publicationOrder: number
}

export type { Book }
export { Saga }