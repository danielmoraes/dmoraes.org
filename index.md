---
layout: default
permalink: /
---

<div class="intro">
  <div class="hello">
    <p>Hi, I'm Daniel.</p>
    <p>
      I'm a full stack web developer who enjoys algorithms, machine learning,
      and computer vision. Currently, I live in Campinas (SP), Brazil.
    </p>
    <p>If you want to get in touch with me, <span id="myma"></span> is best.</p>
  </div>

  <div class="profile">
    <a target="_blank" href="images/profile.jpg" title="Daniel Bastos Moraes">
      <img src="images/profile.jpg" alt="that's me." />
    </a>
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
