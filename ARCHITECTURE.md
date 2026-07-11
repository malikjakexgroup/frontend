# Architecture

How this **frontend** fits into the Book Platform — a three-repository book discovery
app: a **React** frontend (this repo), a **WordPress** backend that *is* the API (the
middle man), and **Google Books** as the data source. Diagrams render on GitHub (Mermaid).

**Repos:** **frontend** (this) · [backend](https://github.com/malikjakexgroup/backend) · [api](https://github.com/malikjakexgroup/api)

---

## 1. The middle man (gateway)

This frontend never talks to Google. **The backend sits in the middle** — it decides,
stores, hides the API key, and serves clean data.

```mermaid
flowchart LR
    browser["⚛️ frontend<br/>React (this repo)"]
    api["🎯 backend — the middle man<br/>WordPress (the API)"]
    db[("🗄️ Database<br/>saved books")]
    google["🌐 Google Books<br/>external source"]

    browser -->|"asks"| api
    api -->|"answers"| browser
    api -->|"read / write"| db
    api -->|"only for NEW books"| google

    classDef mid fill:#e5efe9,stroke:#2f6b57,stroke-width:2px,color:#1c3f34;
    classDef ext fill:#f0e7d6,stroke:#9c6f2f,color:#4a3412;
    class api mid;
    class google ext;
```

---

## 2. Three-repo map

```mermaid
flowchart TB
    frontend["⚛️ frontend<br/>React app"]
    backend["🔌 backend<br/>WordPress + API"]
    apidocs["📖 api<br/>OpenAPI · Swagger · docs"]

    frontend -->|"REST API (runtime)"| backend
    apidocs -. documents .-> backend
    apidocs -. documents .-> frontend
```

---

## 3. What the frontend does (this repo)

```mermaid
flowchart TB
    subgraph app["⚛️ frontend — React SPA"]
        pages["Pages<br/>Search · BookDetails · Favorites · Login · Signup"]
        hooks["Hooks<br/>useSearch · useBook · useAuth · useFavorites"]
        apijs["services/api.js<br/>the only network layer"]
    end
    backend["🔌 backend REST API<br/>/wp-json/books/v1/*"]

    pages --> hooks --> apijs
    apijs -->|"HTTPS · JSON"| backend
```

- **Pages** render the UI; **hooks** manage data and auth state (TanStack Query);
  **`api.js`** is the single place that calls the backend.
- The frontend talks **only** to the backend — never to Google directly.

---

## 4. Flow — Search

```mermaid
sequenceDiagram
    actor U as User
    participant W as frontend (React)
    participant B as backend (API)
    participant D as Database
    participant G as Google Books

    U->>W: search "atomic habits"
    W->>B: GET /books/v1/search?q=
    B->>D: look up saved books
    alt Already saved
        D-->>B: matching books
        B-->>W: 200 — saved books (0 Google calls)
    else New query
        B->>G: fetch from Google
        G-->>B: results
        B->>D: store permanently
        B-->>W: 200 — books
    end
    W-->>U: render book grid
```

---

## 5. Flow — Authentication

```mermaid
sequenceDiagram
    actor U as User
    participant W as frontend
    participant B as backend

    U->>W: sign up / log in
    W->>B: POST /register or /login
    B-->>W: { token, user }
    W->>W: save token in localStorage
    Note over W,B: later requests send Authorization: Bearer token
    W->>B: GET /me (Bearer)
    B-->>W: current user
```

---

Full architecture (component view, data model, deployment, function-level pipeline) lives
in the **[api](https://github.com/malikjakexgroup/api)** repo. Live endpoint docs:
the api repo's **Swagger** page.
