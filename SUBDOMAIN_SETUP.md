# Recommended Custom Subdomain

The recommended public address is **`iqra.jarifurrahim.one`**.

`iqra` is concise, memorable, and aligned with the book's focus on reading, inquiry, knowledge, and awakening. It is a stronger book identity than a narrow framework label such as `rwis`, and it keeps the broader Rashik philosophy available for future chapters and editions.

## GitHub Pages DNS setup

1. In the DNS manager for `jarifurrahim.one`, create a `CNAME` record:
   - **Host / Name:** `iqra`
   - **Target / Value:** `jarifurrahim.github.io`
2. In `JarifUrRahim/Jarifurrahim.one` → **Settings** → **Pages**, enter `iqra.jarifurrahim.one` under **Custom domain** and save.
3. Wait for DNS verification, then enable **Enforce HTTPS**.
4. After verification, update the canonical URLs, sitemap, and `llms.txt` from the temporary GitHub Pages URL to `https://iqra.jarifurrahim.one/`.

Do not add the `CNAME` file before GitHub verifies the domain; GitHub Pages will create and maintain it after the custom-domain setting is saved.
