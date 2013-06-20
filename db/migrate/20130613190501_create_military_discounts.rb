class CreateMilitaryDiscounts < ActiveRecord::Migration
  def change
    create_table :military_discounts do |t|
      t.string :description
      t.belongs_to :place

      t.timestamps
    end
    add_index :military_discounts, :place_id
  end
end
