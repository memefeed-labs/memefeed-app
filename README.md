# memefeed-app

This repo is for the Memefeed frontend.

[Dorahacks Buidl](<https://dorahacks.io/buidl/12713>)
[Demo Video](<https://www.youtube.com/watch?v=xcMi5EfuPAo>)
[Follow on Twitter](<https://www.x.com/memefeedorg>)

See the [backend / sequencer tech documentation](https://github.com/memefeed-labs/memefeed) for more details.

## Getting Started

```bash
# Start the frontend
npm run build && npm run dev
```

## Backlog

Feel free to ignore. These are some open items from the hackathon I noted down. I'll pull them out into a separate planning document later.

1. Verify WalletConnect
2. Add og-preview.png - missing for some reason && favicon not showing up
3. Handle errors better (after backend returns them)
   1. show specific error for when username is taken
   2. show specific error when room does not exist, wrong password for room
4. Logout
5. feat(view) live stream / popular tabs clarity in feed UI
6. Perf Optimizations
   1. Pagination and lazy loading
   2. Debounce for fetching memes
