# 1. Private resume link

Date: 2026-08-23

## Status

Accepted

## Context

The resume should be shareable with a specific person — a recruiter, a
prospective client — without being discoverable from the site, indexed by a
search engine, or found by anyone browsing around.

A full auth system (login, sessions, accounts) would be the airtight answer,
but it is wildly disproportionate for a personal site: it means a user store, a
login page, and a credential to hand out and later revoke. Nobody wants to make
a recruiter create an account to read a resume.

The obvious cheap alternative — a predictable path like
`/daniel-moraes-resume.pdf` — is unlisted, not private. Anyone can guess it,
and crawlers routinely try common filenames.

There is a second, easier-to-miss half to this. The site's repository is
public. An unguessable URL protects nothing if the PDF is sitting in that
repository, because anyone can clone it and read the file directly, no URL
needed. Path secrecy and file secrecy have to hold together or neither counts.

## Decision

Serve the resume at `/r/:token.pdf`, where the token is 128 bits of randomness
supplied by the `RESUME_TOKEN` environment variable, and keep the PDF itself
out of version control.

Specifically:

- The token is compared in constant time, so response timing can't be used to
  recover it a character at a time.
- A wrong token and an unconfigured route return a byte-identical 404, so
  probing can't distinguish "close" from "off".
- The PDF lives at a gitignored path (`private/`, overridable with
  `RESUME_PATH`) and is uploaded to the host out of band.
- The route is excluded from the sitemap, and is **not** listed in
  `robots.txt` — a `Disallow` line there would publish the secret path to
  everyone who reads the file, which is precisely the thing being avoided.
- Responses carry `X-Robots-Tag: noindex` and `Cache-Control: no-store`, so a
  crawler that is handed the link won't index it and no proxy will retain a
  copy.
- Nothing in the site's markup links to it. A test asserts this.

## Consequences

Sharing the resume is sending a URL, and revoking it is rotating one
environment variable. No accounts, no login, no user store.

The security model is exactly "anyone with the link" — the same model as an
unlisted Google Doc. Whoever receives the URL can forward it, and that is
accepted.

The deployment gains a manual step: the PDF must be placed on the host
separately from a `git push`, because it is deliberately not in the repository.
A deploy that forgets this serves a 404 rather than leaking anything, which is
the correct way to fail.

Rotating the token invalidates every previously shared link at once. That is a
feature, not a limitation, but it means links can't be revoked individually.
