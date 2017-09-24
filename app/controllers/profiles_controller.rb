class ProfilesController < ApplicationController
  def new
    #form for user to fill own profile
    #identify user
    @user = User.find(params[:user_id])
    #prepare form
    @profile = @user.build_profile

  end
end
