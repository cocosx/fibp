from subprocess import Popen, PIPE
import re
import time
import math

def ab(n,c,url):
  cmd = ['ab','-n',str(n),'-c',str(c),url]
  p = Popen(cmd, stdout=PIPE, stderr=PIPE)
  stdout, stderr = p.communicate()
  s=str(stdout)
  #print(s)
  m=re.search('Requests per second\D*(\d*)',s)
  if m:
    return int(m.groups()[0])
  else:
    return 0


for c in (1,10,30,50,100,200,300,500,700,1000):
#for c in (30, 300,500,700,1000):
  a=[]
  for i in range(1,10):
    #a.append(ab(5000,c,'http://127.0.0.1:3000/add?a=1&b=1'))
    a.append(ab(5000,c,'http://127.0.0.1:80/add.php?a=1&b=1'))
    #a.append(ab(5000,c,'http://127.0.0.1:3000/sleep?ms=20'))
    #a.append(ab(5000,c,'http://127.0.0.1:80/sleep.php?ms=20'))
    time.sleep(2)
  n=len(a)
  mean=sum(a)/n
  stddev=math.sqrt(sum((x-mean) ** 2 for x in a) / n)
  print("{}\t{}\t{}".format(c,mean,stddev))
