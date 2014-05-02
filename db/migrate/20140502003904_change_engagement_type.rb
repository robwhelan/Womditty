class ChangeEngagementType < ActiveRecord::Migration
  def change
    rename_column :engagements, :type, :engagement_type
  end
end
