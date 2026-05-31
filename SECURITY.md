# Security Policy

## Supported Versions

The current `main` branch is the only supported development version until the project publishes tagged releases.

## Reporting a Vulnerability

Please open a GitHub issue with a clear description of the security concern. Do not include private images, credentials, API keys, or personal data in public reports.

## Local Data Handling

Image Sifter is designed as a local desktop app:

- It reads only the folder selected by the user.
- It does not upload images.
- It does not require accounts, API keys, cookies, tokens, or cloud services.
- Delete actions use the operating system recycle bin.

## Sensitive Files

Do not commit personal image folders, `.env` files, credentials, logs containing private paths, or packaged builds that include personal data.
