import cherrypy
from cherrypy import wsgiserver
import time

class HelloWorld(object):
  def add(self, a=None, b=None):
    return str(int(a)+int(b))
  add.exposed = True

  def sleep(self, ms=None):
    ms=int(ms)
    time.sleep(ms/1000.0)
    return "Slept {} miliseconds.".format(ms)
  sleep.exposed = True

#cherrypy.quickstart(HelloWorld())
cherrypy.config.update({'log.screen': False})
app = cherrypy.tree.mount(HelloWorld())
app.log.screen=False
server = wsgiserver.CherryPyWSGIServer(('0.0.0.0', 3000), app,server_name='localhost', numthreads=100)
server.start()

