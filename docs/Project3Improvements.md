<h1> ✅ Features </h1>
<h3>💎 Addition of Code Coverga Badge </h3>

<br>
<h1> ✅ Bug fixes </h1>

<h3> 🐞 Bug -  CORS not enabled on server side APIs</h3>
 There was a bug wherein the browser was throwing CORS error. Although it was mentioned in Readme to use allow CORS extension but that wasnt working. This is a hack, the correct way to implement will be to enable server-side APIs CORS. 

 We enabled the server-side CORS by adding below line for all API requests:

```
res.set('Access-Control-Allow-Origin', '*');
```




