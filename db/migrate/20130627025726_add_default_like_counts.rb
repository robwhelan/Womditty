class AddDefaultLikeCounts < ActiveRecord::Migration
  def up
    change_column :users, :reputation, :integer, :default => 0
    change_column :posts, :likes, :integer, :default => 0
    change_column :answers, :likes, :integer, :default => 0
  end
end
