import cherrypy
from cherrypy import wsgiserver

class HelloWorld(object):
  def index(self, a=None, b=None):
    return str(int(a)+int(b))
  index.exposed = True

#cherrypy.quickstart(HelloWorld())
cherrypy.config.update({'log.screen': False})
app = cherrypy.tree.mount(HelloWorld())
app.log.screen=False
server = wsgiserver.CherryPyWSGIServer(('0.0.0.0', 3000), app,server_name='localhost', numthreads=100)
server.start()

