# memefeed-app

## Getting Started

```bash
# Run the app
npm run build && npm run dev
```

## Open Items

1. Verify WalletConnect
2. Add og-preview.png - missing for some reason && favicon not showing up
3. Handle errors better (after backend returns them)
   1. show specific error for when username is taken
   2. show specific error when room does not exist, wrong password for room
4. Logout
5. Perf Optimizations
   1. Pagination and lazy loading
   2. Debounce for fetching memes
