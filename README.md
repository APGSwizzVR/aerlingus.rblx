# Aer Lingus Roblox website

A responsive static website based on the supplied Aer Lingus homepage snapshot. It is structured to deploy directly to GitHub + Vercel.

## Deploy

1. Create a new GitHub repository.
2. Extract this ZIP and upload the contents of this folder to the repository root.
3. In Vercel, choose **Add New → Project**, import the GitHub repository, and deploy.
4. Framework preset: **Other**. Build command: leave empty. Output directory: `.`.
5. Every push to the connected GitHub branch will trigger a Vercel deployment.

## Important functionality notes

- Navigation, mobile menu, hero carousel, booking tabs, date validation, route swap, and front-end form validation work.
- The supplied source HTML is a saved snapshot of Aer Lingus' live site. Its Angular application, asset bundle, private booking APIs, account system, and flight data are not included in the HTML download and cannot be made operational merely by hosting that snapshot.
- The forms in this rebuild are front-end interfaces. They show an integration message rather than claiming to book or check in real flights. To make them perform Roblox bookings, connect your own flight schedule/database and Roblox group/community links.
- Replace the placeholder `#join` / `#support` links with your Roblox group, Discord, and support URLs.
- This is an unofficial Roblox virtual airline website and is not affiliated with Aer Lingus or Roblox.

## Files

- `index.html` — page structure and visible sections
- `styles.css` — responsive styling
- `app.js` — carousel, tabs, mobile navigation and form behaviour
- `vercel.json` — Vercel static deployment configuration
