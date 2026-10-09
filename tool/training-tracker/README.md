# Training Tracker

A small local-first daily training tracker built with native JavaScript, HTML and CSS.

## Features

- Training library is defined in `training.json`
- First launch asks the user which training items to track
- Selected training items are stored in `localStorage`
- Training selection can be changed later
- Daily completion state is stored separately in `localStorage`
- Previous/next day navigation
- Progress bar and completion percentage
- Searchable training selector
- Mobile-first responsive UI
- No backend or database required

## Files

- `index.html` - application entry point
- `styles.css` - UI styles
- `app.js` - application logic
- `training.json` - editable training library

## Run locally

Because browsers may block `fetch("training.json")` when opening `index.html` directly with `file://`, serve the folder through a small local HTTP server.

For example, with Node.js:

```bash
npx serve .
```

Or with Python:

```bash
python -m http.server 8080
```

Then open the displayed local URL.

## LocalStorage keys

- `training-profile`
- `training-progress`

The training library itself remains in `training.json`.

## Adding a training item

Add another object to `training.json`:

```json
{
  "id": "cycling",
  "name": "Cycling",
  "description": "Easy cycling session.",
  "target": 30,
  "unit": "min"
}
```

The item will automatically appear in the selector.
