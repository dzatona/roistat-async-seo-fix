# Roistat Async SEO Fix

![](img/header.png)

## Problem

When you add the `async` parameter to the Roistat script, it stops working.

## Hypothesis

Our theory is that the async loading issue is caused by the fact that the `roistat_visit` cookie isn't yet set when async loading a script, so the script always tries to load the init file instead of the main module.

## Solution

> **DISCLAIMER:**  
> The script was developed blindly and has not been tested in production.  
> Script feedback has not yet been provided by the person who requested help.

**In order to potentially solve this problem, our script:**

1. Prevents the original script from loading.
2. Loads components sequentially: first the main `module.js`, then the init script if necessary. By doing so, the correct initialization sequence is ensured.
3. Checks if `w.roistat` object is defined after loading `module.js`. If it is not, loads the init script. The problem of missing cookies on the first visit is now resolved.
4. Runs asynchronously (`js.async = 1`), which does not block the page loading while maintaining full control over its execution.
5. Handles errors and retries.
6. Implements timeouts.
7. Eliminates duplication.
8. Logs informatively.

## Usage

Add this script to your pages template before calling Roistat's original script.

## Q?

Have any questions? [Create a new issue](https://github.com/dzatona/roistat-async-seo-fix/issues/new/choose), I will try to help you.