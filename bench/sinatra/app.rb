require 'sinatra'

get '/add' do
    (params[:a].to_i+params[:b].to_i).to_s
end

get '/sleep' do
    ms=params[:ms].to_i
    sleep(ms/1000.0)
    "Slept %s miliseconds." % ms
end
