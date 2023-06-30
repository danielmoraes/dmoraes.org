---
layout: default
permalink: /
---

<div class="intro">
  <div class="hello">
    <p>Glad to meet you!</p>
    <p>
      I'm a software engineer. I find great joy in studying philosophy and
      computer science, as well as working on side projects.
    </p>
    <p>
      Feel free to reach out via <span id="myma"></span> to connect or discuss
      exciting opportunities.
    </p>
  </div>

  <div class="profile">
    <img src="images/profile.jpg" alt="that's me." />
  </div>
</div>

<script type="text/javascript">
(function() {
  var m = "daniel";
  m += ".b";
  m += ".moraes%40gm";
  m += "ail.com";
  document.getElementById('myma').innerHTML =
    "<a href=\"mailto:" + decodeURIComponent(m) + "\">" + "email</a>";
})();
</script>
