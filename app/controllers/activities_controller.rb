class ActivitiesController < ApplicationController
  def index
    following_ids = current_user.all_following.map(&:id)
    @activities = PublicActivity::Activity.where(owner_id: following_ids, owner_type: 'User').order('created_at desc')
    #@activities = PublicActivity::Activity.order('created_at desc')
  end
end
