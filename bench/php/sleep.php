<?php
  $ms=intval($_GET['ms']);
  usleep($ms*1000);
  echo("Slept $ms miliseconds.");
?>
