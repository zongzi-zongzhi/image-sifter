# Contributing

Thanks for considering a contribution to Image Sifter.

## Local Setup

```bash
npm install
npm test
npm start
```

## Development Notes

- Keep the MVP focused on local image sifting.
- Do not add cloud upload, account login, or telemetry without opening an issue first.
- Keep file deletion behavior routed through the system recycle bin.
- Add or update tests for shared logic changes.

## Pull Requests

Before opening a pull request:

1. Run `npm test`.
2. Run `npm audit --audit-level=high`.
3. Update docs when behavior changes.
4. Describe the user-facing impact clearly.

## Issues

Bug reports should include:

- Operating system version
- App version or commit SHA
- Steps to reproduce
- Expected behavior
- Actual behavior

Feature requests should explain the workflow they improve.
