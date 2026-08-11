# JarifUrRahim.One

The public documentation and HTML publication repository for **G. K. M. Jarif Ur Rahim**. It is deliberately separate from the private full-stack production repository, `jarifurrahim-one`, which powers [jarifurrahim.one](https://jarifurrahim.one).

## What belongs here

This public repository holds material that a visitor should be able to inspect without accessing production code or private configuration:

| Area | Purpose |
|---|---|
| `index.html` | Public HTML edition of the living book, _Reconnecting Intelligence With The Soul_. |
| `chapters/` | Stable chapter URLs for the HTML edition. |
| `schema-markup.json` | Public structured-data reference material. |
| `README.md` | Ongoing public project and publication documentation. |

The private application repository remains the canonical workspace for website code, database schema, operational secrets, and the book’s editorial source files. The public repository is the intentionally readable, deployable edition.

## Book Edition 0.1

**Working title:** _Reconnecting Intelligence With The Soul: Agency, Responsibility, and System Design in the Age of AI_

**Author:** G. K. M. Jarif Ur Rahim
**Status:** Living HTML book / early edition

The book is built from articles, DOI-linked research, and verified project case studies. It will be released in an HTML-first workflow, followed by a fixed PDF edition and a versioned DOI archive. Each stable release will include a changelog, source notes, rights credits, and a clear distinction between personal reflection, documented evidence, and conceptual proposal.

## GitHub Pages and custom subdomain

GitHub Pages can serve this repository directly once enabled from the `main` branch and repository root. The initial public URL will follow this pattern:

`https://jarifurrahim.github.io/Jarifurrahim.one/`

When a dedicated subdomain is ready—for example `book.jarifurrahim.one`—configure the DNS record as follows:

| DNS field | Value |
|---|---|
| Type | `CNAME` |
| Host / Name | `book` |
| Target | `jarifurrahim.github.io` |

Then set `book.jarifurrahim.one` as the custom domain in GitHub Pages settings. GitHub will provide the domain-verification and HTTPS status in the repository settings.

## Maintainer workflow

1. Draft and verify book material in the private `jarifurrahim-one` workspace.
2. Add or revise the corresponding public HTML chapter here.
3. Update the book edition number and changelog before every archival release.
4. Generate the PDF from the approved canonical source—not from a browser copy.
5. Deposit PDF, HTML/source archive, cover, citations, and changelog as a versioned DOI record.

## Related public work

- [Main website](https://jarifurrahim.one)
- [Research and DOI-linked pre-prints](https://jarifurrahim.one/research)
- [Project case studies](https://jarifurrahim.one/projects)
- [ORCID](https://orcid.org/0009-0004-0763-322X)
