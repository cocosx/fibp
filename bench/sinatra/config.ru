require './app'

#Sinatra::Application.default_options.merge!(
#  :run => false,
#  :env => :production
#)

run Sinatra::Application
#/home/cocos/.gem/ruby/1.9.1/bin/thin -e production -l /dev/null -d start
