# B4 input — Shopify assistant (Sidekick) reply to the connection brief, 2026-10-17

Brief sent by Frank (drafted by CC; see the B4 conversation record). Reply, verbatim as pasted:

* Connection: Keep the existing cart integration. Headless is a channel for managing Storefront API tokens and permissions, not a replacement checkout engine. I haven’t established any need to install it or replace your working app-issued token to solve this redirect problem, and I haven’t changed either.
* Password: I couldn’t verify that `/password?return_to=…` is supported, so don’t rely on it. For testing, unlock `asteroid-metals.myshopify.com` in the same browser session first, then return to `justmetu.com` and click checkout again using the original, complete `checkoutUrl`. Treat this as a diagnostic workaround, not a password-free public-demo solution. I haven’t verified a supported preview link that bypasses the development-store password.
* Payments: The last verified Payments state had only (for testing) Bogus Gateway active, with Shopify Payments, additional methods, and manual methods inactive. That setup is test-only.
* Test payment details: For an approved transaction, enter card number `1`, name `Test payment gateway`, CVV `111`, and any future expiry date. Use `2` for a decline or `3` for a gateway failure. Don’t use real card details.
* Checkout domain: I checked the store directly. Both its primary domain and its Shopify domain are `asteroid-metals.myshopify.com`. Allow that exact hostname, but use the full URL returned by `checkoutUrl` without reconstructing its path or dropping query parameters. I haven’t inspected a live cart URL to verify its redirect chain.

My recommendation is to leave the token and channels alone for now and test the unlock-then-retry flow. If that reaches checkout, complete one Bogus Gateway order and check for it in Orders. The remaining issue would then be public demo access, not the checkout integration itself.
