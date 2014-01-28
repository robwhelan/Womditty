class CreateInquiries < ActiveRecord::Migration
  def change
    create_table :inquiries do |t|
      t.string :rank
      t.string :command
      t.integer :number_of_people
      t.integer :number_of_bedrooms
      t.date :move_date
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone_number
      t.belongs_to :user
      t.belongs_to :vendor

      t.timestamps
    end
    add_index :inquiries, :user_id
    add_index :inquiries, :vendor_id
  end
end
