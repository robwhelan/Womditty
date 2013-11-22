class CreateNeighborhoodThoughts < ActiveRecord::Migration
  def change
    create_table :neighborhood_thoughts do |t|
      t.belongs_to :user
      t.belongs_to :neighborhood
      t.string      :community_amenities, :default => ""
      t.string      :cost_of_living,      :default => ""
      t.string      :crime,               :default => ""
      t.string      :grocery_stores,      :default => ""
      t.string      :lifestyle,           :default => ""
      t.string      :night_life,          :default => ""
      t.string      :noise,               :default => ""
      t.string      :pets,                :default => ""
      t.string      :shopping,            :default => ""
      t.string      :kids,                :default => ""
      t.string      :traffic,             :default => ""
      t.string      :walkability,         :default => ""
      t.string      :not_love,            :default => ""
      t.string      :love,                :default => ""

      t.timestamps
    end
    add_index :neighborhood_thoughts, :user_id
    add_index :neighborhood_thoughts, :neighborhood_id
  end
end
