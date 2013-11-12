class CreateNeighborhoodTopics < ActiveRecord::Migration
  def change
    create_table :neighborhood_topics do |t|
      t.string :name
      t.timestamps
    end
    
    add_column :users, :biography, :text, :default => ""
    add_column :users, :airbnb_link, :string, :default => ""
    add_column :posts, :neighborhood_id, :integer, :default => ""
    
    add_index :posts, :neighborhood_id
  end
end