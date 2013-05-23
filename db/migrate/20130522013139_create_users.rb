class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.string :member_rank
      t.integer :number_of_invites
      t.boolean :has_kids
      t.integer :invited_by_user_id
      t.string :role
      t.string :profile_image_url
      t.belongs_to :city
      t.belongs_to :career_specialty 
      t.belongs_to :duty_station
      t.belongs_to :military_branch
      t.belongs_to :neighborhood

      t.timestamps
    end
    add_index :users, :neighborhood_id
    add_index :users, :military_branch_id
    add_index :users, :city_id
    add_index :users, :career_specialty_id
    add_index :users, :duty_station_id
  end
end
