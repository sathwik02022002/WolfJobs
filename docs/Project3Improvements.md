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

<h3> 🐞 Bug - Profile details not visible after updating profile and doing page refresh</h3>

There was a problem when you edit profile. The state was updated with edit details but once page refresh is done only minimalistic info sustained from auth was shown. The issue here was getprofile was not implemented at all. We implemented neccessary changes in frontend and backend to support get profile. Now after edit profile and even full page refresh, user will be able to see the latest profile details.

Get Profile Page:
<img width="1200" alt="get profile" src="https://github.com/ashakhatri007/WolfJobs/blob/master/images/GetProfile.png">


