class ChangeReferenceOnPosts < ActiveRecord::Migration
  def change
    change_column :posts, :place_reference, :text, :limit => nil, :default => ""
  end
end
