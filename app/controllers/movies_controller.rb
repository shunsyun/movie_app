class MoviesController < ApplicationController
  def index
    gon.youtube_key = ENV['APIKEY']
  end
end
