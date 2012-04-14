require 'sinatra'

get '/' do
    (params[:a].to_i+params[:b].to_i).to_s
end
