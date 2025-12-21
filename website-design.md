# FitCity Website Review

## Findings

All previously identified inconsistencies in navigation/contact data, CTA usage, media dialogs, and social links have been resolved.

## TODOs (next actions)

- [x] Centralize navigation + contact metadata so both [`Navbar`](src/components/Navbar.jsx:10) and [`Footer`](src/components/Footer.jsx:13) consume the same source of truth.
- [x] Standardize CTA rendering by routing everything through the shared `Button` component (e.g., adapt [`Hero`](src/components/Hero.jsx:96)).
- [x] Add an `onSubmit` handler/service integration to the [`Contact`](src/pages/Contact.jsx:75) form to prevent page refresh and deliver the payload.
- [x] Extract a reusable `VideoDialog` that handles portals + scroll locking and use it in both [`Hero`](src/components/Hero.jsx:18) and [`LadiesOnly`](src/pages/LadiesOnly.jsx:27), mirroring the body-lock behavior implemented in [`Navbar`](src/components/Navbar.jsx:37).
- [x] Remove [`MediaPlaceholder`](src/components/ui/MediaPlaceholder.jsx:1) or wire it up in sections that still need placeholder art.
- [x] Replace placeholder social URLs in [`Footer`](src/components/Footer.jsx:20) with real links or hide the icons until the accounts exist.
- [x] Add Ladies Only social links to [`LadiesOnly`](src/pages/LadiesOnly.jsx:1).
