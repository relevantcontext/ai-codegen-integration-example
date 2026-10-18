# B4 input — Shopify assistant (Sidekick) reply on the password redirect, 2026-10-18

Question drafted by CC, sent by Frank. Reply, verbatim as pasted:

For your current flow, I can’t verify a supported password POST that both unlocks the store and redirects directly to hosted checkout. I would not rely on return_to or a guessed replacement parameter.

On the /password redirect: the documentation I found doesn’t define a redirect parameter for the storefront_password submission. That means I can’t give you a supported field name or say that an absolute URL versus a relative path is the expected format. Your observed result establishes that return_to=/cart/c/…?key=… isn’t producing the redirect in your setup, but it doesn’t establish whether the endpoint has other undocumented behavior.

On a single-step bypass: I also couldn’t verify a supported password-bypass link with a destination, a preview link that unlocks hosted checkout, or support for submitting the storefront password to the checkout URL itself. I wouldn’t build the integration around any of those without an explicit supported contract. Keeping the returned checkoutUrl intact, as you already do, avoids introducing a separate variable.

On removing password protection: not simply by toggling it off while retaining the store’s development/testing status. The path depends on the store type. Your admin context identifies the plan as “Basic App Development,” so a generic “choose a paid plan and uncheck the password” answer would be too broad. Client-transfer stores cannot deactivate private mode while still in the developer organization; their launch path is transfer to the merchant and activation on an eligible paid plan. Some app-development or preview store types cannot convert to paid stores, in which case an eligible new store is required.

My recommendation is to keep the existing two-step unlock for this test store rather than chase undocumented redirect parameters. If a flash-free checkout handoff is a requirement, use an eligible store where password protection can be removed. The remaining point to confirm with Shopify Support is whether this particular “Basic App Development” store can convert, rather than assuming it can.
